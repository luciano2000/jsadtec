Documentação do Google AdManager Simplificado

Visão Geral

Este script simplificado do Google AdManager foi desenvolvido para facilitar a integração de anúncios em sites de notícias e publishers. Ele permite a configuração dinâmica de banners publicitários que se adaptam automaticamente a diferentes resoluções de tela, com uma implementação simples via tag script ou Google Tag Manager.

Características Principais

•
Arquivo Único: Toda a funcionalidade está contida em um único arquivo JavaScript.

•
Fácil Implementação: Basta incluir o script e inicializar com uma configuração básica.

•
Detecção Automática: Identifica automaticamente elementos com a classe pubad.

•
Configuração via Atributos: Define tamanhos e comportamentos via atributo data-pos.

•
Responsividade: Adapta os anúncios automaticamente a diferentes tamanhos de tela.

•
Carregamento Assíncrono: Carrega o script do Google AdManager de forma não-bloqueante.

•
Compatibilidade com GTM: Pode ser facilmente implementado via Google Tag Manager.

Como Implementar

1. Via Tag Script Direta

Adicione o script ao cabeçalho da sua página:

HTML


<head>
    <!-- Outros elementos do cabeçalho -->
    <script src="caminho/para/google-admanager.js"></script>
</head>


No final da página, antes do fechamento da tag </body>, inicialize o script:

HTML


<script>
    GoogleAdManager.init({
        networkCode: '1234567', // Seu código de rede
        adUnitPath: '/rede/site', // Caminho da unidade de anúncio
        collapseEmptyDivs: true,
        enableSingleRequest: true
    });
</script>
</body>


2. Via Google Tag Manager

1.
Faça upload do arquivo google-admanager.js para seu servidor.

2.
No Google Tag Manager, crie uma nova tag HTML personalizada.

3.
Adicione o seguinte código à tag:

HTML


<script src="https://seu-servidor.com/caminho/para/google-admanager.js"></script>
<script>
    GoogleAdManager.init({
        networkCode: '1234567', // Seu código de rede
        adUnitPath: '/rede/site', // Caminho da unidade de anúncio
        collapseEmptyDivs: true,
        enableSingleRequest: true
    });
</script>


1.
Configure a tag para disparar na visualização de página (Page View).

Inserindo Anúncios na Página

Para inserir um espaço de anúncio, adicione um elemento com a classe pubad e o atributo data-pos:

HTML


<div class="pubad" data-pos="topo"></div>


O atributo data-pos define o tipo/posição do anúncio, que determina os tamanhos disponíveis para diferentes resoluções.

Posições Pré-configuradas

O script vem com as seguintes posições pré-configuradas:

PosiçãoDescriçãoTamanhos por ResoluçãotopoBanners no topo da páginaMobile: 320x50, 320x100<br>Tablet: 728x90<br>Desktop: 970x90, 970x250lateralBanners lateraisMobile: Nenhum<br>Desktop: 300x250, 300x600rodapeBanners no rodapéMobile: 320x50<br>Tablet/Desktop: 728x90inreadBanners dentro do conteúdoMobile: 300x250<br>Tablet/Desktop: 640x360defaultPosição padrãoTodos: 300x250

Parâmetros de Configuração

Parâmetros do método init()

ParâmetroTipoPadrãoDescriçãonetworkCodestring'1234567'Código da rede do Google AdManageradUnitPathstring'/rede/site'Caminho da unidade de anúnciocollapseEmptyDivsbooleantrueColapsar divs vazias quando não há anúnciosenableSingleRequestbooleantrueHabilitar requisição única para todos os anúnciosdisableInitialLoadbooleanfalseDesabilitar carregamento inicial dos anúncios

API Pública

O script expõe um objeto global GoogleAdManager com os seguintes métodos:

GoogleAdManager.init(config)

Inicializa o AdManager com a configuração fornecida.

JavaScript


GoogleAdManager.init({
    networkCode: '1234567',
    adUnitPath: '/rede/site'
});


GoogleAdManager.refresh()

Atualiza manualmente todos os anúncios na página.

JavaScript


GoogleAdManager.refresh();


GoogleAdManager.addPosition(position, mapping)

Adiciona uma nova posição com mapeamento de tamanhos personalizado.

JavaScript


GoogleAdManager.addPosition('personalizado', [
    { viewport: [0, 0], sizes: [{ width: 300, height: 250 }] },
    { viewport: [768, 0], sizes: [{ width: 336, height: 280 }] },
    { viewport: [1024, 0], sizes: [{ width: 728, height: 90 }] }
]);


GoogleAdManager.setPositionSizeMapping(position, mapping)

Modifica o mapeamento de tamanhos de uma posição existente.

JavaScript


GoogleAdManager.setPositionSizeMapping('topo', [
    { viewport: [0, 0], sizes: [{ width: 320, height: 100 }] },
    { viewport: [768, 0], sizes: [{ width: 728, height: 90 }] }
]);


Exemplo Completo

Veja o arquivo exemplo-uso.html para um exemplo completo de implementação.

Considerações de Performance

•
O script utiliza carregamento assíncrono para não bloquear o carregamento da página.

•
Implementa debounce no evento de redimensionamento para evitar múltiplas atualizações.

•
Utiliza Single Request Architecture (SRA) para melhorar a performance.

•
Detecta automaticamente novos elementos adicionados ao DOM.

Compatibilidade

•
Navegadores modernos com suporte a ES6

•
Internet Explorer 11 não é suportado
