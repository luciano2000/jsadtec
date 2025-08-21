# Documentação do Google AdManager Simplificado

## Visão Geral

Este script simplificado do Google AdManager foi desenvolvido para facilitar a integração de anúncios em sites de notícias e publishers. Ele permite a configuração dinâmica de banners publicitários que se adaptam automaticamente a diferentes resoluções de tela, com uma implementação simples via tag script ou Google Tag Manager.

## Características Principais

- **Arquivo Único**: Toda a funcionalidade está contida em um único arquivo JavaScript.
- **Fácil Implementação**: Basta incluir o script e inicializar com uma configuração básica.
- **Detecção Automática**: Identifica automaticamente elementos com a classe `pubad`.
- **Configuração via Atributos**: Define tamanhos e comportamentos via atributo `data-pos`.
- **Responsividade**: Adapta os anúncios automaticamente a diferentes tamanhos de tela.
- **Carregamento Assíncrono**: Carrega o script do Google AdManager de forma não-bloqueante.
- **Compatibilidade com GTM**: Pode ser facilmente implementado via Google Tag Manager.

## Como Implementar

### 1. Via Tag Script Direta

Adicione o script ao cabeçalho da sua página:

```html
<head>
    <!-- Outros elementos do cabeçalho -->
    <script src="caminho/para/google-admanager.js"></script>
</head>
```

No final da página, antes do fechamento da tag `</body>`, inicialize o script:

```html
<script>
    GoogleAdManager.init({
        networkCode: '1234567', // Seu código de rede
        adUnitPath: '/rede/site', // Caminho da unidade de anúncio
        collapseEmptyDivs: true,
        enableSingleRequest: true
    });
</script>
</body>
```

### 2. Via Google Tag Manager

1. Faça upload do arquivo `google-admanager.js` para seu servidor.
2. No Google Tag Manager, crie uma nova tag HTML personalizada.
3. Adicione o seguinte código à tag:

```html
<script src="https://seu-servidor.com/caminho/para/google-admanager.js"></script>
<script>
    GoogleAdManager.init({
        networkCode: '1234567', // Seu código de rede
        adUnitPath: '/rede/site', // Caminho da unidade de anúncio
        collapseEmptyDivs: true,
        enableSingleRequest: true
    });
</script>
```

4. Configure a tag para disparar na visualização de página (Page View).

## Inserindo Anúncios na Página

Para inserir um espaço de anúncio, adicione um elemento com a classe `pubad` e o atributo `data-pos`:

```html
<div class="pubad" data-pos="topo"></div>
```

O atributo `data-pos` define o tipo/posição do anúncio, que determina os tamanhos disponíveis para diferentes resoluções.

## Posições Pré-configuradas

O script vem com as seguintes posições pré-configuradas:

| Posição | Descrição | Tamanhos por Resolução |
|---------|-----------|------------------------|
| `topo` | Banners no topo da página | Mobile: 320x50, 320x100<br>Tablet: 728x90<br>Desktop: 970x90, 970x250 |
| `lateral` | Banners laterais | Mobile: Nenhum<br>Desktop: 300x250, 300x600 |
| `rodape` | Banners no rodapé | Mobile: 320x50<br>Tablet/Desktop: 728x90 |
| `inread` | Banners dentro do conteúdo | Mobile: 300x250<br>Tablet/Desktop: 640x360 |
| `default` | Posição padrão | Todos: 300x250 |

## Parâmetros de Configuração

### Parâmetros do método `init()`

| Parâmetro | Tipo | Padrão | Descrição |
|-----------|------|--------|-----------|
| `networkCode` | string | '1234567' | Código da rede do Google AdManager |
| `adUnitPath` | string | '/rede/site' | Caminho da unidade de anúncio |
| `collapseEmptyDivs` | boolean | true | Colapsar divs vazias quando não há anúncios |
| `enableSingleRequest` | boolean | true | Habilitar requisição única para todos os anúncios |
| `disableInitialLoad` | boolean | false | Desabilitar carregamento inicial dos anúncios |

## API Pública

O script expõe um objeto global `GoogleAdManager` com os seguintes métodos:

