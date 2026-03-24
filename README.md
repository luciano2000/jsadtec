# Google AdManager Simplificado

> Um wrapper JavaScript de alto desempenho para o Google Publisher Tag (GPT) focado em Publishers, implementando nativamente Lazy Load, Refresh Inteligente, Targeting Automático Avançado (Navegg/UTM) e mitigação de Core Web Vitals (CLS).

## 🚀 Quick Start

### 1. Tag no `<head>`

Coloque a biblioteca no cabeçalho ou submeta via Google Tag Manager.

```html
<script src="caminho/para/google-admanager.min.js"></script>
```

### 2. Inicialize o Script

Antes do fechamento do `</body>` (ou por um macro no GTM):

```html
<script>
    GoogleAdManager.init({
        networkCode: '1234567',
        adUnitPath: '/rede/site',
        enableLazyLoad: true,
        refresh: 30, // segundos
        refreshOnlyVisible: true
    });
</script>
```

### 3. Delimite os Espaços de Anúncios no HTML

Em qualquer lugar da página, para engatilhar um banner, coloque uma `div` com a classe `pubad` e sua respectiva posição em `data-pos`:

```html
<div class="pubad" data-pos="topo"></div>
<div class="pubad" data-pos="meio"></div>
<div class="pubad" data-pos="rodape"></div>
```

---

## ✨ Features

- **Alta Performance:** Observers otimizados com _debounce_ e Lazy Load nativo garantem impacto quase nulo na renderização da Thread Principal (100% Core Web Vitals friendly).
- **Refresh Inteligente:** Banners são recarregados por tempo especificado **apenas** quando estão sendo vistos na tela (`refreshOnlyVisible`).
- **Targeting Dinâmico & UTM:** Captura e acopla automaticamente qualquer parâmetro UTM (`utm_source`, `utm_campaign`, etc.) direto no targeting do banner. Variáveis customizadas como autor e categoria de CMS também são passadas de forma direta.
- **Integração NAVEGG nativa:** Injeta dados de persona guardados no localStorage como targetings `nvg_*`, elevando o CPM.
- **Design Líquido & Otimização:** Auto-centralização inteligente de banners e uso de margens negativas configuradas para Banners Over-Size.
- **Posicionamento Sequencial:** Múltiplas divs chamadas `meio` são nativamente auto-iteradas pelo script localmente (ex: `meio_1`, `meio_2`, para métricas granulares por profundidade).

---

## ⚙️ Configuration

No método `GoogleAdManager.init(config)`, as seguintes opções estão disponíveis:

| Propriedade | Tipo | Padrão | Descrição |
|-------------|------|--------|-----------|
| `networkCode` | string | `'1234567'` | **(Obrigatório)** Código da Rede do GA. |
| `adUnitPath` | string | `'/rede/site'`| **(Obrigatório)** Caminho raiz do ad unit. |
| `enableLazyLoad`| boolean | `true` | Habilita Lazy Load nativo de slots do GPT. |
| `refresh` | number | `0` | Tempo (segundos) de refresh de banners (0 desativa). |
| `refreshOnlyVisible`| boolean| `true` | Refresh não ocorre em banners escondidos/scrollados. |
| `enableSingleRequest`|boolean| `false` | Se ligado, descarrega SRA. Padrão falso permite Async fluído. |
| `captureUtmParams` | boolean| `true` | Injeta URL `utm_*` como targeting dos ads da view. |
| `nvgAnalytics` | string | `null` | String da chave do Navegg no localStorage para parse de audience. |
| `visitorEmailHash`| string | `null` | PPID hash criptografado para audiência Google direta. |
| `centering` | boolean | `false` | Centraliza banner independente do tamanho original recebido. |
| `applyNegativeMargin`|boolean | `false` | Permite margin out-of-bounds (marginConfig parameter). |

_As categorias Custom (targeting de CMS)_:
Podem ser mapeadas direto via chaves reservadas como `pagePostAuthor`, `pagePostTermsCat` (array/string), `pageAttributes`, `postID`.

---

## 📚 API Reference

O objeto `GoogleAdManager` expõe globalmente funções poderosas para SPA ou scripts extras:

### `GoogleAdManager.init(config)`
Processa os parâmetros e insere as bibliotecas base. Monitora proativamente (via MutationObserver debounced) a página para qualquer `div.pubad` recém-chegada via JS.

### `GoogleAdManager.updateConfig(config)`
Permite injetar um novo UserHash PPI (ex: após usuário realizar login num SPA) ou renovar dados sem recarregar a tela.

### `GoogleAdManager.refresh(onlyVisible = true)`
Aciona o Refresh em massa manualmente (Ex: Botão "Ler Mais" de feed infinito ou troca de abas dinâmicas).

### `GoogleAdManager.addPosition(position, mapping)`
Atrela regras responsivas personalizadas via Javascript dinâmico antes de plotar a visualização.
```javascript
GoogleAdManager.addPosition('lateral', [
    { viewport: [0, 0], sizes: [] },
    { viewport: [1000, 0], sizes: [{ width: 300, height: 250 }, { width: 300, height: 600 }] }
]);
```

### `GoogleAdManager.setPositionMargin(position, marginConfig)`
Define regras de reflow visual pós-render para templates com tamanhos rígidos de layout:
```javascript
GoogleAdManager.setPositionMargin('topo', { left: -20, right: -20 });
```

---

## 📜 License

MIT License
