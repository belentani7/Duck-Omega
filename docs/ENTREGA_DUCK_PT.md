# Duck Hub — Entrega em português brasileiro

## O que temos

O Duck Hub é um software web real para um produtor musical. A experiência começa na missão Duck/Omega, uma entrada narrativa que apresenta o Protocolo Belentani, e continua no Hub operacional. O núcleo utiliza autenticação, banco de dados, procedimentos tRPC, regras de autorização, armazenamento privado, catálogo de beats, checkout de teste, comentários de revisão, atividade e assistente interno.

A identidade visual é escura, com verde esmeralda, tipografia de sistema e estados de operação claros. A interface foi localizada para português brasileiro e possui rotas para a missão, o Hub, a Loja de Beats e a Central de Ferramentas.

## O que Duck pode fazer hoje

No Hub, Duck acompanha clientes, projetos, receita, pedidos e atividade recente. O CRM mantém dados de contato, empresa, notas e health score. Os projetos possuem estados de descoberta, andamento, revisão e entrega, com progresso e prazo. As revisões aceitam comentários com timestamp e o limite é validado no servidor.

O sistema de arquivos possui hash, MIME, versões e URLs assinadas de curta duração. A Loja de Beats apresenta licenças exclusiva e não exclusiva, preço, disponibilidade e preview somente quando o registro confirma watermark. O checkout de teste registra pedidos, mantém estados e aceita transições validadas no servidor. O webhook utiliza corpo bruto e evento idempotente.

A Central de Ferramentas inclui calculadora de orçamento, recursos ativáveis, automações operacionais e checklist de produção. O assistente interno permite consultar o contexto do estúdio e preparar rascunhos, quando o usuário está autenticado.

## O que Duck fará quando receber algo

Quando receber um novo cliente, Duck poderá registrar a ficha no CRM e iniciar um fluxo de acompanhamento. Quando receber uma referência, stem ou render, o fluxo deve registrar hash, MIME, versão, projeto relacionado e permissões antes de gerar uma URL privada.

Quando receber uma solicitação de revisão, o sistema registra o comentário, o timestamp e o impacto no limite de revisões. Quando receber uma compra confirmada pelo webhook, o próximo fluxo é confirmar o pedido, preparar o contrato, liberar uma URL assinada e enviar as notificações configuradas.

Quando receber uma nova instrução do produtor, o Duck Assistant poderá consultar projetos, organizar próximos passos, redigir mensagens e sugerir descrições ou preços. Integrações externas de email, pagamentos reais e geração de PDF dependem da conexão segura dos respectivos provedores.

## Simulação incluída

O vídeo `protocolo-belentani-duck-vertical.mp4` é uma simulação gráfica vertical 9:16. Ele mostra o remetente identificado, Duck como Guardião da Gema nº 1, o Protocolo Belentani ativado, o scanner laser e a autorização do usuário. A simulação é uma camada narrativa de produto; ela não representa um sistema biométrico ou de segurança real.

## Como executar

Use o projeto Duck Hub no diretório original. Para desenvolvimento, instale as dependências com `pnpm install` e execute `pnpm dev`. Antes de produção, configure os segredos dos provedores externos, revise o banco e execute `pnpm check`, `pnpm test` e `pnpm build`.

## Estado técnico honesto

A base funcional está implementada e validada com typecheck, build e testes automatizados. Permanecem como integrações de próxima etapa a geração real de contrato PDF, email transacional, Mercado Pago ou outro provedor de pagamento real, ownership completo em todas as consultas e um teste contra um banco descartável separado. Esses pontos não devem ser tratados como ativos até que suas credenciais e ambiente de teste estejam configurados.