### `GoogleAdManager.init(config)`

Inicializa o AdManager com a configuração fornecida.

```javascript
GoogleAdManager.init({
    networkCode: '1234567',
    adUnitPath: '/rede/site'
});
```

### `GoogleAdManager.refresh()`

Atualiza manualmente todos os anúncios na página.

```javascript
GoogleAdManager.refresh();
```

### `GoogleAdManager.addPosition(position, mapping)`

Adiciona uma nova posição com mapeamento de tamanhos personalizado.

```javascript
GoogleAdManager.addPosition('personalizado', [
    { viewport: [0, 0], sizes: [{ width: 300, height: 250 }] },
    { viewport: [768, 0], sizes: [{ width: 336, height: 280 }] },
    { viewport: [1024, 0], sizes: [{ width: 728, height: 90 }] }
]);
```

### `GoogleAdManager.setPositionSizeMapping(position, mapping)`

Modifica o mapeamento de tamanhos de uma posição existente.

```javascript
GoogleAdManager.setPositionSizeMapping('topo', [
    { viewport: [0, 0], sizes: [{ width: 320, height: 100 }] },
    { viewport: [768, 0], sizes: [{ width: 728, height: 90 }] }
]);
```

## Exemplo Completo

Veja o arquivo `exemplo-uso.html` para um exemplo completo de implementação.

## Considerações de Performance

- O script utiliza carregamento assíncrono para não bloquear o carregamento da página.
- Implementa debounce no evento de redimensionamento para evitar múltiplas atualizações.
- Utiliza Single Request Architecture (SRA) para melhorar a performance.
- Detecta automaticamente novos elementos adicionados ao DOM.

## Compatibilidade

- Navegadores modernos com suporte a ES6
- Internet Explorer 11 não é suportado
____
# Documentação da Centralização de Anúncios no Google AdManager

## Visão Geral

Esta atualização do script Google AdManager adiciona suporte à centralização dinâmica de anúncios, detectando automaticamente o tamanho real do banner após a renderização e aplicando os estilos necessários para garantir que o anúncio fique centralizado na página.

## Principais Melhorias

1. **Centralização Dinâmica**: Detecta automaticamente o tamanho real do anúncio após a renderização
2. **Compatibilidade com Diferentes Resoluções**: Funciona em qualquer tamanho de tela
3. **Suporte a Múltiplos Formatos**: Centraliza corretamente banners de diferentes tamanhos
4. **Detecção Inteligente**: Identifica e centraliza iframes e divs do Google dentro dos slots de anúncios
5. **Centralização Manual**: Oferece métodos para centralizar anúncios manualmente quando necessário

## Como Usar a Centralização

### 1. Ativação Automática

Para ativar a centralização automática, basta adicionar o parâmetro `centering: true` na configuração do AdManager:

```javascript
GoogleAdManager.init({
    networkCode: '1234567',
    adUnitPath: '/rede/site',
    centering: true  // Ativa a centralização automática
});
```

### 2. Centralização Manual

Se precisar centralizar anúncios manualmente (por exemplo, após carregamento dinâmico de conteúdo):

```javascript
// Centralizar um anúncio específico pelo ID
GoogleAdManager.centerAd('id-do-seu-slot');

// Centralizar todos os anúncios
GoogleAdManager.centerAllAds();
```

### 3. Eventos Personalizados

Para executar código personalizado após a renderização de um anúncio:

```javascript
GoogleAdManager.addSlotRenderEndedListener('id-do-seu-slot', function(event) {
    // Seu código personalizado aqui
    console.log('Anúncio renderizado:', event);
});
```

## Como Funciona

1. O script detecta quando um anúncio é renderizado através do evento `slotRenderEnded`
2. Obtém o tamanho real do anúncio a partir do evento
3. Compara com o tamanho do contêiner pai
4. Se o anúncio for menor que o contêiner, aplica estilos para centralização
5. Também procura por iframes e divs do Google dentro do slot para garantir centralização completa
6. Inclui um fallback que tenta centralizar manualmente após 1 segundo, para casos onde o evento não é capturado

## Resolução de Problemas

