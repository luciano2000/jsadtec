/**
 * Este script cria uma barra de navegação no topo da página com links para sites parceiros.
 * As configurações de cor, tamanho e classe CSS podem ser passadas via parâmetros na URL do script.
 * Exemplo: <script src="https://servidor/caminho/script.js?cor1=#FFFFFF&cor2=#FF0000&tamanho=800&classeMenu=minha-classe-responsiva"></script>
 */

(function() {
    // Função para obter parâmetros da URL do script
    function getScriptParameters() {
        const scripts = document.getElementsByTagName("script");
        let currentScript = null;

        // Encontra o script atual (este script)
        for (let i = 0; i < scripts.length; i++) {
            if (scripts[i].src.includes("par.js")) { // Pode precisar de um identificador mais robusto se houver outros scripts com 'script.js'
                currentScript = scripts[i];
                break;
            }
        }

        if (!currentScript) {
            console.error("Script atual não encontrado.");
            return {};
        }

        const url = new URL(currentScript.src);
        const params = {};
        for (const [key, value] of url.searchParams.entries()) {
            params[key] = value;
        }
        return params;
    }

    const params = getScriptParameters();

    const defaultBgColor = "#333333";
    const defaultTextColor = "#FFFFFF";
    const defaultMenuWidth = "100%"; // Largura padrão para o menu interno
    const defaultMenuClass = ""; // Classe CSS padrão para o menu interno

    const bgColor = params.cor1 || defaultBgColor;
    const textColor = params.cor2 || defaultTextColor;
    const menuWidth = params.tamanho ? `${params.tamanho}px` : defaultMenuWidth;
    const menuClass = params.classeMenu || defaultMenuClass;

    // Dados dos sites parceiros
    const partners = [
        { name: "ACONTECE", url: "https://acontece.org" },
        { name: "BRASILBUZZ", url: "https://www.brasilbuzz.com.br" },
        { name: "CULTURA POP", url: "https://culturapop.io" },
        { name: "EV NEWS", url: "https://www.evnews.com.br" },
        { name: "RETROGAMER BRASIL", url: "https://www.retrogamer.com.br" }
    ];

    // Cria os elementos da barra de navegação
    const navBar = document.createElement("div");
    navBar.style.backgroundColor = bgColor;
    navBar.style.color = textColor;
    navBar.style.width = "100%"; // A barra principal sempre terá 100% de largura
    navBar.style.padding = "10px 0";
    navBar.style.textAlign = "center";
    navBar.style.position = "relative"; // Para garantir que fique no topo
    navBar.style.zIndex = "9999"; // Para garantir que fique acima de outros elementos
    navBar.id = "parceiros";

    const ul = document.createElement("ul");
    ul.style.listStyle = "none";
    ul.style.margin = "0 auto"; // Centraliza o menu interno
    ul.style.padding = "0";
    ul.style.display = "flex";
    ul.style.justifyContent = "space-between";
    ul.style.flexWrap = "wrap";
    ul.style.width = menuWidth; // Aplica a largura configurável ao menu interno
    if (menuClass) {
        ul.classList.add(menuClass);
    }

    partners.forEach(partner => {
        const li = document.createElement("li");
        li.style.margin = "0 15px";

        const a = document.createElement("a");
        a.href = partner.url;
        a.textContent = partner.name.toUpperCase();
        a.style.color = textColor;
        a.style.textDecoration = "none";
        a.style.fontWeight = "bold";
        a.style.whiteSpace = "nowrap"; // Evita quebra de linha em nomes longos

        // Efeito hover simples
        a.onmouseover = function() { this.style.textDecoration = "underline"; };
        a.onmouseout = function() { this.style.textDecoration = "none"; };

        li.appendChild(a);
        ul.appendChild(li);
    });

    navBar.appendChild(ul);

    // Insere a barra de navegação no topo do body
    if (document.body) {
        document.body.insertBefore(navBar, document.body.firstChild);
    } else {
        // Se o body ainda não estiver disponível, espera o DOM carregar
        document.addEventListener("DOMContentLoaded", () => {
            document.body.insertBefore(navBar, document.body.firstChild);

        });
    }
})();
