var it = window.innerWidth;
var nom1,nom2,nom3,tam1,tam2,tam3;

// Obtém a URL atual
var urlAtual = window.location.href;

// Função para extrair parâmetros da URL
function obterParametroDaURL(nome) {
    nome = nome.replace(/[[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + nome + '=([^&#]*)');
    var resultados = regex.exec(urlAtual);
    return resultados === null ? '' : decodeURIComponent(resultados[1].replace(/\+/g, ' '));
}

// Extrai os valores dos parâmetros
var utmSource = obterParametroDaURL('utm_source');
var utmMedium = obterParametroDaURL('utm_medium');
var utmCampaign = obterParametroDaURL('utm_campaign');
var utmId = obterParametroDaURL('utm_id');
var utmTerm = obterParametroDaURL('utm_term');
var utmContent = obterParametroDaURL('utm_content');

window.googletag = window.googletag || {cmd:[]};
window.googletag.site = {};
window.googletag.site.account = "/1013246/evnews/";
window.googletag.site.section = "home";
//window.googletag.site.section = "{{pagePostTerms.category}}";
window.googletag.site.slots = [];
switch (true) {
  case it >= 1340:
    tam1 = [[1260, 250],[970, 250]];
    tam2 = [[728, 90]];
    tam3 = [[970, 250]];
    tam4 = [[970, 90],[728, 90]];
    nom1 = 'banner_970x250';
    nom2 = 'feed_728X90';
    nom3 = 'banner-materia_970x250';
    nom4 = 'banner-topo_970x90';
    break;
    case it >= 1070:
    tam1 = [[970, 250]];
    tam2 = [[728, 90]];
    tam3 = [[970, 250]];
    tam4 = [[970, 90],[728, 90]];
    nom1 = 'banner_970x250';
    nom2 = 'feed_728X90';
    nom3 = 'banner-materia_970x250';
    nom4 = 'banner-topo_970x90';
    break;
    case it >= 830:
    tam1 = [[728, 90]];
    tam2 = [[468, 60]];
    tam3 = [[300, 250]];
    tam4 = [[728, 90]];
   nom1 = 'banner_728x90';
    nom2 = 'feed_468x60';
    nom3 = 'banner-materia_300x250';
    nom4 = 'banner-topo_728x90';
    break;
    case it >= 570:
    tam1 = [[468, 60]];
    tam2 = [[320, 50]];
    tam3 = [[300, 250]];
    tam4 = [[468, 60]];
    nom1 = 'banner_468x60';
    nom2 = 'feed_320x50';
    nom3 = 'banner-materia_300x250';
    nom4 = 'banner-topo_468x60';
    break;        
    case it >= 330:
    tam1 = [[320, 50],[320, 100]];
    tam2 = [[320, 50]];
    tam3 = [[300, 250]];
    tam4 = [[320, 50]];
    nom1 = 'banner_320x50';
    nom2 = 'feed_320x50';
    nom3 = 'banner-materia_300x250';
    nom4 = 'banner-topo_320x50';
   break; 
    default:
    tam1 = [[320, 50],[320, 100]];
    tam2 = [[320, 50]];
    tam3 = [[300, 250]];
    tam4 = [[320, 50]];
   nom1 = 'banner_320x50';
    nom2 = 'feed_320x50';
    nom3 = 'banner-materia_300x250';
   nom4 = 'banner-topo_320x50';
}
window.googletag.site.formats = {
  'H1': {
    sizes: tam1,
    prefix: nom1
  },
  'H2': {
    sizes: tam2,
    prefix: nom2
  },   
  'HT': {
    sizes: tam4,
    prefix: nom4
  },         
  'BM': {
    sizes: tam3,
    prefix: nom3
  },        
  'B1': {
    sizes : [[300, 250]],
    prefix: "banner-barra_300x250"
  },
  'B2': {
    sizes : [[300,600]],
    prefix: "banner-barra_300x600"
  },
  'B3': {
    sizes : [[300, 250]],
    prefix: "banner-materia_300x250"
  },   
  'B3A': {
    sizes : [[300, 250]],
    prefix: "banner-materia-esquerda_300x250"
  },         
  'B3B': {
    sizes : [[300, 250]],
    prefix: "banner-materia-direita_300x250"
  },  
  'BC': {
    sizes : [[320,100],[320, 50]],
    prefix: "banner-barra_320x50"
  }        
};
window.googletag.site.removeAllCharacter = function (k) {
  if(k !== undefined){
    var ctl = [], n, p,
    ac = 'áàãâäéèêëíìîïóòõôöúùûüçÁÀÃÂÄÉÈÊËÍÌÎÏÓÒÕÖÔÚÙÛÜÇ',
    sac = 'aaaaaeeeeiiiiooooouuuucAAAAAEEEEIIIIOOOOOUUUUC';
    for (var j=0; j < k.length; j++) {
      p = k[j]; 
      n = '';
      p = p.replace(/[&\/\\#+=_\[\]()$~%.:*?`!<>{}@^~ªº°;|\s]/g, '-');
      for(var i=0; i < p.length; i++) {
        if (ac.search(p.substr(i,1))>=0 && p.substr(i,1) != '.') {
          n+=sac.substr(ac.search(p.substr(i,1)),1);
        }
        else {
          n+=p.substr(i,1);
        }
      }
      ctl.push(n.toLowerCase());
    }
    return ctl;
  }
  else{
    return k;
  }
};


var bannerScript = document.createElement("script");
bannerScript.src = "//t.ad.tec.br/banner.js"; 
bannerScript.async = true;
document.head.appendChild(bannerScript);