Se os anúncios não estiverem centralizados corretamente:

1. **Verifique se o script está sendo carregado**: Confirme que o script está sendo incluído corretamente na página
2. **Ative o modo de depuração**: Adicione `console.log` para verificar se os eventos estão sendo capturados
3. **Tente a centralização manual**: Use `GoogleAdManager.centerAllAds()` para forçar a centralização
4. **Verifique conflitos de CSS**: Certifique-se de que não há estilos na página que possam estar sobrescrevendo a centralização

## Exemplo Completo

```html
<head>
    <script src="caminho/para/google-admanager-updated.js"></script>
</head>
<body>
    <!-- Seus elementos de anúncio -->
    <div class="pubad" data-pos="topo"></div>
    
    <script>
        GoogleAdManager.init({
            networkCode: '1234567',
            adUnitPath: '/rede/site',
            centering: true
        });
    </script>
</body>
```

## Notas Importantes

- A centralização funciona melhor quando o contêiner pai tem uma largura definida
- Para anúncios responsivos, o script ajustará a centralização automaticamente quando a janela for redimensionada
- A centralização é aplicada apenas quando o anúncio é menor que seu contêiner pai

_____

# Documentação: Suporte a Banners Maiores que o Container

## Visão Geral

Esta atualização do script Google AdManager adiciona suporte para banners que são maiores que o container que os contém, permitindo que eles sejam exibidos em sua largura total sem serem cortados, através da aplicação dinâmica do tamanho real e suporte a margens negativas customizáveis.

## Problema Resolvido

Em páginas como culturapop.io, quando um banner grande (ex: 970px de largura) é entregue pelo AdManager, ele pode ser cortado pelo container pai (ex: .entry-content) que tem uma largura menor. Esta atualização resolve esse problema:

1. Detectando o tamanho real do banner entregue pelo AdManager
2. Aplicando esse tamanho diretamente no elemento .pubad
3. Permitindo configurar margens negativas para alinhar visualmente o banner

## Novas Funcionalidades

### 1. Aplicação Automática do Tamanho Real

O script agora detecta automaticamente o tamanho real do banner entregue pelo AdManager e aplica esse tamanho diretamente no elemento .pubad, garantindo que o banner seja exibido em sua largura total.

```javascript
GoogleAdManager.init({
    networkCode: '1234567',
    adUnitPath: '/rede/site',
    centering: true,
    applyNegativeMargin: true  // Ativa o suporte a margens negativas
});
```

### 2. Configuração de Margens Negativas

Para banners que são maiores que o container, você pode configurar margens negativas específicas para cada posição, permitindo um ajuste visual perfeito:

```javascript
// Configurar margens negativas para uma posição específica
GoogleAdManager.setPositionMargin('topo', {
    left: -20,  // Margem esquerda negativa em pixels
    right: -20  // Margem direita negativa em pixels
});
```

### 3. Acesso ao Tamanho Real do Banner

Você pode obter o tamanho real de um banner renderizado para uso em lógicas personalizadas:

```javascript
// Obter o tamanho real de um banner
const size = GoogleAdManager.getSlotSize('id-do-seu-slot');
if (size) {
    console.log(`Largura: ${size.width}px, Altura: ${size.height}px`);
}
```

### 4. Aplicação Manual do Tamanho

Se necessário, você pode aplicar manualmente um tamanho específico a um slot:

```javascript
// Aplicar manualmente um tamanho a um slot
GoogleAdManager.applySlotSize('id-do-seu-slot', 970, 250);
```

## Como Usar

### Configuração Básica para Banners Maiores que o Container

```javascript
GoogleAdManager.init({
    networkCode: '1234567',
    adUnitPath: '/rede/site',
    centering: true,
    applyNegativeMargin: true,
    marginConfig: {
        // Configuração de margens negativas por posição
        'topo': { left: -20, right: -20 },
        'meio': { left: -15, right: -15 }
    }
});
```

### Ajuste Manual de Margens Após Inicialização

```javascript
// Após ver como o banner está sendo exibido, você pode ajustar as margens
GoogleAdManager.setPositionMargin('topo', { left: -25, right: -25 });
```

