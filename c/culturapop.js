(function() {
    // Carrega o Google Ad Manager (GPT.js)
    var gptScript = document.createElement("script");
    gptScript.src = "https://securepubads.g.doubleclick.net/tag/js/gpt.js";
    gptScript.async = true;
    document.head.appendChild(gptScript);

    gptScript.onload = function() {
        console.log("GPT.js carregado com sucesso!");

        // Após carregar GPT.js, carrega o banner.js
        var bannerScript = document.createElement("script");
        bannerScript.src = "/caminho/para/banner.js"; // Atualize para o caminho correto
        bannerScript.async = true;
        document.head.appendChild(bannerScript);

        bannerScript.onload = function() {
            console.log("Banner.js carregado com sucesso!");
        };
    };
})();