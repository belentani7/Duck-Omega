# Referências da camada visual mutável

## Objetivo

A nova camada visual do Duck Hub combina objetos de estudo originais gerados para o universo Duck com efeitos procedurais leves no navegador. O objetivo é tornar a interface mutável sem transformá-la em uma landing page decorativa ou em uma experiência que prejudique o uso operacional.

## Fontes consultadas

| Fonte | Uso | Decisão |
|---|---|---|
| [Pexels — Music Studio](https://www.pexels.com/search/music%20studio/) | Referência de objetos e enquadramentos de estúdio; a página apresenta fotos de mixers, sintetizadores, cabos, headphones e microfones. | Usar apenas como referência visual ou, se uma imagem específica for baixada em etapa posterior, registrar URL/autoria e licença da peça. A primeira versão usará imagens originais geradas, evitando dependência de stock. |
| [Unsplash — Music Studio](https://unsplash.com/s/photos/music-studio) | Referência complementar de fotografia editorial de estúdio. | Não incorporar automaticamente; serve como moodboard, pois a página pública não expôs um inventário estável durante a consulta. |
| [MDN — Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) | Base técnica para efeitos reativos, com grafos modulares de áudio, nós de filtro, compressor, delay, reverb e análise de frequência. | Implementar inicialmente uma camada visual procedural independente do áudio real, com possibilidade de conectar `AnalyserNode` a previews autorizados no futuro. Não criar áudio ou alterar pagamentos. |
| [Codrops — 3D Audio Visualizer](https://tympanus.net/codrops/2025/06/18/coding-a-3d-audio-visualizer-three-js-gsap-web-audio-api/) | Inspiração para combinar GSAP, visualização e interação. | Adaptar somente princípios de movimento e composição; evitar dependência de Three.js pesado no primeiro corte mobile. |

## Inventário original proposto

Os objetos são tratados como artefatos do protocolo Duck: **a Gema 01** é um sintetizador compacto com luz esmeralda; **o Scanner Belentani** é um medidor de espectro circular; **o Cartucho de Stems** representa arquivos protegidos; **o Fader de Entrega** representa prazos, revisões e estados; e **o Selo de Recife** funciona como textura de identidade territorial sem incluir dados pessoais.

## Direção de uso

Os assets serão usados como imagens de fundo, thumbnails e objetos de foco em cards, sempre com `loading="lazy"` quando estiverem fora da primeira dobra, `alt` localizado e fallback visual em gradiente. A mutação visual será limitada a brilho, ruído, deslocamento, rotação lenta e variações de intensidade. O modo `prefers-reduced-motion: reduce` desativará deslocamentos e manterá somente estados estáticos.

## Guardrails

Não serão inventadas avaliações, depoimentos, dados de clientes ou métricas comerciais dentro das imagens. Não serão usados rostos identificáveis como elemento principal. Os prompts devem pedir composição sem texto legível para impedir erros tipográficos; os rótulos operacionais continuarão sendo HTML localizado e acessível.
