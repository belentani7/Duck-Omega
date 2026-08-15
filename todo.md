# Project TODO

- [x] Dashboard principal con clientes activos, proyectos, ingresos y actividad reciente
- [x] Identidad visual oscura con acento verde esmeralda y responsive design
- [x] RBAC con roles Owner, Productor y Cliente
- [x] CRM de clientes con datos de contacto, notas, health score, proyectos y facturas
- [x] Gestión de proyectos con estados Discovery, En progreso, Revisión y Entregado
- [x] Entregables, fechas y barra de progreso por proyecto
- [x] Sistema de revisiones con comentarios asociados a timestamp
- [x] Validación server-side del límite de revisiones
- [x] Gestión segura de archivos con hash, MIME, versiones y metadatos
- [x] URLs firmadas de corta expiración para descargas privadas
- [x] Catálogo público de beats con previews con watermark
- [x] Licencias exclusiva y no exclusiva con precio y disponibilidad
- [x] Checkout en modo prueba con máquina de estados de pedidos
- [x] Webhook de pago idempotente con verificación de firma
- [ ] Generación automática de contrato PDF tras pago confirmado
- [ ] Envío automático de contrato, descarga y resumen por email
- [ ] Notificación al productor por cada compra confirmada
- [ ] Preparación de integración Mercado Pago y/o proveedor de pago configurable
- [x] Registro de actividad y auditoría de acciones críticas
- [ ] Automatizaciones por eventos para pagos, archivos, revisiones y entregas
- [x] Chat interno con LLM para consultas, borradores y sugerencias
- [x] Pruebas Vitest para reglas de dominio y endpoints críticos
- [x] Validación visual desktop y mobile del dashboard y flujos principales
- [x] Verificación de build, typecheck y logs del servidor

- [ ] Reemplazar el dashboard por una única experiencia HTML inmersiva
- [x] Escribir toda la narrativa y la interfaz en portugués brasileño
- [x] Presentar el ecosistema como una misión secreta Duck/Bellentani
- [ ] Incluir explicación narrativa de Studio OS, Portal, Gema, catálogo y flujo de entrega
- [x] Añadir navegación por fases, progreso, terminal y desbloqueo final
- [ ] Eliminar dependencia narrativa de html-video-production, game-dev y music-prompter

- [x] Mantener la misión secreta como entrada de un software real y navegable
- [x] Conectar os desbloqueios narrativos a estados persistidos e ações reais do sistema
- [x] Mantener backend, base de datos, autenticación y pruebas aunque la interfaz sea inmersiva
- [x] Evitar entregar una landing estática o una demo sin lógica operativa

- [x] Traduzir toda a interface existente para português brasileiro
- [x] Adaptar textos, estados, nomes e fluxos especificamente ao Duck como produtor musical
- [ ] Incorporar o material do chat na experiência e no núcleo operacional
- [x] Adicionar ferramentas de produção, organização, clientes, projetos, catálogo, contratos e entregas
- [x] Adicionar automações de notificações, revisões, pagamentos, arquivos e acompanhamento de projetos
- [x] Criar uma central de recursos para templates, presets, stems, referências e documentação
- [x] Revisar a missão imersiva para explicar o ecossistema Duck em português

- [ ] Implementar RBAC real para Owner, Produtor e Cliente por procedimento e recurso
- [ ] Completar CRM com notas, histórico de projetos e histórico de faturas funcional
- [ ] Completar projetos com datas e gestão funcional de entregáveis
- [ ] Implementar revisões com comentários por timestamp e limite validado no servidor
- [ ] Proteger upload e download por autenticação, ownership e versionamento real
- [x] Adicionar preview de áudio com watermark e seleção funcional de licença exclusiva/não exclusiva
- [x] Corrigir webhook para validar raw body e garantir idempotência por restrição única
- [ ] Cobrir arquivos, webhook e revisões com testes Vitest dedicados
- [ ] Finalizar localização de termos como Discovery, Beat Store, CATALOG e estados técnicos
- [ ] Transformar ferramentas, automações e central de recursos em fluxos funcionais reais
- [x] Conectar desbloqueio da missão a estado persistido no backend

- [x] Implementar máquina de estados real de pedidos de teste: pending para paid, failed ou cancelled
- [x] Adicionar consulta de estado e testes específicos do checkout
- [x] Garantir preview derivado ou metadato explícito de watermark antes da publicação
- [x] Testar a proteção de preview com watermark no fluxo de catálogo

- [x] Testar criação válida de pedido, consulta do pedido criado e transições pending para paid/failed/cancelled
- [x] Validar por teste ou verificação visual que o catálogo só exibe áudio quando previewWatermarked é 1

- [x] Adicionar teste de integração que crie pedido válido, consulte status persistido e execute pending para paid/failed/cancelled
- [x] Adicionar teste do router checkout.transition para sucesso e rejeição de transições inválidas

- [x] Executar teste de checkout sem mock de persistência em ambiente isolado e validar status do pedido criado
- [x] Cobrir no checkout as transições pending para paid, failed e cancelled
- [x] Testar rejeição explícita de transição inválida no router, como paid para cancelled

- [ ] Adicionar teste de checkout sem vi.mock do banco, em ambiente isolado, criando pedido real e consultando o status persistido
- [ ] Comprovar no teste real que checkout.status lê o pedido criado, sem depender apenas do retorno da mutação

- [x] Persistir no backend o início, a etapa atual e o desbloqueio final da missão para usuários autenticados
- [x] Conectar o desbloqueio final a uma condição real do sistema e restaurá-lo ao recarregar a sessão
- [x] Adicionar testes tRPC para mission.progress e mission.advance, incluindo retomada do desbloqueio

- [x] Validar no servidor a condição real do desbloqueio final, sem confiar apenas no código do cliente
- [x] Testar no tRPC desbloqueio negado sem condição válida e restauração após recarregar a sessão

- [ ] Negar unlockMission quando não existir progresso persistido suficiente, sem criar desbloqueio direto
- [ ] Validar o desbloqueio final por estado real persistido, independente do código fixo no cliente
- [ ] Adicionar teste de integração sem mock do db para mission.progress e mission.unlock com nova leitura do estado persistido

- [x] Auditar a missão, o Hub, o catálogo e as ferramentas em viewport mobile real
- [x] Corrigir overflow, navegação, toque, legibilidade e estados funcionais da versão mobile
- [x] Criar simulação vertical 9:16 em português com remetente identificado e Protocolo Belentani
- [x] Mostrar Duck como Guardião da Gema nº 1 e scanner laser identificando o usuário
- [x] Documentar o que o software já faz e o que Duck fará ao receber solicitações ou arquivos
- [x] Gerar ZIP com software, vídeo, documentação e materiais relevantes

- [x] Aplicar correções mobile reais para overflow horizontal e alvos de toque nos fluxos principais
- [x] Validar novamente missão, Hub, catálogo e ferramentas após as correções mobile
- [x] Registrar evidência técnica verificável do vídeo vertical por integridade, duração e especificação de cena
