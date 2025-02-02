(function() {
    // Carrega o Google Ad Manager (GPT.js)
    var gptScript = document.createElement("script");
    gptScript.src = "//securepubads.g.doubleclick.net/tag/js/gpt.js";
    gptScript.async = true;
    document.head.appendChild(gptScript);

    gptScript.onload = function() {
        console.log("GPT.js carregado com sucesso!");

        // Após carregar GPT.js, carrega o banner.js
        var bannerScript = document.createElement("script");
        bannerScript.src = "//t.ad.tec.br/banner.js"; // Atualize para o caminho correto
        bannerScript.async = true;
        document.head.appendChild(bannerScript);
    };
})();