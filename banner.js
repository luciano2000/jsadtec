(function() {
    // Adiciona o script do Google Ad Manager de forma assíncrona
    var gptScript = document.createElement("script");
    gptScript.src = "https://securepubads.g.doubleclick.net/tag/js/gpt.js";
    gptScript.async = true;
    document.head.appendChild(gptScript);

    // Quando o script for carregado, inicializa a GPT
    gptScript.onload = function() {
        console.log("GPT.js carregado com sucesso!");
        window.googletag = window.googletag || { cmd: [] };

        googletag.cmd.push(function() {
            console.log("Configurando os slots de anúncio...");
            googletag.pubads().enableSingleRequest();
            googletag.enableServices();
        });
    };
})();