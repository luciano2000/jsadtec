(function() {
    // Adiciona o script do banner.js dinamicamente
    var bannerScript = document.createElement("script");
    bannerScript.src = "//t.ad.tec.br/banner.js"; // Atualize para o caminho correto
    bannerScript.async = true;
    document.head.appendChild(bannerScript);

    bannerScript.onload = function() {
        console.log("banner.js carregado com sucesso!");
    };
})();