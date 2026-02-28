// AdTec - GPT Ad Manager v2
// Versão 2.0.0 - SRA (Single Request Architecture) com detecção IAB por data-tam
// https://github.com/luciano2000/jsadtec

(function(window, document) {
  'use strict';

  // Mapa de nomes IAB padrão → [largura, altura]
  var SIZE_MAP = {
    'leaderboard':         [728, 90],
    'billboard':           [970, 250],
    'super-leaderboard':   [970, 90],
    'medium-rectangle':    [300, 250],
    'half-page':           [300, 600],
    'mobile-banner':       [320, 50],
    'mobile-banner-large': [320, 100],
    'wide-skyscraper':     [160, 600],
    'banner':              [468, 60],
    'large-rectangle':     [336, 280]
  };

  var _config = null;
  var _slots = [];
  var _gptSlots = [];
  var _initialized = false;

  /**
   * Converte o valor de data-tam em array de tamanhos [[w,h], ...]
   * Aceita: nome IAB, formato WxH, ou multi-size separado por vírgula
   * Exemplos: "leaderboard", "300x600", "leaderboard,billboard", "300x250,336x280"
   */
  function parseTam(tam) {
    if (!tam) return null;

    var parts = tam.split(',');
    var sizes = [];

    for (var i = 0; i < parts.length; i++) {
      var token = parts[i].trim().toLowerCase();

      // Tenta nome IAB
      if (SIZE_MAP[token]) {
        sizes.push(SIZE_MAP[token]);
        continue;
      }

      // Tenta formato WxH
      var match = token.match(/^(\d+)x(\d+)$/);
      if (match) {
        sizes.push([parseInt(match[1], 10), parseInt(match[2], 10)]);
        continue;
      }

      console.warn('[AdTec] Tamanho inválido ignorado: "' + parts[i].trim() + '"');
    }

    return sizes.length > 0 ? sizes : null;
  }

  /**
   * Carrega o script GPT se ainda não estiver no DOM
   */
  function loadGPT() {
    window.googletag = window.googletag || {};
    window.googletag.cmd = window.googletag.cmd || [];

    if (!document.querySelector('script[src*="securepubads.g.doubleclick.net/tag/js/gpt.js"]')) {
      var s = document.createElement('script');
      s.async = true;
      s.src = 'https://securepubads.g.doubleclick.net/tag/js/gpt.js';
      document.head.appendChild(s);
    }
  }

  /**
   * Varre o DOM por divs .adtec e monta as definições de slot
   * Retorna array de objetos { id, sizes, unitPath, targeting }
   */
  function scan() {
    var divs = document.querySelectorAll('.adtec:not([data-adtec-defined])');
    var defs = [];
    var slotIndex = _slots.length;

    for (var i = 0; i < divs.length; i++) {
      var div = divs[i];
      var tam = div.getAttribute('data-tam');
      var sizes = parseTam(tam);

      if (!sizes) {
        console.warn('[AdTec] div ignorada (data-tam ausente ou inválido):', div);
        continue;
      }

      // Auto-gerar ID se não existir
      if (!div.id) {
        div.id = 'adtec-slot-' + slotIndex;
      }
      slotIndex++;

      // Ad unit path: data-unit custom ou global
      var unitPath = div.getAttribute('data-unit') || _config.adUnitPath;
      var fullPath = '/' + _config.networkCode + unitPath;

      // Coletar targeting da div
      var targeting = {};

      // data-tam como targeting
      targeting.tam = tam;

      // data-channel
      var channel = div.getAttribute('data-channel');
      if (channel) targeting.channel = channel;

      // data-author
      var author = div.getAttribute('data-author');
      if (author) targeting.author = author;

      // data-target-* (targeting customizado)
      var attrs = div.attributes;
      for (var j = 0; j < attrs.length; j++) {
        var attrName = attrs[j].name;
        if (attrName.indexOf('data-target-') === 0) {
          var key = attrName.substring(12); // remove 'data-target-'
          if (key) targeting[key] = attrs[j].value;
        }
      }

      // Marcar como processada
      div.setAttribute('data-adtec-defined', 'true');

      var def = {
        id: div.id,
        sizes: sizes,
        fullPath: fullPath,
        targeting: targeting
      };

      defs.push(def);
      _slots.push(def);
    }

    return defs;
  }

  /**
   * Executa o fluxo principal: define slots → configura SRA → display
   */
  function run(defs) {
    if (defs.length === 0) return;

    googletag.cmd.push(function() {
      var newGptSlots = [];

      // Define cada slot
      for (var i = 0; i < defs.length; i++) {
        var def = defs[i];
        var slot = googletag.defineSlot(def.fullPath, def.sizes, def.id);

        if (!slot) {
          console.warn('[AdTec] Falha ao definir slot:', def.id);
          continue;
        }

        // Aplicar targeting do slot
        var keys = Object.keys(def.targeting);
        for (var j = 0; j < keys.length; j++) {
          slot.setTargeting(keys[j], def.targeting[keys[j]]);
        }

        slot.addService(googletag.pubads());
        newGptSlots.push(slot);
        _gptSlots.push(slot);
      }

      // Targeting global (se configurado)
      if (_config.targeting) {
        var globalKeys = Object.keys(_config.targeting);
        for (var k = 0; k < globalKeys.length; k++) {
          googletag.pubads().setTargeting(globalKeys[k], _config.targeting[globalKeys[k]]);
        }
      }

      // Configurações do pubads
      googletag.pubads().enableSingleRequest();

      if (_config.collapseEmpty !== false) {
        googletag.pubads().collapseEmptyDivs();
      }

      googletag.enableServices();

      // Display de cada slot (dispara a chamada SRA)
      for (var d = 0; d < defs.length; d++) {
        googletag.display(defs[d].id);
      }
    });
  }

  /**
   * Inicializa o AdTec
   * @param {Object} config - Configuração obrigatória
   * @param {string} config.networkCode - Código da rede do Ad Manager (obrigatório)
   * @param {string} config.adUnitPath - Caminho da ad unit (obrigatório)
   * @param {boolean} [config.collapseEmpty=true] - Colapsar divs vazias
   * @param {Object} [config.targeting] - Targeting global (key-value pairs)
   */
  function init(config) {
    if (!config || !config.networkCode || !config.adUnitPath) {
      console.error('[AdTec] networkCode e adUnitPath são obrigatórios.');
      return;
    }

    _config = config;

    // Carrega GPT se necessário
    loadGPT();

    // Aguarda DOM pronto, depois executa
    function execute() {
      var defs = scan();

      if (defs.length === 0) {
        console.warn('[AdTec] Nenhuma div .adtec encontrada na página.');
        return;
      }

      run(defs);
      _initialized = true;
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', execute);
    } else {
      execute();
    }
  }

  /**
   * Refresh manual dos slots
   * @param {string[]} [slotIds] - Array de IDs específicos para refresh. Se omitido, refresha todos.
   */
  function refresh(slotIds) {
    if (_gptSlots.length === 0) {
      console.warn('[AdTec] Nenhum slot definido para refresh.');
      return;
    }

    googletag.cmd.push(function() {
      if (!slotIds) {
        googletag.pubads().refresh(_gptSlots);
        return;
      }

      var slotsToRefresh = [];
      for (var i = 0; i < _gptSlots.length; i++) {
        var slotId = _gptSlots[i].getSlotElementId();
        if (slotIds.indexOf(slotId) !== -1) {
          slotsToRefresh.push(_gptSlots[i]);
        }
      }

      if (slotsToRefresh.length > 0) {
        googletag.pubads().refresh(slotsToRefresh);
      }
    });
  }

  /**
   * Retorna informações dos slots definidos (debug)
   * @returns {Array} Lista de slots com id, sizes, targeting
   */
  function getSlots() {
    return _slots.map(function(s) {
      return { id: s.id, sizes: s.sizes, path: s.fullPath, targeting: s.targeting };
    });
  }

  // API pública
  window.AdTec = {
    init: init,
    refresh: refresh,
    getSlots: getSlots,
    version: '2.0.0'
  };

})(window, document);
