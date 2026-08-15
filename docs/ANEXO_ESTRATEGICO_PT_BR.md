# Anexo estratégico Duck — Português Brasileiro

## Direção

O Duck deve operar como produtor musical e estúdio digital com quatro fontes de valor: produção, catálogo de beats, relacionamento com clientes e software próprio. A prioridade é vender serviços e licenças com contratos claros antes de transformar o Duck Hub em produto para terceiros.

## Regra de propriedade

Não entregar o núcleo de forma gratuita. Código, marca, dados de clientes, metodologias, templates e catálogo devem permanecer separados dos direitos de uso. Quando houver parceria, preferir licença limitada, prazo, território, finalidade, participação em receita e opção de compra por ativo específico.

## Operação segura

Todo arquivo deve registrar hash, tipo MIME, versão, proprietário e histórico. Toda revisão deve respeitar limite validado no servidor. Todo pagamento deve verificar a assinatura do provedor e a chave de idempotência. Toda ação de alto impacto exige aprovação humana.

## Oferta inicial

A oferta recomendada é: produção por projeto; pacote de lançamento; licença não exclusiva; licença exclusiva com disponibilidade controlada; retainer mensal; e recursos digitais. Cada oferta precisa de preço, escopo, prazo, limite de revisões, forma de pagamento e condição de entrega.

## Automação

Eventos como `project.created`, `file.received`, `revision.comment.created` e `order.paid` devem ser registrados com identificador, entidade, responsável, tentativa e chave de idempotência. O contrato operacional está em `docs/AUTOMATIZACIONES_DUCK_OPERATIVAS.md` e a decisão de arquitetura está em `docs/decisions/ADR-001-automatizacoes-orientadas-a-eventos.md`.

## Brasil e Espanha

Antes de qualquer pagamento internacional, separar serviço, licença de conteúdo, royalty e cessão. Registrar território, moeda, quem fatura, quem recebe, documentos, dados transferidos e revisão fiscal. Não assumir que o convênio entre Brasil e Espanha produz o mesmo resultado para todas as operações.

## Próximo ciclo

Medir vendas cobradas, margem de contribuição, tempo de entrega, concentração do maior cliente, recorrência, revisões extras e caixa. Crescer somente quando a oferta for repetível e os contratos, direitos e dados estiverem documentados.