### Exemplo de Uso com Listener Personalizado

```javascript
// Adicionar um listener para quando um banner específico for renderizado
GoogleAdManager.addSlotRenderEndedListener('id-do-seu-slot', function(event) {
    if (!event.isEmpty && Array.isArray(event.size)) {
        const [width, height] = event.size;
        console.log(`Banner renderizado: ${width}x${height}`);
        
        // Lógica personalizada baseada no tamanho do banner
        if (width > 728) {
            // Ajustar margens para banners muito grandes
            GoogleAdManager.setPositionMargin('topo', { left: -30, right: -30 });
        }
    }
});
```

## Dicas para Ajuste Visual Perfeito

1. **Inspecione o Container**: Use as ferramentas de desenvolvedor do navegador para verificar a largura do container pai.
2. **Calcule a Diferença**: Subtraia a largura do container da largura do banner e divida por 2 para obter a margem negativa ideal.
3. **Ajuste Gradualmente**: Comece com valores pequenos e aumente gradualmente até obter o alinhamento perfeito.
4. **Teste em Diferentes Resoluções**: Certifique-se de que o ajuste funciona bem em diferentes tamanhos de tela.

## Exemplo Prático

Para um banner de 970px em um container de 800px:

1. A diferença é de 170px (970 - 800)
2. A margem negativa ideal seria de -85px em cada lado (170 ÷ 2)
3. Configure as margens:

```javascript
GoogleAdManager.setPositionMargin('topo', { left: -85, right: -85 });
```

## Compatibilidade

Esta funcionalidade é compatível com todos os navegadores modernos e funciona em conjunto com as demais funcionalidades do script, como centralização e responsividade.

_____

# Documentação: Google AdManager com Refresh Automático e Targets Dinâmicos

## Visão Geral

Esta atualização do script Google AdManager adiciona três funcionalidades principais:

1. **Refresh automático por tempo configurável**
2. **Targets dinâmicos para segmentação avançada**
3. **Suporte a PPID via visitorEmailHash**

## Novas Funcionalidades

### 1. Refresh Automático

O script agora suporta refresh automático dos anúncios em intervalos configuráveis:

```javascript
GoogleAdManager.init({
    // Configurações básicas
    networkCode: '23050256432',
    adUnitPath: '/brasilbuzz',
    
    // Configuração de refresh (em segundos)
    refresh: 30, // 30 segundos (0 para desabilitar)
});
```

**Como funciona:**
- O valor do parâmetro `refresh` define o intervalo em segundos
- O valor `0` desabilita o refresh automático
- Após cada refresh, o temporizador é reiniciado automaticamente

**Mecanismos de fallback:**
- O script monitora a visibilidade da página para otimizar o refresh
- Quando a página volta a ficar visível, verifica se é hora de atualizar os anúncios
- Isso garante que os anúncios sejam atualizados mesmo se a página ficar em segundo plano

**Recomendações:**
- Comece com valores mais altos (60-120 segundos) para não prejudicar a experiência do usuário
- Monitore o impacto na receita e ajuste conforme necessário
- Considere diferentes intervalos para diferentes tipos de páginas

### 2. Targets Dinâmicos

O script agora suporta os seguintes targets dinâmicos:

```javascript
GoogleAdManager.init({
    // Configurações básicas
    networkCode: '23050256432',
    adUnitPath: '/brasilbuzz',
    
    // Targets dinâmicos
    pageAttributes: 'valor1,valor2',
    pagePostAuthor: 'nome_do_autor',
    pagePostTermsCat: ['categoria1', 'categoria2'],
    pagePostTermsTag: ['tag1', 'tag2', 'tag3'],
    pagePostType: 'artigo',
    pagePostType2: 'premium',
    postID: 12345
});
```

**Como funciona:**
- Todos os targets são configurados globalmente e aplicados a todos os slots
- Os valores podem ser strings ou arrays
- Valores nulos ou indefinidos são ignorados

**Integração com Google Tag Manager:**
- Use variáveis do GTM para preencher dinamicamente os valores
- Exemplo: `pagePostAuthor: {{Author}}`

