setGPT(window.googletag);

function setGPT(g) {

        const h = document.head || document.getElementsByTagName('head')[0];
        let gpt = assembleElement({
            type: 'script',
            src: '//securepubads.g.doubleclick.net/tag/js/gpt.js',
            attributes: {
                'data-cfasync': 'false',
            }
        });
        h.appendChild(gpt);
    window.googletag = window.googletag || {};
    window.googletag.cmd = window.googletag.cmd || [];
    googletag.cmd.push(function () {
        googletag.pubads().disableInitialLoad();
    });
};

(function () {
    var w = window.top, d = w.document, h = d.head || d.getElementsByTagName("head")[0];
    var s = d.createElement("script");
    s.src = "//t.ad.tec.br/banner.js";
    s.type = "text/javascript";
    s.async = true;
    s.setAttribute("data-cfasync", "false");
    h.appendChild(s);
})();