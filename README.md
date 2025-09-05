## Índice
1. [Documentação do Google AdManager Simplificado](#documentação-do-google-adManager-simplificado)
2. [Documentação da Centralização de Anúncios no Google AdManager](#documentação-da-centralizacao-de-anúncios-no-google-admanager)
---
## Documentação do Google AdManager Simplificado

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
## Documentação da Centralização de Anúncios no Google AdManager

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

---
# Documentação: Enumeração Sequencial de Posições no Google AdManager

## Visão Geral

Esta atualização do script Google AdManager adiciona uma nova funcionalidade importante: **enumeração sequencial de posições**. Agora, quando você tem múltiplas divs com a mesma posição (por exemplo, vários banners "meio"), o script automaticamente enumera cada uma delas (meio_1, meio_2, etc.) e adiciona essa informação como targeting específico para cada slot.

## Como Funciona

Quando o script detecta múltiplas divs com o mesmo valor de `data-pos`, ele:

1. Conta quantas divs existem para cada posição
2. Atribui um índice sequencial a cada div (começando em 1)
3. Cria um targeting específico `pos_index` com o valor `posição_número` (ex: meio_1, meio_2)
4. Mantém o targeting original `pos` com o valor base (ex: meio)

### Exemplo:

```html
<!-- Primeira div com data-pos="meio" -->
<div class="pubad" data-pos="meio"></div>

<!-- Segunda div com data-pos="meio" -->
<div class="pubad" data-pos="meio"></div>

<!-- Terceira div com data-pos="meio" -->
<div class="pubad" data-pos="meio"></div>
```

Após o processamento pelo script, estas divs receberão os seguintes targetings:

1. Primeira div:
   - `pos: "meio"`
   - `pos_index: "meio_1"`

2. Segunda div:
   - `pos: "meio"`
   - `pos_index: "meio_2"`

3. Terceira div:
   - `pos: "meio"`
   - `pos_index: "meio_3"`

## Benefícios

Esta funcionalidade permite:

1. **Segmentação granular**: Direcionar anúncios específicos para posições exatas na página
2. **Relatórios detalhados**: Analisar o desempenho de cada posição individualmente
3. **Preços diferenciados**: Definir valores diferentes para a primeira, segunda ou terceira ocorrência de uma posição
4. **Testes A/B**: Comparar o desempenho entre diferentes ocorrências da mesma posição

## Implementação no Google Ad Manager

No console do Google Ad Manager, você pode agora criar segmentações baseadas no targeting `pos_index`:

1. Crie uma linha de pedido direcionada para posições específicas
2. Adicione um targeting de chave-valor com:
   - Chave: `pos_index`
   - Valor: `meio_1` (para a primeira ocorrência de "meio")

Você também pode criar segmentações para grupos de posições:

- `meio_1,meio_2` (primeira e segunda ocorrência)
- `topo_1` (apenas o primeiro banner de topo)
- `inread_[1-3]` (as três primeiras ocorrências de inread)

## Verificação e Depuração

O script inclui um novo método para verificar as posições enumeradas:

```javascript
// Obter informações sobre as posições enumeradas
const positionInfo = GoogleAdManager.getPositionInfo();
console.log(positionInfo);
```

Isso retornará um objeto com:
- `counters`: Quantas divs existem para cada posição
- `slots`: Lista de todos os slots com suas posições base e enumeradas

## Exemplo de Uso Avançado

```javascript
// Inicialização padrão
GoogleAdManager.init({
    networkCode: '23050256432',
    adUnitPath: '/brasilbuzz',
    // outras configurações...
});

// Verificar as posições enumeradas após a inicialização
console.log(GoogleAdManager.getPositionInfo());

// Adicionar um listener para um slot específico
GoogleAdManager.addSlotRenderEndedListener('ad-slot-0', function(event) {
    // Verificar qual posição enumerada foi renderizada
    const element = document.getElementById('ad-slot-0');
    console.log('Posição enumerada:', element.dataset.posIndex);
});
```

## Compatibilidade

Esta funcionalidade é totalmente compatível com todas as outras características do script:
- Refresh automático
- Targets dinâmicos
- PPID
- Centralização e margens negativas

Não é necessária nenhuma configuração adicional para ativar esta funcionalidade - ela funciona automaticamente para todas as divs com classe `pubad`.

---
# Documentação: Google AdManager com LazyLoad, Refresh em Banners Visíveis e Requisições Individuais

## Visão Geral

Esta atualização do script Google AdManager (versão 3.0.0) implementa três melhorias importantes solicitadas:

1. **LazyLoad para anúncios** - Carregamento dos anúncios apenas quando estiverem próximos da área visível
2. **Desativação do Single Request** - Mudança para requisições individuais de anúncios
3. **Refresh apenas em banners visíveis** - Implementação da verificação de visibilidade antes do refresh

Estas melhorias trazem benefícios significativos de performance e experiência do usuário para seu site.

## Novas Configurações

```javascript
GoogleAdManager.init({
    networkCode: '23050256432',
    adUnitPath: '/brasilbuzz',
    
    // Configurações de LazyLoad
    enableLazyLoad: true,                // Ativa o LazyLoad (padrão: true)
    fetchMarginPercent: 100,             // Distância para buscar anúncios (100% = 1 viewport)
    renderMarginPercent: 50,             // Distância para renderizar (50% = metade da viewport)
    mobileScaling: 2.0,                  // Escala para dispositivos móveis
    
    // Configuração de Single Request
    enableSingleRequest: false,          // Desativa requisições únicas (padrão: false)
    
    // Configuração de Refresh
    refresh: 30,                         // Tempo em segundos para refresh (0 = desabilitado)
    refreshOnlyVisible: true,            // Atualiza apenas anúncios visíveis (padrão: true)
    
    // Outras configurações existentes
    collapseEmptyDivs: true,
    centering: true,
    // ...
});
```

## 1. LazyLoad para Anúncios

### Como Funciona

O LazyLoad carrega os anúncios apenas quando eles estão próximos de entrar na área visível da tela, em vez de carregar todos os anúncios de uma vez durante o carregamento inicial da página.

O script implementa o LazyLoad de duas maneiras:

1. **LazyLoad Nativo do GPT**: Utiliza a funcionalidade nativa do Google Publisher Tag
2. **LazyLoad com Intersection Observer**: Implementação personalizada usando Intersection Observer para maior controle

### Benefícios

- **Melhora o tempo de carregamento da página**: Reduz a quantidade de recursos carregados inicialmente
- **Economiza largura de banda**: Carrega apenas os anúncios que o usuário provavelmente verá
- **Melhora a viewability**: Anúncios são carregados quando o usuário está prestes a vê-los
- **Reduz o consumo de CPU e memória**: Menos anúncios carregados simultaneamente

### Configuração Avançada

```javascript
GoogleAdManager.init({
    // ...
    enableLazyLoad: true,
    fetchMarginPercent: 200,    // Carrega anúncios quando estiverem a 2 viewports de distância
    renderMarginPercent: 100,   // Renderiza quando estiver a 1 viewport de distância
    mobileScaling: 1.5          // Escala menor para dispositivos móveis
});
```

## 2. Desativação do Single Request Architecture (SRA)

### Como Funciona

Por padrão, o script agora desativa a Single Request Architecture (SRA), fazendo com que cada anúncio seja solicitado individualmente em vez de agrupar todos em uma única requisição.

### Benefícios

- **Carregamento mais granular**: Cada anúncio é carregado independentemente
- **Melhor controle sobre prioridades**: Anúncios importantes podem ser carregados primeiro
- **Compatibilidade com LazyLoad**: Funciona melhor com o carregamento preguiçoso de anúncios

### Quando Usar SRA

Em alguns casos específicos, você pode querer reativar o SRA:

```javascript
GoogleAdManager.init({
    // ...
    enableSingleRequest: true,  // Reativa o SRA se necessário
});
```

Recomendado apenas quando:
- Você precisa garantir exclusões competitivas entre anúncios
- Você está usando roadblocks configurados no Ad Manager
- Você tem poucos anúncios na página (todos acima da dobra)

## 3. Refresh Apenas em Banners Visíveis

### Como Funciona

O script agora verifica a visibilidade dos anúncios antes de atualizá-los, garantindo que apenas os anúncios visíveis na tela sejam atualizados durante um refresh.

### Benefícios

- **Economia de recursos**: Não atualiza anúncios que o usuário não está vendo
- **Melhores métricas de viewability**: Anúncios são atualizados quando estão visíveis
- **Melhor experiência do usuário**: Reduz o consumo de dados e processamento

### Configuração

```javascript
GoogleAdManager.init({
    // ...
    refresh: 30,                // Atualiza a cada 30 segundos
    refreshOnlyVisible: true,   // Apenas anúncios visíveis
});
```

### Refresh Manual

Você também pode atualizar manualmente os anúncios:

```javascript
// Atualiza apenas anúncios visíveis
GoogleAdManager.refresh();

// Atualiza todos os anúncios, mesmo os não visíveis
GoogleAdManager.refresh(false);

// Atualiza um anúncio específico
GoogleAdManager.loadAd('ad-slot-0');
```

## Verificação de Visibilidade

O script inclui métodos para verificar a visibilidade dos anúncios:

```javascript
// Verifica se um slot específico está visível
const isVisible = GoogleAdManager.isSlotVisible('ad-slot-0');
console.log('O anúncio está visível?', isVisible);

// Obtém informações sobre todos os slots
const info = GoogleAdManager.getPositionInfo();
console.log('Slots visíveis:', info.slots.filter(slot => slot.isVisible));
```

## Compatibilidade com Navegadores

- **Navegadores modernos**: Todas as funcionalidades são suportadas (Chrome, Firefox, Safari, Edge)
- **Navegadores antigos**: Fallback automático para carregamento padrão se Intersection Observer não for suportado

## Exemplos de Uso

### Configuração Básica

```html
<script src="https://t.ad.tec.br/google-admanager.js"></script>
<script>
    GoogleAdManager.init({
        networkCode: '23050256432',
        adUnitPath: '/brasilbuzz',
        collapseEmptyDivs: true,
        centering: true,
        enableLazyLoad: true,
        enableSingleRequest: false,
        refresh: 30,
        refreshOnlyVisible: true
    });
</script>

<!-- Anúncios serão carregados apenas quando próximos da área visível -->
<div class="pubad" data-pos="topo"></div>
<div class="pubad" data-pos="meio"></div>
<div class="pubad" data-pos="rodape"></div>
```

### Configuração Avançada

```html
<script src="https://t.ad.tec.br/google-admanager.js"></script>
<script>
    GoogleAdManager.init({
        networkCode: '23050256432',
        adUnitPath: '/brasilbuzz',
        collapseEmptyDivs: true,
        centering: true,
        
        // LazyLoad personalizado
        enableLazyLoad: true,
        fetchMarginPercent: 150,
        renderMarginPercent: 75,
        mobileScaling: 1.8,
        
        // Desativa SRA
        enableSingleRequest: false,
        
        // Refresh personalizado
        refresh: 45,
        refreshOnlyVisible: true,
        
        // Targeting
        pageAttributes: 'valor1,valor2',
        pagePostAuthor: 'nome_autor',
        pagePostTermsCat: ['categoria1', 'categoria2'],
        pagePostTermsTag: ['tag1', 'tag2'],
        pagePostType: 'artigo',
        pagePostType2: 'premium',
        postID: 12345,
        visitorEmailHash: 'hash_do_email'
    });
    
    // Monitora eventos de visibilidade
    GoogleAdManager.addSlotRenderEndedListener('ad-slot-0', function(event) {
        console.log('Anúncio renderizado:', event);
    });
</script>
```

## Depuração

Para depurar o funcionamento do LazyLoad e do refresh por visibilidade:

```javascript
// Verifica quais slots estão configurados e seu estado
console.log(GoogleAdManager.getPositionInfo());

// Força o carregamento de um anúncio específico
GoogleAdManager.loadAd('ad-slot-0');

// Força um refresh em todos os anúncios
GoogleAdManager.refresh(false);
```

## Considerações de Performance

- **LazyLoad**: Melhora significativamente o tempo de carregamento inicial da página
- **Requisições individuais**: Pode aumentar ligeiramente o número de requisições HTTP, mas melhora a granularidade
- **Refresh por visibilidade**: Reduz o consumo de recursos e melhora as métricas de viewability

## Recomendações

1. **Mantenha o LazyLoad ativado** para melhor performance, especialmente em páginas com muitos anúncios
2. **Ajuste fetchMarginPercent e renderMarginPercent** conforme necessário para sua página
3. **Mantenha o Single Request desativado** a menos que você precise especificamente de exclusões competitivas
4. **Use refresh apenas em banners visíveis** para melhorar a experiência do usuário e as métricas de viewability

---
# Documentação: Captura Automática de Parâmetros UTM no Google AdManager

## Visão Geral

Esta atualização do script Google AdManager (versão 3.1.0) implementa uma nova funcionalidade importante: **captura automática de parâmetros UTM da URL**. Agora, o script detecta automaticamente os parâmetros UTM presentes na URL da página e os adiciona como targets para seus anúncios, sem necessidade de configuração manual via TagManager.

## Parâmetros UTM Suportados

O script captura automaticamente os seguintes parâmetros UTM:

- `utm_campaign` - Identifica a campanha de marketing específica
- `utm_content` - Diferencia anúncios ou links que apontam para o mesmo URL
- `utm_id` - Identificador único da campanha
- `utm_medium` - Identifica o meio de marketing (email, CPC, etc.)
- `utm_source` - Identifica a origem do tráfego (Google, Facebook, etc.)
- `utm_term` - Identifica palavras-chave pagas

## Como Funciona

1. Quando o script é inicializado, ele automaticamente analisa a URL atual da página
2. Extrai todos os parâmetros UTM presentes
3. Adiciona esses parâmetros como targets globais para todos os anúncios
4. Também aplica os parâmetros UTM como targets individuais para cada slot de anúncio

Isso permite segmentação precisa de anúncios com base nos parâmetros de campanha que trouxeram o usuário para a página.

## Configuração

A captura de parâmetros UTM está **ativada por padrão**, mas pode ser desativada se necessário:

```javascript
GoogleAdManager.init({
    networkCode: '23050256432',
    adUnitPath: '/brasilbuzz',
    
    // Configuração de UTM
    captureUtmParams: true,  // true = ativado (padrão), false = desativado
    
    // Outras configurações...
    collapseEmptyDivs: true,
    centering: true,
    enableLazyLoad: true,
    enableSingleRequest: false,
    refresh: 30,
    refreshOnlyVisible: true
});
```

## Exemplo de Uso

### Cenário 1: URL com Parâmetros UTM

Quando um usuário acessa sua página através de uma URL como:
```
https://seusite.com/pagina?utm_source=facebook&utm_medium=social&utm_campaign=verao2025
```

O script automaticamente:
1. Captura os parâmetros UTM (`utm_source=facebook`, `utm_medium=social`, `utm_campaign=verao2025`)
2. Adiciona-os como targets para todos os anúncios na página

### Cenário 2: Verificação dos Parâmetros UTM Capturados

Você pode verificar quais parâmetros UTM foram capturados usando:

```javascript
// Verificar os parâmetros UTM capturados
const utmParams = GoogleAdManager.getUtmParams();
console.log('Parâmetros UTM:', utmParams);
```

## Benefícios

- **Sem configuração manual**: Não é necessário configurar variáveis no Google Tag Manager
- **Segmentação automática**: Todos os anúncios são automaticamente segmentados com base nos parâmetros UTM
- **Análise de campanhas**: Facilita a análise de desempenho de diferentes campanhas de marketing
- **Personalização de anúncios**: Permite exibir anúncios específicos com base na origem do tráfego

## Compatibilidade com Outras Funcionalidades

Esta nova funcionalidade é totalmente compatível com todas as características existentes do script:

- LazyLoad para anúncios
- Refresh apenas em banners visíveis
- Requisições individuais (Single Request desativado)
- Centralização e margens negativas
- Enumeração sequencial de posições

## Exemplo de Implementação Completa

```html
<script src="https://t.ad.tec.br/google-admanager.js"></script>
<script>
    GoogleAdManager.init({
        networkCode: '23050256432',
        adUnitPath: '/brasilbuzz',
        collapseEmptyDivs: true,
        centering: true,
        
        // LazyLoad
        enableLazyLoad: true,
        
        // Single Request desativado
        enableSingleRequest: false,
        
        // Refresh apenas em banners visíveis
        refresh: 30,
        refreshOnlyVisible: true,
        
        // Captura automática de UTMs
        captureUtmParams: true,
        
        // Outros parâmetros (opcionais)
        pageAttributes: 'valor1,valor2',
        pagePostAuthor: 'nome_autor',
        // ...
    });
    
    // Verificar os parâmetros UTM capturados (opcional)
    console.log('UTMs capturados:', GoogleAdManager.getUtmParams());
</script>

<!-- Anúncios serão carregados com os parâmetros UTM como targets -->
<div class="pubad" data-pos="topo"></div>
<div class="pubad" data-pos="meio"></div>
<div class="pubad" data-pos="rodape"></div>
```

## Considerações Técnicas

- Os parâmetros UTM são capturados apenas uma vez durante a inicialização do script
- Se a URL mudar após o carregamento da página (navegação SPA), os novos parâmetros UTM não serão capturados automaticamente
- Para sites com navegação SPA (Single Page Application), você pode chamar `GoogleAdManager.updateConfig({ captureUtmParams: true })` após mudanças na URL

## API Adicional

### Obter Parâmetros UTM Capturados

```javascript
// Retorna um objeto com todos os parâmetros UTM capturados
const utmParams = GoogleAdManager.getUtmParams();
```

### Atualizar Configuração de UTM

```javascript
// Desativar captura de UTM
GoogleAdManager.updateConfig({ captureUtmParams: false });

// Reativar captura de UTM (útil após mudanças na URL em SPAs)
GoogleAdManager.updateConfig({ captureUtmParams: true });
```

## Depuração

Para verificar se os parâmetros UTM estão sendo corretamente capturados e aplicados:

1. Acesse sua página com parâmetros UTM na URL
2. Abra o console do navegador
3. Execute `GoogleAdManager.getUtmParams()`
4. Verifique se os parâmetros UTM foram capturados corretamente

## Recomendações

1. **Mantenha a captura de UTM ativada** para melhor segmentação de anúncios
2. **Utilize URLs com parâmetros UTM** em todas as suas campanhas de marketing
3. **Configure regras no Ad Manager** para exibir anúncios específicos com base nos parâmetros UTM
4. **Analise o desempenho** dos anúncios por origem de tráfego usando os parâmetros UTM como filtros

