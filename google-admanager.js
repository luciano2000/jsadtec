// Google AdManager - Script Simplificado
// Versão 3.1.0 - Com LazyLoad, Refresh em banners visíveis, Single Request desativado e Captura automática de UTMs

/**
 * Configuração do AdManager
 * @typedef {Object} AdManagerConfig
 * @property {string} networkCode - Código da rede do Google AdManager
 * @property {string} adUnitPath - Caminho da unidade de anúncio
 * @property {boolean} [collapseEmptyDivs=true] - Colapsar divs vazias
 * @property {boolean} [enableSingleRequest=false] - Habilitar requisição única (desativado por padrão)
 * @property {boolean} [enableLazyLoad=true] - Habilitar carregamento preguiçoso de anúncios
 * @property {number} [fetchMarginPercent=100] - Porcentagem de margem para buscar anúncios (LazyLoad)
 * @property {number} [renderMarginPercent=50] - Porcentagem de margem para renderizar anúncios (LazyLoad)
 * @property {number} [mobileScaling=2.0] - Escala para dispositivos móveis (LazyLoad)
 * @property {boolean} [centering=false] - Centralizar anúncios automaticamente
 * @property {boolean} [applyNegativeMargin=false] - Aplicar margem negativa para banners maiores que o container
 * @property {Object} [marginConfig] - Configuração de margens negativas por posição
 * @property {number} [refresh=0] - Tempo em segundos para refresh automático (0 = desabilitado)
 * @property {boolean} [refreshOnlyVisible=true] - Atualizar apenas anúncios visíveis
 * @property {boolean} [captureUtmParams=true] - Capturar automaticamente parâmetros UTM da URL
 * @property {string|Array} [pageAttributes] - Atributos da página para targeting
 * @property {string|Array} [pagePostAuthor] - Autor do post para targeting
 * @property {string|Array} [pagePostTermsCat] - Categorias do post para targeting
 * @property {string|Array} [pagePostTermsTag] - Tags do post para targeting
 * @property {string|Array} [pagePostType] - Tipo de post para targeting
 * @property {string|Array} [pagePostType2] - Tipo de post secundário para targeting
 * @property {string|number} [postID] - ID do post para targeting
 * @property {string} [visitorEmailHash] - Hash do email do visitante para PPID
 */

/**
 * Tamanho de anúncio
 * @typedef {Object} AdSize
 * @property {number} width - Largura do anúncio
 * @property {number} height - Altura do anúncio
 */

/**
 * Mapeamento de tamanhos responsivos
 * @typedef {Object} AdSizeMapping
 * @property {number[]} viewport - [largura, altura] da viewport
 * @property {AdSize[]} sizes - Tamanhos de anúncios para esta viewport
 */

/**
 * Configuração de slot de anúncio
 * @typedef {Object} AdSlotConfig
 * @property {string} id - ID do slot
 * @property {AdSize[]} sizes - Tamanhos do anúncio
 * @property {AdSizeMapping[]} [sizeMapping] - Mapeamento de tamanhos responsivos
 * @property {Object<string, string|string[]>} [targeting] - Targeting do anúncio
 * @property {string} position - Posição base do anúncio
 * @property {string} positionWithIndex - Posição com índice sequencial (ex: meio_1, meio_2)
 * @property {boolean} isLoaded - Indica se o anúncio já foi carregado
 * @property {boolean} isVisible - Indica se o anúncio está visível
 */