### 3. PPID via visitorEmailHash

O script agora configura o visitorEmailHash como Publisher Provided ID (PPID):

```javascript
GoogleAdManager.init({
    // Configurações básicas
    networkCode: '23050256432',
    adUnitPath: '/brasilbuzz',
    
    // Hash do email do visitante para PPID
    visitorEmailHash: 'a1b2c3d4e5f6g7h8i9j0'
});
```

**Como funciona:**
- O valor de visitorEmailHash é configurado como PPID via `googletag.pubads().setPublisherProvidedId()`
- Não é adicionado como target público, preservando a privacidade
- Permite personalização de anúncios sem expor dados sensíveis

## Exemplo Completo de Implementação

```html
<script src="https://t.ad.tec.br/google-admanager.js"></script>
<script>
    GoogleAdManager.init({
        networkCode: '23050256432',
        adUnitPath: '/brasilbuzz',
        collapseEmptyDivs: true,
        centering: true,
        pageAttributes: {{PageAttributes}},
        pagePostAuthor: {{Author}},
        pagePostTermsCat: {{Categories}},
        pagePostTermsTag: {{Tags}},
        pagePostType: {{PostType}},
        pagePostType2: {{PostType2}},
        postID: {{PostID}},
        visitorEmailHash: {{UserEmailHash}},
        refresh: 30,
        enableSingleRequest: false,
        applyNegativeMargin: false
    });
</script>
```

## API Adicional

### Atualização de Configuração

Você pode atualizar a configuração após a inicialização:

```javascript
// Atualizar o PPID após login do usuário
GoogleAdManager.updateConfig({
    visitorEmailHash: 'novo_hash_do_email'
});

// Alterar o intervalo de refresh
GoogleAdManager.updateConfig({
    refresh: 60 // Novo intervalo de 60 segundos
});
```

### Refresh Manual

Você pode acionar o refresh manualmente:

```javascript
// Atualizar todos os anúncios manualmente
GoogleAdManager.refresh();
```

## Alternativas para Refresh Automático

Se o refresh automático baseado em tempo não for adequado para seu caso, considere estas alternativas:

1. **Refresh baseado em eventos:**
   ```javascript
   // Atualizar anúncios quando o usuário rolar até o final da página
   window.addEventListener('scroll', function() {
     if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
       GoogleAdManager.refresh();
     }
   });
   ```

2. **Refresh baseado em interação:**
   ```javascript
   // Atualizar anúncios após um certo número de cliques
   let clickCount = 0;
   document.addEventListener('click', function() {
     clickCount++;
     if (clickCount % 5 === 0) { // A cada 5 cliques
       GoogleAdManager.refresh();
     }
   });
   ```

3. **Refresh baseado em visibilidade:**
   ```javascript
   // Atualizar anúncios quando a página voltar a ficar visível
   document.addEventListener('visibilitychange', function() {
     if (document.visibilityState === 'visible') {
       GoogleAdManager.refresh();
     }
   });
   ```

## Dicas de Implementação

1. **Teste os targets**: Verifique no console do navegador se os targets estão sendo corretamente aplicados.
2. **Monitore o refresh**: Observe o comportamento do refresh automático e ajuste o intervalo conforme necessário.
3. **Valide o PPID**: Confirme que o PPID está sendo configurado corretamente através das ferramentas de desenvolvedor.
4. **Integração com GTM**: Certifique-se de que todas as variáveis do GTM estão corretamente configuradas.

## Solução de Problemas

### Refresh não está funcionando

- Verifique se o valor de `refresh` é maior que 0
- Confirme que não há erros no console
- Verifique se o script está sendo carregado corretamente

### Targets não estão sendo aplicados

- Verifique se as variáveis do GTM estão retornando os valores esperados
- Confirme que os valores não são `null` ou `undefined`
- Verifique a formatação dos valores (strings vs arrays)

### PPID não está sendo configurado

- Verifique se o valor de `visitorEmailHash` não é nulo
- Confirme que o script está sendo inicializado após o valor estar disponível
- Use `updateConfig` se o valor só estiver disponível após a inicialização
