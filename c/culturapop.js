const it = window.innerWidth;
let nom1, nom2, nom3, nom4, tam1, tam2, tam3, tam4;

// Obtém a URL atual
const urlAtual = window.location.href;

// Função para extrair parâmetros da URL
const obterParametroDaURL = (nome) => {
    const regex = new RegExp(`[\\?&]${nome.replace(/[[]/, '\\[').replace(/[\]]/, '\\]')}=([^&#]*)`);
    const resultados = regex.exec(urlAtual);
    return resultados ? decodeURIComponent(resultados[1].replace(/\+/g, ' ')) : '';
};

// Extrai os valores dos parâmetros
const utmParams = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_id', 'utm_term', 'utm_content'].reduce((acc, param) => {
    acc[param] = obterParametroDaURL(param);
    return acc;
}, {});

window.googletag = window.googletag || { cmd: [] };
window.googletag.site = {
    account: "/1013246/culturapop/",
    section: "home",
    slots: [],
    formats: {}
};

const sizeMapping = [
    { minWidth: 1340, sizes: [[[1260, 250], [970, 250]], [[728, 90]], [[970, 250]], [[970, 90], [728, 90]]] },
    { minWidth: 1070, sizes: [[[970, 250]], [[728, 90]], [[970, 250]], [[970, 90], [728, 90]]] },
    { minWidth: 830, sizes: [[[728, 90]], [[468, 60]], [[300, 250]], [[728, 90]]] },
    { minWidth: 570, sizes: [[[468, 60]], [[320, 50]], [[300, 250]], [[468, 60]]] },
    { minWidth: 330, sizes: [[[320, 50], [320, 100]], [[320, 50]], [[300, 250]], [[320, 50]]] },
    { minWidth: 0, sizes: [[[320, 50], [320, 100]], [[320, 50]], [[300, 250]], [[320, 50]]] }
];

const selectedMapping = sizeMapping.find(mapping => it >= mapping.minWidth);
[tam1, tam2, tam3, tam4] = selectedMapping.sizes;
[nom1, nom2, nom3, nom4] = ['banner', 'feed', 'banner-materia', 'banner-topo'].map((prefix, index) => `${prefix}_${tam1[index][0]}x${tam1[index][1]}`);

window.googletag.site.formats = {
    'H1': { sizes: tam1, prefix: nom1 },
    'H2': { sizes: tam2, prefix: nom2 },
    'HT': { sizes: tam4, prefix: nom4 },
    'BM': { sizes: tam3, prefix: nom3 },
    'B1': { sizes: [[300, 250]], prefix: "banner-barra_300x250" },
    'B2': { sizes: [[300, 600]], prefix: "banner-barra_300x600" },
    'B3': { sizes: [[300, 250]], prefix: "banner-materia_300x250" },
    'B3A': { sizes: [[300, 250]], prefix: "banner-materia-esquerda_300x250" },
    'B3B': { sizes: [[300, 250]], prefix: "banner-materia-direita_300x250" },
    'BC': { sizes: [[320, 100], [320, 50]], prefix: "banner-barra_320x50" }
};

window.googletag.site.removeAllCharacter = (k) => {
    if (!k) return k;
    const ac = 'áàãâäéèêëíìîïóòõôöúùûüçÁÀÃÂÄÉÈÊËÍÌÎÏÓÒÕÖÔÚÙÛÜÇ';
    const sac = 'aaaaaeeeeiiiiooooouuuucAAAAAEEEEIIIIOOOOOUUUUC';
    return k.map(p => p.replace(/[&\/\\#+=_\[\]()$~%.:*?`!<>{}@^~ªº°;|\s]/g, '-')
        .split('').map(char => ac.includes(char) ? sac[ac.indexOf(char)] : char).join('').toLowerCase());
};

const bannerScript = document.createElement("script");
bannerScript.src = "//t.ad.tec.br/banner.js";
bannerScript.async = true;
document.head.appendChild(bannerScript);