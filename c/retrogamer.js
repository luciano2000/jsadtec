
function montaTudo(c) {
    const w = window.top;
    const d = w.document;
    const h = d.head || d.getElementsByTagName('head')[0];
    const b = d.body || d.getElementsByTagName('body')[0];
    let element = d.createElement(c.type);
    if (c.type == 'script') {
        element.type = 'text/javascript';
        element.async = true;
    };
    if (c.src != undefined) {
        element.src = c.src;
    };
    if (c.async != undefined) {
        element.async = true;
    };
    if (c.id != undefined) {
        element.id = c.id;
    };
    if (c.attributes != undefined) {
        const attr = Object.keys(c.attributes);
        attr.forEach((key) => {
            element.setAttribute(key, c.attributes[key]);
        });
    };
    if (c.innerHtml != undefined) {
        element.innerHTML = c.innerHtml;
    };
    return element
};

function setGPT(g) {

        const h = document.head || document.getElementsByTagName('head')[0];
        let gpt = montaTudo({
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

setGPT(window.googletag);