(function(window, document) {
  'use strict';

  // Namespace global
  window.GoogleAdManager = window.GoogleAdManager || {};

  /**
   * Configuração padrão do AdManager
   * @type {AdManagerConfig}
   */
  const defaultConfig = {
    networkCode: '1234567',
    adUnitPath: '/rede/site',
    collapseEmptyDivs: true,
    enableSingleRequest: false, // Single Request desativado por padrão
    enableLazyLoad: true, // LazyLoad ativado por padrão
    fetchMarginPercent: 100, // 100% = 1 viewport de distância
    renderMarginPercent: 50, // 50% = metade de um viewport de distância
    mobileScaling: 2.0, // Escala para dispositivos móveis
    disableInitialLoad: true, // Desabilita carregamento inicial para permitir LazyLoad
    centering: false,
    applyNegativeMargin: false,
    marginConfig: {},
    refresh: 0, // 0 = desabilitado
    refreshOnlyVisible: true, // Atualizar apenas anúncios visíveis
    captureUtmParams: true, // Capturar automaticamente parâmetros UTM da URL
    pageAttributes: null,
    pagePostAuthor: null,
    pagePostTermsCat: null,
    pagePostTermsTag: null,
    pagePostType: null,
    pagePostType2: null,
    postID: null,
    visitorEmailHash: null
  };

  /**
   * Mapeamento de posições para tamanhos de anúncios
   * @type {Object<string, AdSizeMapping[]>}
   */
  const adSizesByPosition = {
    'big': [
      { viewport: [0, 0], sizes: [{ width: 320, height: 50 }, { width: 320, height: 100 }] },
      { viewport: [750, 0], sizes: [{ width: 728, height: 90 }] },
      { viewport: [1050, 0], sizes: [{ width: 970, height: 90 }, { width: 970, height: 250 },{ width: 1300, height: 250 }] }
    ],
    'topo': [
      { viewport: [0, 0], sizes: [{ width: 320, height: 50 }, { width: 320, height: 100 }] },
      { viewport: [750, 0], sizes: [{ width: 728, height: 90 }] },
      { viewport: [1050, 0], sizes: [{ width: 970, height: 90 }, { width: 970, height: 250 }] }
    ],    
    'lateral': [
      { viewport: [0, 0], sizes: [] }, // Sem anúncios em mobile
      { viewport: [1000, 0], sizes: [{ width: 300, height: 250 }] }
    ],
    'barra': [
      { viewport: [0, 0], sizes: [] }, // Sem anúncios em mobile
      { viewport: [1000, 0], sizes: [{ width: 300, height: 600 }] }
    ],
    'meio': [
      { viewport: [0, 0], sizes: [{ width: 320, height: 50 }, { width: 320, height: 100 }] },
      { viewport: [750, 0], sizes: [{ width: 728, height: 90 }] },
      { viewport: [1050, 0], sizes: [{ width: 970, height: 90 }, { width: 970, height: 250 }] }
    ],
    'container': [
      { viewport: [0, 0], sizes: [{ width: 300, height: 250 }] },
      { viewport: [750, 0], sizes: [{ width: 728, height: 90 }] },
      { viewport: [1050, 0], sizes: [{ width: 728, height: 90 }] }
    ],    
    'rodape': [
      { viewport: [0, 0], sizes: [{ width: 320, height: 50 }] },
      { viewport: [750, 0], sizes: [{ width: 728, height: 90 }] }
    ],
    'inread': [
      { viewport: [0, 0], sizes: [{ width: 300, height: 250 }] },
      { viewport: [750, 0], sizes: [{ width: 300, height: 250 }, {width: 336, height: 280}] }
    ],
    'inread-full': [
      { viewport: [0, 0], sizes: [{ width: 300, height: 250 }] },
      { viewport: [750, 0], sizes: [{ width: 728, height: 90 }] },
      { viewport: [1050, 0], sizes: [{ width: 970, height: 250 }] }
    ],    
    // Posição padrão caso não seja especificada
    'default': [
      { viewport: [0, 0], sizes: [{ width: 300, height: 250 }] },
      { viewport: [750, 0], sizes: [{ width: 300, height: 250 }] }
    ]
  };

  /**
   * Classe principal do AdManager
   */
  class AdManager {
    /**
     * Cria uma instância do AdManager
     * @param {Partial<AdManagerConfig>} config - Configuração do AdManager
     */
    constructor(config = {}) {
      this.config = { ...defaultConfig, ...config };
      this.slots = new Map();
      this.initialized = false;
      this.googletag = null;
      this.resizeTimeout = null;
      this.refreshTimeout = null;
      this.slotRenderEndedListeners = new Map();
      this.slotSizes = new Map(); // Armazena os tamanhos reais dos slots renderizados
      this.lastRefreshTime = 0; // Armazena o timestamp do último refresh
      this.positionCounters = {}; // Contador para cada posição
      this.visibilityObservers = new Map(); // Armazena os observers de visibilidade para cada slot
      this.isIntersectionObserverSupported = typeof IntersectionObserver !== 'undefined';
      this.utmParams = {}; // Armazena os parâmetros UTM capturados da URL
    }

    /**
     * Inicializa o Google Ad Manager
     * @returns {Promise<void>}
     */
    init() {
      return new Promise((resolve) => {
        if (this.initialized) {
          resolve();
          return;
        }

        // Captura os parâmetros UTM da URL se configurado
        if (this.config.captureUtmParams) {
          this.captureUtmParams();
        }

        // Adiciona o script do GPT de forma assíncrona
        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://securepubads.g.doubleclick.net/tag/js/gpt.js';
        
        script.onload = () => {
          // Garante que o objeto googletag esteja disponível
          window.googletag = window.googletag || { cmd: [] };
          this.googletag = window.googletag;
          
          // Configura o GPT
          this.googletag.cmd.push(() => {
            // Habilita o SRA (Single Request Architecture) se configurado
            if (this.config.enableSingleRequest) {
              this.googletag.pubads().enableSingleRequest();
            }
            
            // Colapsa divs vazias se configurado
            if (this.config.collapseEmptyDivs) {
              this.googletag.pubads().collapseEmptyDivs();
            }
            
            // Desabilita o carregamento inicial para permitir LazyLoad
            if (this.config.disableInitialLoad || this.config.enableLazyLoad) {
              this.googletag.pubads().disableInitialLoad();
            }
            
            // Configura o LazyLoad se habilitado
            if (this.config.enableLazyLoad) {
              this.googletag.pubads().enableLazyLoad({
                fetchMarginPercent: this.config.fetchMarginPercent,
                renderMarginPercent: this.config.renderMarginPercent,
                mobileScaling: this.config.mobileScaling
              });
            }
            
            // Configura o PPID se visitorEmailHash estiver definido
            if (this.config.visitorEmailHash) {
              this.googletag.pubads().setPublisherProvidedId(this.config.visitorEmailHash);
            }
            
            // Configura os targets globais
            this.setupGlobalTargeting();
            
            // Configura o evento slotRenderEnded para centralização
            this.googletag.pubads().addEventListener('slotRenderEnded', (event) => {
              this.handleSlotRenderEnded(event);
            });
            
            // Configura o evento impressionViewable para rastrear visibilidade
            this.googletag.pubads().addEventListener('impressionViewable', (event) => {
              const slotId = event.slot.getSlotElementId();
              const slotConfig = this.slots.get(slotId);
              
              if (slotConfig) {
                slotConfig.isVisible = true;
                console.log(`Slot ${slotId} está visível`);
              }
            });
            
            // Ativa os serviços
            this.googletag.enableServices();
            
            this.initialized = true;
            resolve();
          });
        };
        
        document.head.appendChild(script);
      });
    }

    /**
     * Captura os parâmetros UTM da URL atual
     */
    captureUtmParams() {
      // Lista de parâmetros UTM a serem capturados
      const utmParamsList = [
        'utm_campaign',
        'utm_content',
        'utm_id',
        'utm_medium',
        'utm_source',
        'utm_term'
      ];
      
      // Obtém os parâmetros da URL atual
      const urlParams = new URLSearchParams(window.location.search);
      
      // Captura cada parâmetro UTM se existir
      utmParamsList.forEach(param => {
        const value = urlParams.get(param);
        if (value) {
          this.utmParams[param] = value;
        }
      });
      
      // Log dos parâmetros UTM capturados
      if (Object.keys(this.utmParams).length > 0) {
        console.log('Parâmetros UTM capturados:', this.utmParams);
      }
    }

    /**
     * Configura os targets globais
     */
    setupGlobalTargeting() {
      // Targets padrão da configuração
      const targetingParams = [
        { key: 'pageAttributes', value: this.config.pageAttributes },
        { key: 'pagePostAuthor', value: this.config.pagePostAuthor },
        { key: 'pagePostTermsCat', value: this.config.pagePostTermsCat },
        { key: 'pagePostTermsTag', value: this.config.pagePostTermsTag },
        { key: 'pagePostType', value: this.config.pagePostType },
        { key: 'pagePostType2', value: this.config.pagePostType2 },
        { key: 'postID', value: this.config.postID }
      ];
      
      // Aplica os targets padrão
      targetingParams.forEach(param => {
        if (param.value !== null && param.value !== undefined) {
          this.googletag.pubads().setTargeting(param.key, param.value);
        }
      });
      
      // Aplica os parâmetros UTM como targets
      if (this.config.captureUtmParams) {
        Object.entries(this.utmParams).forEach(([key, value]) => {
          this.googletag.pubads().setTargeting(key, value);
        });
      }
    }

    /**
     * Manipula o evento slotRenderEnded para aplicar tamanho real e centralização
     * @param {Event} event - Evento slotRenderEnded
     */
    handleSlotRenderEnded(event) {
      // Obtém o ID do slot
      const slotId = event.slot.getSlotElementId();
      
      // Verifica se o slot existe
      const element = document.getElementById(slotId);
      if (!element) return;
      
      // Marca o slot como carregado
      const slotConfig = this.slots.get(slotId);
      if (slotConfig) {
        slotConfig.isLoaded = true;
      }
      
      // Verifica se o anúncio está vazio
      if (event.isEmpty) return;
      
      // Obtém o tamanho do anúncio
      const size = event.size;
      
      // Se o tamanho for um array [width, height]
      if (Array.isArray(size) && size.length === 2) {
        const [width, height] = size;
        
        // Armazena o tamanho real do slot
        this.slotSizes.set(slotId, { width, height });
        
        // Obtém a posição do elemento
        const position = element.dataset.pos || 'default';
        
        // Aplica o tamanho real ao elemento
        this.applyRealSize(element, width, height, position);
      }
      
      // Executa listeners personalizados
      if (this.slotRenderEndedListeners.has(slotId)) {
        const listeners = this.slotRenderEndedListeners.get(slotId);
        listeners.forEach(listener => listener(event));
      }
    }

    /**
     * Aplica o tamanho real ao elemento e configura centralização/margem negativa
     * @param {HTMLElement} element - Elemento do anúncio
     * @param {number} width - Largura do anúncio
     * @param {number} height - Altura do anúncio
     * @param {string} position - Posição do anúncio
     */
    applyRealSize(element, width, height, position) {
      // Verifica se o elemento existe
      if (!element) return;
      
      // Obtém o contêiner pai
      const parent = element.parentElement;
      const parentWidth = parent ? parent.offsetWidth : window.innerWidth;
      
      // Aplica o tamanho real ao elemento
      element.style.width = `${width}px`;
      element.style.height = `${height}px`;
      
      // Centraliza o anúncio se configurado
      if (this.config.centering) {
        if (width <= parentWidth) {
          // Se o anúncio for menor que o contêiner, centraliza normalmente
          element.style.margin = '0 auto';
          element.style.display = 'block';
        } else if (this.config.applyNegativeMargin) {
          // Se o anúncio for maior que o contêiner e applyNegativeMargin estiver ativado
          // Calcula a margem negativa necessária para centralizar
          const marginLeft = (parentWidth - width) / 2;
          
          // Verifica se há configuração específica de margem para esta posição
          const marginConfig = this.config.marginConfig[position];
          
          if (marginConfig) {
            // Remove margin auto antes
            element.style.margin = '0px';

            // Aplica margem esquerda
            if (marginConfig.left !== undefined) {
              element.style.marginLeft = `${marginConfig.left}px`;
            }

            // Aplica margem direita (opcional)
            if (marginConfig.right !== undefined) {
              element.style.marginRight = `${marginConfig.right}px`;
            }
          } else {
            // Aplica margem calculada automaticamente
            element.style.marginLeft = `${marginLeft}px`;
          }
          
          element.style.display = 'block';
        }
      }
      
      // Procura por iframes dentro do elemento (comum em anúncios)
      setTimeout(() => {
        const iframes = element.querySelectorAll('iframe');
        if (iframes.length > 0) {
          iframes.forEach(iframe => {
            // Ajusta o iframe para o tamanho real
            iframe.style.width = `${width}px`;
            iframe.style.height = `${height}px`;
          });
        }
        
        // Procura por divs do Google dentro do elemento
        const googleDivs = element.querySelectorAll('div[id^="google_ads_iframe_"]');
        if (googleDivs.length > 0) {
          googleDivs.forEach(div => {
            div.style.width = `${width}px`;
            div.style.height = `${height}px`;
          });
        }
      }, 100);
    }

    /**
     * Detecta e configura todos os slots de anúncios na página
     */
    detectAdSlots() {
      if (!this.initialized) {
        console.warn('AdManager não inicializado. Execute init() primeiro.');
        return;
      }

      // Limpa slots existentes e observers
      this.slots.clear();
      this.visibilityObservers.forEach(observer => {
        observer.disconnect();
      });
      this.visibilityObservers.clear();
      
      // Reinicia os contadores de posição
      this.positionCounters = {};

      // Encontra todas as divs com classe 'pubad'
      const adDivs = document.querySelectorAll('.pubad');
      
      // Primeiro passo: contar quantas divs existem para cada posição
      adDivs.forEach((div) => {
        const position = div.dataset.pos || 'default';
        if (!this.positionCounters[position]) {
          this.positionCounters[position] = 0;
        }
        this.positionCounters[position]++;
      });
      
      // Segundo passo: processar cada div e atribuir índice sequencial
      const processedPositions = {};
      
      adDivs.forEach((div, index) => {
        const element = div;
        const id = element.id || `ad-slot-${index}`;
        
        // Se não tiver ID, atribui um
        if (!element.id) {
          element.id = id;
        }
        
        // Obtém a posição do atributo data-pos ou usa 'default'
        const position = element.dataset.pos || 'default';
        
        // Inicializa o contador para esta posição se necessário
        if (!processedPositions[position]) {
          processedPositions[position] = 0;
        }
        
        // Incrementa o contador para esta posição
        processedPositions[position]++;
        
        // Cria a posição com índice sequencial (ex: meio_1, meio_2)
        const positionWithIndex = `${position}_${processedPositions[position]}`;
        
        // Atualiza o atributo data-pos com o valor enumerado
        element.dataset.posIndex = positionWithIndex;
        
        // Obtém o mapeamento de tamanhos para esta posição
        const sizeMapping = adSizesByPosition[position] || adSizesByPosition.default;
        
        // Obtém os tamanhos para a viewport atual
        const currentSizes = this.getCurrentSizes(sizeMapping);
        
        // Configura o slot
        const slotConfig = {
          id,
          sizes: currentSizes,
          sizeMapping,
          position,
          positionWithIndex,
          isLoaded: false,
          isVisible: false
        };
        
        this.slots.set(id, slotConfig);
        
        // Define o slot no GPT
        this.defineSlot(slotConfig);
        
        // Configura o observer de visibilidade para LazyLoad manual
        this.setupVisibilityObserver(element, slotConfig);
      });

      // Configura o refresh automático se habilitado
      this.setupRefresh();
      
      // Log para debug
      console.log('Posições detectadas:', this.positionCounters);
      console.log('Slots configurados:', this.slots);
    }

    /**
     * Configura o observer de visibilidade para LazyLoad manual
     * @param {HTMLElement} element - Elemento do anúncio
     * @param {AdSlotConfig} slotConfig - Configuração do slot
     */
    setupVisibilityObserver(element, slotConfig) {
      // Se o navegador não suporta IntersectionObserver, carrega todos os anúncios
      if (!this.isIntersectionObserverSupported) {
        this.loadAd(slotConfig.id);
        return;
      }
      
      // Cria um novo IntersectionObserver
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          // Se o elemento está visível ou próximo de ficar visível
          if (entry.isIntersecting) {
            // Carrega o anúncio se ainda não foi carregado
            if (!slotConfig.isLoaded) {
              this.loadAd(slotConfig.id);
            }
            
            // Marca o slot como visível
            slotConfig.isVisible = true;
            
            // Para de observar o elemento após carregar o anúncio
            observer.unobserve(element);
          }
        });
      }, {
        // Margem de 200px (carrega o anúncio quando estiver a 200px de distância da viewport)
        rootMargin: '200px',
        threshold: 0
      });
      
      // Começa a observar o elemento
      observer.observe(element);
      
      // Armazena o observer para limpeza posterior
      this.visibilityObservers.set(slotConfig.id, observer);
    }

    /**
     * Carrega um anúncio específico
     * @param {string} slotId - ID do slot
     */
    loadAd(slotId) {
      const slotConfig = this.slots.get(slotId);
      if (!slotConfig || slotConfig.isLoaded) return;
      
      this.googletag.cmd.push(() => {
        // Solicita o anúncio
        this.googletag.pubads().refresh([this.googletag.pubads().getSlots().find(slot => slot.getSlotElementId() === slotId)]);
        console.log(`Anúncio ${slotId} carregado`);
      });
    }

    /**
     * Define um slot no GPT
     * @param {AdSlotConfig} config - Configuração do slot
     * @private
     */
    defineSlot(config) {
      this.googletag.cmd.push(() => {
        // Cria o caminho completo da unidade de anúncio
        const adUnitPath = `${this.config.networkCode}${this.config.adUnitPath}`;
        
        // Define o slot com os tamanhos disponíveis
        const slot = this.googletag.defineSlot(
          adUnitPath,
          config.sizes.map(size => [size.width, size.height]),
          config.id
        );
        
        if (!slot) {
          console.warn(`Não foi possível definir o slot: ${config.id}`);
          return;
        }
        
        // Adiciona o mapeamento de tamanhos responsivos
        if (config.sizeMapping && config.sizeMapping.length > 0) {
          const sizeMapping = this.googletag.sizeMapping();
          
          config.sizeMapping.forEach(mapping => {
            sizeMapping.addSize(
              mapping.viewport,
              mapping.sizes.length > 0 
                ? mapping.sizes.map(size => [size.width, size.height]) 
                : []
            );
          });
          
          slot.defineSizeMapping(sizeMapping.build());
        }
        
        // Adiciona targeting para a posição base
        slot.setTargeting('pos', config.position);
        
        // Adiciona targeting para a posição com índice sequencial
        slot.setTargeting('pos_index', config.positionWithIndex);
        
        // Adiciona os parâmetros UTM como targeting para este slot
        if (this.config.captureUtmParams) {
          Object.entries(this.utmParams).forEach(([key, value]) => {
            slot.setTargeting(key, value);
          });
        }
        
        // Adiciona targeting se disponível
        if (config.targeting) {
          Object.entries(config.targeting).forEach(([key, value]) => {
            slot.setTargeting(key, value);
          });
        }
        
        // Adiciona o slot
        slot.addService(this.googletag.pubads());
        
        // Se não estiver usando LazyLoad, renderiza o slot imediatamente
        if (!this.config.enableLazyLoad) {
          this.googletag.display(config.id);
        }
      });
    }

    /**
     * Configura o refresh automático dos anúncios
     */
    setupRefresh() {
      // Limpa qualquer timeout existente
      if (this.refreshTimeout) {
        clearTimeout(this.refreshTimeout);
        this.refreshTimeout = null;
      }
      
      // Verifica se o refresh está habilitado
      if (this.config.refresh && this.config.refresh > 0) {
        const refreshInterval = this.config.refresh * 1000; // Converte para milissegundos
        
        // Configura o refresh automático
        this.refreshTimeout = setTimeout(() => {
          this.refreshAds();
          // Configura o próximo refresh
          this.setupRefresh();
        }, refreshInterval);
        
        // Alternativa: usar visibilidade da página para gerenciar refresh
        document.addEventListener('visibilitychange', () => {
          if (document.visibilityState === 'visible') {
            // Verifica se passou tempo suficiente desde o último refresh
            const now = Date.now();
            const timeSinceLastRefresh = now - this.lastRefreshTime;
            
            if (timeSinceLastRefresh >= refreshInterval) {
              this.refreshAds();
              // Reconfigura o timeout
              this.setupRefresh();
            }
          }
        });
      }
    }

    /**
     * Verifica se um elemento está visível na viewport
     * @param {HTMLElement} element - Elemento a ser verificado
     * @returns {boolean} - Verdadeiro se o elemento estiver visível
     */
    isElementVisible(element) {
      if (!element) return false;
      
      // Se o navegador suporta IntersectionObserver, usa o valor armazenado
      if (this.isIntersectionObserverSupported) {
        const slotId = element.id;
        const slotConfig = this.slots.get(slotId);
        return slotConfig ? slotConfig.isVisible : false;
      }
      
      // Fallback para verificação manual de visibilidade
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      
      return (
        rect.top <= windowHeight &&
        rect.bottom >= 0
      );
    }

    /**
     * Obtém os tamanhos para a viewport atual
     * @param {AdSizeMapping[]} sizeMapping - Mapeamento de tamanhos
     * @returns {AdSize[]} Tamanhos para a viewport atual
     * @private
     */
    getCurrentSizes(sizeMapping) {
      // Ordena o mapeamento do maior para o menor
      const sortedMapping = [...sizeMapping].sort((a, b) => {
        return b.viewport[0] - a.viewport[0];
      });
      
      const viewportWidth = window.innerWidth;
      
      // Encontra o primeiro mapeamento que se encaixa na viewport atual
      for (const mapping of sortedMapping) {
        if (viewportWidth >= mapping.viewport[0]) {
          return mapping.sizes;
        }
      }
      
      // Retorna tamanhos padrão se nenhum mapeamento for encontrado
      return [{ width: 300, height: 250 }];
    }

    /**
     * Atualiza os anúncios quando a viewport muda ou manualmente
     */
    refreshAds() {
      if (!this.initialized) return;
      
      this.googletag.cmd.push(() => {
        // Se deve atualizar apenas anúncios visíveis
        if (this.config.refreshOnlyVisible) {
          const visibleSlots = [];
          
          // Verifica quais slots estão visíveis
          this.slots.forEach((config, id) => {
            const element = document.getElementById(id);
            if (element && this.isElementVisible(element)) {
              const slot = this.googletag.pubads().getSlots().find(s => s.getSlotElementId() === id);
              if (slot) {
                visibleSlots.push(slot);
              }
            }
          });
          
          // Atualiza apenas os slots visíveis
          if (visibleSlots.length > 0) {
            this.googletag.pubads().refresh(visibleSlots);
            console.log(`Atualizados ${visibleSlots.length} anúncios visíveis em ${new Date().toLocaleTimeString()}`);
          }
        } else {
          // Atualiza todos os anúncios
          this.googletag.pubads().refresh();
          console.log(`Todos os anúncios atualizados em ${new Date().toLocaleTimeString()}`);
        }
        
        // Registra o timestamp do refresh
        this.lastRefreshTime = Date.now();
      });
    }

    /**
     * Configura o evento de redimensionamento para atualizar anúncios
     */
    setupResizeListener() {
      window.addEventListener('resize', () => {
        if (this.resizeTimeout) {
          window.clearTimeout(this.resizeTimeout);
        }
        
        // Debounce para evitar muitas atualizações durante o redimensionamento
        this.resizeTimeout = window.setTimeout(() => {
          this.refreshAds();
        }, 300);
      });
    }

    /**
     * Configura o mapeamento de tamanhos para uma posição específica
     * @param {string} position - Nome da posição
     * @param {AdSizeMapping[]} mapping - Mapeamento de tamanhos
     */
    setPositionSizeMapping(position, mapping) {
      if (Array.isArray(mapping) && mapping.length > 0) {
        adSizesByPosition[position] = mapping;
      }
    }

    /**
     * Adiciona uma nova posição com mapeamento de tamanhos
     * @param {string} position - Nome da posição
     * @param {AdSizeMapping[]} mapping - Mapeamento de tamanhos
     */
    addPosition(position, mapping) {
      this.setPositionSizeMapping(position, mapping);
    }

    /**
     * Adiciona um listener para o evento slotRenderEnded
     * @param {string} slotId - ID do slot
     * @param {Function} listener - Função de callback
     */
    addSlotRenderEndedListener(slotId, listener) {
      if (!this.slotRenderEndedListeners.has(slotId)) {
        this.slotRenderEndedListeners.set(slotId, []);
      }
      
      this.slotRenderEndedListeners.get(slotId).push(listener);
    }

    /**
     * Configura a margem negativa para uma posição específica
     * @param {string} position - Nome da posição
     * @param {Object} marginConfig - Configuração de margem (left, right)
     */
    setPositionMargin(position, marginConfig) {
      if (!this.config.marginConfig) {
        this.config.marginConfig = {};
      }
      
      this.config.marginConfig[position] = marginConfig;
      
      // Reaplicar margens para slots já renderizados com esta posição
      this.slots.forEach((config, id) => {
        if (config.position === position && this.slotSizes.has(id)) {
          const element = document.getElementById(id);
          if (element) {
            const size = this.slotSizes.get(id);
            this.applyRealSize(element, size.width, size.height, position);
          }
        }
      });
    }

    /**
     * Obtém o tamanho real de um slot renderizado
     * @param {string} slotId - ID do slot
     * @returns {Object|null} Tamanho do slot ou null se não encontrado
     */
    getSlotSize(slotId) {
      return this.slotSizes.get(slotId) || null;
    }

    /**
     * Aplica manualmente o tamanho real a um slot
     * @param {string} slotId - ID do slot
     * @param {number} width - Largura do slot
     * @param {number} height - Altura do slot
     */
    applySlotSize(slotId, width, height) {
      const element = document.getElementById(slotId);
      if (!element) return;
      
      const position = element.dataset.pos || 'default';
      this.slotSizes.set(slotId, { width, height });
      this.applyRealSize(element, width, height, position);
    }

    /**
     * Atualiza a configuração do AdManager
     * @param {Partial<AdManagerConfig>} config - Nova configuração
     */
    updateConfig(config) {
      // Atualiza a configuração
      Object.assign(this.config, config);
      
      // Atualiza o PPID se visitorEmailHash foi alterado
      if (config.visitorEmailHash !== undefined && this.initialized) {
        this.googletag.cmd.push(() => {
          this.googletag.pubads().setPublisherProvidedId(this.config.visitorEmailHash);
        });
      }
      
      // Reconfigura o refresh automático se o valor foi alterado
      if (config.refresh !== undefined) {
        this.setupRefresh();
      }
      
      // Recaptura os parâmetros UTM se a configuração foi alterada
      if (config.captureUtmParams !== undefined && config.captureUtmParams) {
        this.captureUtmParams();
      }
    }
    
    /**
     * Obtém informações sobre as posições enumeradas
     * @returns {Object} Objeto com contadores de posição
     */
    getPositionInfo() {
      return {
        counters: { ...this.positionCounters },
        slots: Array.from(this.slots.values()).map(slot => ({
          id: slot.id,
          position: slot.position,
          positionWithIndex: slot.positionWithIndex,
          isLoaded: slot.isLoaded,
          isVisible: slot.isVisible
        }))
      };
    }
    
    /**
     * Obtém os parâmetros UTM capturados
     * @returns {Object} Objeto com os parâmetros UTM
     */
    getUtmParams() {
      return { ...this.utmParams };
    }
  }

  // Cria uma instância global do AdManager
  const adManager = new AdManager();
  
  // Expõe a API pública
  window.GoogleAdManager = {
    /**
     * Inicializa o AdManager com configuração personalizada
     * @param {Partial<AdManagerConfig>} config - Configuração do AdManager
     * @returns {Promise<void>}
     */
    init: function(config = {}) {
      // Atualiza a configuração
      Object.assign(adManager.config, config);
      
      // Inicializa o AdManager
      return adManager.init().then(() => {
        // Detecta os slots de anúncios
        adManager.detectAdSlots();
        
        // Configura o listener de redimensionamento
        adManager.setupResizeListener();
        
        // Configura um MutationObserver para detectar novos slots de anúncios
        const observer = new MutationObserver((mutations) => {
          let shouldRefresh = false;
          
          mutations.forEach((mutation) => {
            if (mutation.type === 'childList') {
              mutation.addedNodes.forEach((node) => {
                if (node.nodeType === Node.ELEMENT_NODE) {
                  const element = node;
                  if (element.querySelector && (element.querySelector('.pubad') || element.classList && element.classList.contains('pubad'))) {
                    shouldRefresh = true;
                  }
                }
              });
            }
          });
          
          if (shouldRefresh) {
            // Atualiza os slots quando novos elementos são adicionados
            adManager.detectAdSlots();
          }
        });
        
        // Observa mudanças no DOM
        observer.observe(document.body, {
          childList: true,
          subtree: true
        });

        // Configura um timeout para aplicar tamanhos reais aos anúncios
        // que podem ter sido renderizados antes da configuração do listener
        setTimeout(() => {
          adManager.slots.forEach((config, id) => {
            const element = document.getElementById(id);
            if (element) {
              // Procura por iframes dentro do elemento
              const iframes = element.querySelectorAll('iframe');
              if (iframes.length > 0) {
                const iframe = iframes[0];
                const width = parseInt(iframe.width, 10) || iframe.offsetWidth;
                const height = parseInt(iframe.height, 10) || iframe.offsetHeight;
                
                if (width && height) {
                  adManager.applySlotSize(id, width, height);
                }
              }
            }
          });
        }, 1000);
      });
    },
    
    /**
     * Atualiza manualmente os anúncios
     * @param {boolean} [onlyVisible=true] - Atualizar apenas anúncios visíveis
     */
    refresh: function(onlyVisible = true) {
      // Salva a configuração atual
      const originalConfig = adManager.config.refreshOnlyVisible;
      
      // Aplica a configuração temporária
      adManager.config.refreshOnlyVisible = onlyVisible;
      
      // Atualiza os anúncios
      adManager.refreshAds();
      
      // Restaura a configuração original
      adManager.config.refreshOnlyVisible = originalConfig;
    },
    
    /**
     * Carrega manualmente um anúncio específico
     * @param {string} slotId - ID do slot
     */
    loadAd: function(slotId) {
      adManager.loadAd(slotId);
    },
    
    /**
     * Configura o mapeamento de tamanhos para uma posição específica
     * @param {string} position - Nome da posição
     * @param {AdSizeMapping[]} mapping - Mapeamento de tamanhos
     */
    setPositionSizeMapping: function(position, mapping) {
      adManager.setPositionSizeMapping(position, mapping);
    },
    
    /**
     * Adiciona uma nova posição com mapeamento de tamanhos
     * @param {string} position - Nome da posição
     * @param {AdSizeMapping[]} mapping - Mapeamento de tamanhos
     */
    addPosition: function(position, mapping) {
      adManager.addPosition(position, mapping);
    },

    /**
     * Adiciona um listener para o evento slotRenderEnded
     * @param {string} slotId - ID do slot
     * @param {Function} listener - Função de callback
     */
    addSlotRenderEndedListener: function(slotId, listener) {
      adManager.addSlotRenderEndedListener(slotId, listener);
    },

    /**
     * Configura a margem negativa para uma posição específica
     * @param {string} position - Nome da posição
     * @param {Object} marginConfig - Configuração de margem (left, right)
     */
    setPositionMargin: function(position, marginConfig) {
      adManager.setPositionMargin(position, marginConfig);
    },

    /**
     * Obtém o tamanho real de um slot renderizado
     * @param {string} slotId - ID do slot
     * @returns {Object|null} Tamanho do slot ou null se não encontrado
     */
    getSlotSize: function(slotId) {
      return adManager.getSlotSize(slotId);
    },

    /**
     * Aplica manualmente o tamanho real a um slot
     * @param {string} slotId - ID do slot
     * @param {number} width - Largura do slot
     * @param {number} height - Altura do slot
     */
    applySlotSize: function(slotId, width, height) {
      adManager.applySlotSize(slotId, width, height);
    },

    /**
     * Atualiza a configuração do AdManager
     * @param {Partial<AdManagerConfig>} config - Nova configuração
     */
    updateConfig: function(config) {
      adManager.updateConfig(config);
    },
    
    /**
     * Obtém informações sobre as posições enumeradas
     * @returns {Object} Objeto com contadores de posição
     */
    getPositionInfo: function() {
      return adManager.getPositionInfo();
    },
    
    /**
     * Verifica se um elemento está visível na viewport
     * @param {string} slotId - ID do slot
     * @returns {boolean} - Verdadeiro se o elemento estiver visível
     */
    isSlotVisible: function(slotId) {
      const element = document.getElementById(slotId);
      return adManager.isElementVisible(element);
    },
    
    /**
     * Obtém os parâmetros UTM capturados da URL
     * @returns {Object} Objeto com os parâmetros UTM
     */
    getUtmParams: function() {
      return adManager.getUtmParams();
    }
  };

})(window, document);
