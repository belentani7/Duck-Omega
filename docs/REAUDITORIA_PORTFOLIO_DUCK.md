# Reauditoria do portfólio Duck

**Fonte analisada:** `Portfólio-Duck(8_15_202612：04：21PM).html`  
**URL declarada no arquivo:** `https://duck.46graus.com/portfolio/`  
**Data declarada no snapshot:** 15 de agosto de 2026, 12:04:21 GMT+0200.  
**Método:** extração passiva de título, headings, links e metadados; nenhum script ou asset incorporado foi executado.

## Evidência de posicionamento

O portfólio se apresenta como um catálogo de produção musical organizado por gêneros. As categorias visíveis são **POP / POP BR**, **TRAP / HIPHOP** e **MPB**, com títulos de faixas e projetos como `Posturadona`, `Tititi`, `De Fininho`, `Ouro Rosê`, `Money Way`, `Progresso`, `Yakuza`, `Ep - Veneno` e `Ep - Hancornia`. Isso sugere que o Duck Hub deve tratar o catálogo real como uma camada de prova profissional, não apenas como uma vitrine genérica de beats.

O snapshot contém links para a página principal, portfólio, sobre, contato, Instagram, canal do YouTube e vários links públicos de YouTube e Spotify. Esses links são **referências públicas**; não devem ser transformados automaticamente em ativos proprietários, metadados definitivos ou créditos contratuais sem confirmação do Duck e dos titulares.

## Comparação com o Duck Hub atual

| Tema | Evidência do portfólio | Estado do Hub | Próxima decisão segura |
|---|---|---|---|
| Identidade | Duck aparece como produtor ligado a um catálogo musical amplo | Hub usa identidade Duck/Omega e estética de protocolo | Manter identidade, mas separar branding narrativo de prova de catálogo |
| Oferta | Portfólio mostra trabalhos e gêneros, não preços públicos | Hub possui catálogo de beats e checkout de teste | Mapear faixas comprovadas para catálogo somente após confirmação de titularidade/licença |
| Aquisição | Site, Instagram, YouTube, Spotify e contato | Hub possui missão, catálogo e ferramentas | Usar links públicos como origem de leads, com consentimento e rastreabilidade |
| Entrega | O snapshot não comprova workflow de stems, masters ou contratos | Hub tem storage protegido e URLs assinadas | Conectar cada entrega a pedido, licença, contrato e hash |
| Repertório | Muitos títulos e links externos | Hub ainda não possui um inventário autoral confirmado por faixa | Criar ficha de obra com status `pendente de confirmação` antes de publicar |

## Decisão de idioma

A auditoria do `BaseLayout.astro` confirma que o documento HTML é servido como uma única experiência com `lang="pt-BR"`, `data-duck-locale="pt-BR"` e fallback persistente para `pt-BR`. O seletor permite `PT`, `ES`, `EN` e `FR`; o parâmetro `?lang=` tem prioridade e o valor também é salvo em `localStorage` como `duck-hub-locale`. Portanto, o requisito correto é **português como idioma principal, com troca opcional de idioma**, e não quatro versões independentes do produto.

## Lacunas e cuidados

Não é possível concluir titularidade, autorização de uso, ISRC, participação autoral, exclusividade ou vínculo comercial apenas a partir dos títulos e links do portfólio. O Hub deve preservar os links como referências externas e aguardar confirmação antes de incluir qualquer obra em catálogo vendável, campanha, contrato ou registro de royalties.
