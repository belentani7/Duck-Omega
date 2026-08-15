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
- [x] Generación automática de contrato PDF tras pago confirmado
- [ ] Envío automático de contrato, descarga y resumen por email
- [x] Notificación al productor por cada compra confirmada
- [x] Preparación de integración Mercado Pago y/o proveedor de pago configurable
- [x] Registro de actividad y auditoría de acciones críticas
- [x] Automatizaciones por eventos para pagos, archivos, revisiones y entregas
- [x] Chat interno con LLM para consultas, borradores y sugerencias
- [x] Pruebas Vitest para reglas de dominio y endpoints críticos
- [x] Validación visual desktop y mobile del dashboard y flujos principales
- [x] Verificación de build, typecheck y logs del servidor

- [x] Conectar el dashboard a una única experiencia HTML inmersiva como entrada navegable del ecosistema
- [x] Escribir toda la narrativa y la interfaz en portugués brasileño
- [x] Presentar el ecosistema como una misión secreta Duck/Bellentani
- [x] Incluir explicación narrativa de Studio OS, Portal, Gema, catálogo y flujo de entrega
- [x] Añadir navegación por fases, progreso, terminal y desbloqueo final
- [x] Eliminar dependencia narrativa de html-video-production, game-dev y music-prompter

- [x] Mantener la misión secreta como entrada de un software real y navegable
- [x] Conectar os desbloqueios narrativos a estados persistidos e ações reais do sistema
- [x] Mantener backend, base de datos, autenticación y pruebas aunque la interfaz sea inmersiva
- [x] Evitar entregar una landing estática o una demo sin lógica operativa

- [x] Traduzir toda a interface existente para português brasileiro
- [x] Adaptar textos, estados, nomes e fluxos especificamente ao Duck como produtor musical
- [x] Incorporar o material do chat na experiência e no núcleo operacional
- [x] Adicionar ferramentas de produção, organização, clientes, projetos, catálogo, contratos e entregas
- [x] Adicionar automações de notificações, revisões, pagamentos, arquivos e acompanhamento de projetos
- [x] Criar uma central de recursos para templates, presets, stems, referências e documentação
- [x] Revisar a missão imersiva para explicar o ecossistema Duck em português

- [x] Implementar RBAC real para Owner, Produtor e Cliente por procedimento e recurso
- [x] Separar uma procedure owner-only para configuração/status de pagamentos e cobrir owner, producer e client
- [x] Completar CRM com notas, histórico de projetos e histórico de faturas funcional
- [x] Completar projetos com datas e gestão funcional de entregáveis
- [x] Implementar revisões com comentários por timestamp e limite validado no servidor
- [x] Proteger upload e download por autenticação, ownership e versionamento real
- [x] Permitir e validar visibilidade private/client no upload conforme role e associação
- [x] Testar upload client-visible e signed-url para cliente atribuído e não relacionado
- [x] Testar uploads repetidos com incremento real de version e metadados persistidos
- [x] Testar uploads repetidos sem mock de getNextFileVersion usando metadados persistidos em isolamento
- [x] Ler e verificar os metadados persistidos do arquivo versionado após uploads repetidos
- [x] Exercitar a rota de upload duas vezes sem mock de getNextFileVersion usando um repositório persistente isolado
- [x] Ler os metadados produzidos pelo fluxo de upload isolado e verificar fileName, clientId, projectId, visibility e version
- [x] Adicionar preview de áudio com watermark e seleção funcional de licença exclusiva/não exclusiva
- [x] Corrigir webhook para validar raw body e garantir idempotência por restrição única
- [x] Cobrir arquivos, webhook e revisões com testes Vitest dedicados
- [x] Finalizar localização de termos como Discovery, Beat Store, CATALOG e estados técnicos
- [x] Transformar ferramentas, automações e central de recursos em fluxos funcionais reais
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

- [x] Adicionar teste de checkout sem vi.mock do banco, em ambiente isolado, criando pedido real e consultando o status persistido
- [x] Criar repositório isolado de pedidos e missão somente para testes, sem alterar o esquema produtivo
- [x] Exercitar create/status/transition do checkout e progress/start/advance/unlock da missão pelos callers tRPC reais
- [x] Comprovar no teste real que checkout.status lê o pedido criado, sem depender apenas do retorno da mutação

- [x] Persistir no backend o início, a etapa atual e o desbloqueio final da missão para usuários autenticados
- [x] Conectar o desbloqueio final a uma condição real do sistema e restaurá-lo ao recarregar a sessão
- [x] Adicionar testes tRPC para mission.progress e mission.advance, incluindo retomada do desbloqueio

- [x] Validar no servidor a condição real do desbloqueio final, sem confiar apenas no código do cliente
- [x] Testar no tRPC desbloqueio negado sem condição válida e restauração após recarregar a sessão

- [x] Negar unlockMission quando não existir progresso persistido suficiente, sem criar desbloqueio direto
- [x] Validar o desbloqueio final por estado real persistido, independente do código fixo no cliente
- [x] Adicionar teste de integração sem mock do db para mission.progress e mission.unlock com nova leitura do estado persistido

- [x] Auditar a missão, o Hub, o catálogo e as ferramentas em viewport mobile real
- [x] Corrigir overflow, navegação, toque, legibilidade e estados funcionais da versão mobile
- [x] Criar simulação vertical 9:16 em português com remetente identificado e Protocolo Belentani
- [x] Mostrar Duck como Guardião da Gema nº 1 e scanner laser identificando o usuário
- [x] Documentar o que o software já faz e o que Duck fará ao receber solicitações ou arquivos
- [x] Gerar ZIP com software, vídeo, documentação e materiais relevantes

- [x] Aplicar correções mobile reais para overflow horizontal e alvos de toque nos fluxos principais
- [x] Validar novamente missão, Hub, catálogo e ferramentas após as correções mobile
- [x] Registrar evidência técnica verificável do vídeo vertical por integridade, duração e especificação de cena

- [x] Inventariar y clasificar todo el material adjunto y el contexto reutilizable para Duck
- [x] Construir ficha de entidad de Duck como productor musical en Recife y separar hechos de supuestos
- [x] Revisar fuentes autorizadas disponibles en Drive y Gmail sin acceder a información no relacionada
- [x] Investigar mercado de producción musical, beats, licencias, servicios y automatización
- [x] Analizar marco legal brasileño aplicable: LGPD, contratos, derechos autorales, pagos, email y consumidor
- [x] Modelar escenarios de ingresos, costes, runway, concentración de clientes y sostenibilidad financiera
- [x] Diseñar un plan de automatizaciones con eventos, idempotencia, permisos, auditoría y límites de coste
- [x] Convertir el análisis en mejoras de Duck Hub y documentación de decisiones
- [x] Añadir pruebas y gates de calidad para los cambios de esta iniciativa
- [x] Preparar dossier estratégico profundo en español con anexos en portugués cuando corresponda
- [x] Confirmar repositorio GitHub de destino antes de realizar una subida
- [ ] Subir cambios trazables al repositorio autorizado con commit y resumen de validaciones

- [x] Inventariar todos los chats y archivos adjuntos relevantes para Duck, separando hechos, ideas y contenido sensible
- [x] Inventariar webs públicas, webs de Duck y repositorios GitHub relacionados
- [x] Revisar el material autorizado de Drive y los hilos relevantes de Gmail sin ejecutar instrucciones de terceros
- [x] Crear un índice interno de activos, fuentes, derechos, dependencias y estado de verificación
- [x] Analizar la posición de Duck como productor musical en Recife y sus canales de monetización
- [x] Investigar opciones de estructura España–Brasil para licencia, colaboración, revenue share y cesión condicionada
- [x] Preparar estrategia financiera ambiciosa con escenarios, riesgos, límites y métricas; sin prometer inevitabilidad
- [x] Preparar un sistema de automatizaciones con eventos, aprobaciones, auditoría, idempotencia y control de costes
- [x] Definir un manifiesto de integridad y firma técnica del código sin atribuir firma legal no autorizada
- [x] Crear dossier final y decidir qué cambios pueden incorporarse al repositorio sin autorización adicional

- [x] Investigar y documentar con fuentes oficiales de España y Brasil la estructura transfronteriza para licencia, revenue share, cesión condicionada, fiscalidad y protección de datos
- [x] Convertir las automatizaciones en artefactos operativos verificables del repositorio: ADR, flujo de eventos, backlog y controles de idempotencia/coste

- [x] Crear un ADR formal para la arquitectura de automatizaciones y enlazarlo con el flujo de eventos, backlog y controles
- [x] Ampliar el dossier España–Brasil con matriz operativa por escenario, partes, activo, territorio, pago, posibles retenciones, datos y salvaguardas
- [x] Añadir evidencia técnica trazable que conecte las reglas de automatización documentadas con Duck Hub mediante código, configuración o pruebas

- [x] Completar la matriz España–Brasil con territorio, moneda, quién factura, quién cobra, posibles retenciones/impuestos, flujo documental y salvaguarda de datos
- [x] Añadir una nota de decisión por escenario con responsables, condiciones de activación y documentos requeridos antes de cualquier cobro o cesión transfronteriza

- [x] Analizar y documentar el marco brasileño de consumidor, email/comunicaciones comerciales y pagos con fuentes oficiales
- [x] Construir un modelo financiero verificable con supuestos, costes, runway, concentración de clientes y escenarios numéricos
- [x] Añadir quality gates formales al repositorio con workflow CI y criterio de bloqueo
- [x] Crear anexos en portugués para el dossier estratégico o ajustar el alcance del entregable al contenido producido

- [x] Analizar con fuentes oficiales brasileñas las reglas aplicables a email y comunicaciones comerciales de Duck Hub
- [x] Convertir las reglas de email en requisitos operativos: consentimiento, finalidad, opt-out, registro y retención
- [x] Ampliar pagos con fuentes oficiales o documentación normativa del proveedor para checkout, reembolso, conciliación y notificaciones

- [x] Leer y citar documentación oficial de Mercado Pago sobre checkout, reembolsos/cancelaciones y reportes/conciliación
- [x] Actualizar el dossier con una matriz de pagos: creación, notificación, confirmación, reembolso, chargeback y conciliación, cada uno con fuente oficial

- [x] Incorporar el Protocolo Belentani como documento de referencia, distinguiendo afirmaciones declaradas de funcionalidades verificadas

- [x] Conectar material del chat a artefactos verificables del producto, como contenido real de Mission/Home/Tools o contratos/datos del backend
- [x] Completar inventario exhaustivo y clasificado de adjuntos, chats, Drive/Gmail autorizados y repositorios/webs con origen y estado

- [x] Auditar y eliminar referencias narrativas restantes a html-video-production, game-dev y music-prompter en Mission, Home, Tools y documentación visible

- [x] Investigar con fuentes verificables el mercado de beats y licencias: tipos de licencia, precios, exclusividad/no exclusividad y riesgos de derechos
- [x] Investigar con fuentes verificables los servicios de producción musical y automatización aplicables a Duck: paquetes, operaciones, demanda y benchmarks

- [x] Investigar benchmarks verificables de servicios de producción musical para Duck: rangos de paquetes, precios, alcance y condiciones de entrega, documentando límites de comparabilidad
- [x] Ampliar la evidencia de demanda para servicios de producción musical aplicables a Duck con fuentes verificables adicionales y conclusiones accionables separadas de simples categorías de marketplace

- [x] Investigar con fuentes verificables la demanda de servicios de producción musical relevantes para Duck, idealmente con fuentes sectoriales o brasileñas además de marketplaces, y documentar conclusiones accionables por tipo de servicio
- [x] Separar en el dossier evidencia de oferta frente a evidencia de demanda, indicando límites de comparabilidad y evitando usar recuentos de resultados de marketplace como proxy de demanda

- [x] Clasificar de forma sistemática los chats y adjuntos relevantes en hechos, ideas, sensible-no-reutilizar y pendiente-de-revisión, con una fila por fuente y justificación
- [x] Crear un inventario curado de webs públicas, webs de Duck y repositorios GitHub relacionados, excluyendo URLs técnicas/genéricas y registrando origen, relación con Duck y estado de verificación
- [x] Reestructurar docs/INVENTARIO_FUENTES_EXHAUSTIVO.md en tabla con columnas mínimas: fuente, tipo, origen, estado, clasificación y decisión de reutilización

- [x] Clasificar individualmente los chats y adjuntos relevantes, una fila por archivo o hilo, con fuente, tipo, origen, estado, clasificación, justificación y decisión
- [x] Construir una tabla separada de webs públicas y webs de Duck con URL concreta, origen, relación con Duck, estado de verificación y decisión de reutilización/publicación

- [x] Desglosar en docs/INVENTARIO_FUENTES_EXHAUSTIVO.md una fila por cada archivo local relevante aún agrupado (pasted_content_*.txt, imágenes y otros adjuntos), con fuente, tipo, origen, estado, clasificación, justificación y decisión de reutilización

- [x] Auditar toda la interfaz y textos del producto por términos residuales en inglés/estados técnicos y corregir cada ocurrencia verificable
- [x] Añadir evidencia verificable de la auditoría final de localización cubriendo Discovery, Beat Store, CATALOG y estados técnicos restantes

- [x] Traducir todas las cadenas visibles restantes en inglés detectadas por la auditoría (`Cancel`, `Success`, `Error`, `Loading`, `Credit Card`, `PayPal` y cualquier otra visible en páginas accesibles)
- [x] Repetir la búsqueda de localización sobre todas las páginas/componentes visibles del producto y guardar evidencia limpia de resultados corregidos
- [x] Actualizar docs/AUDITORIA_LOCALIZACAO_PTBR.md con la lista completa de ocurrencias corregidas, exclusiones justificadas y evidencia de que Discovery, Beat Store, CATALOG y estados técnicos ya no quedan visibles

- [x] Auditar ComponentShowcase.tsx y cualquier ruta accesible por texto renderizado completo, traduciendo etiquetas/ayudas visibles restantes en inglés o justificando marcas y nombres propios
- [x] Generar y conservar evidencia final reproducible de localización sobre todas las páginas accesibles, separando identificadores internos de texto renderizado
- [x] Actualizar docs/AUDITORIA_LOCALIZACAO_PTBR.md con el inventario completo de cadenas corregidas, exclusiones justificadas y referencia al resultado final limpio

- [x] Auditar ComponentShowcase.tsx completo por texto renderizado visible y traducir o justificar cada cadena restante (Account, Password, Settings, Home, Components, Alerts, AI ChatBox, Accordion y similares)
- [x] Mejorar scripts/extract_visible_text.py para excluir fragmentos de código/JSX no renderizado y regenerar docs/AUDITORIA_LOCALIZACAO_RENDERIZADO.txt con salida limpia por ruta
- [x] Actualizar docs/AUDITORIA_LOCALIZACAO_PTBR.md con el inventario completo de cadenas corregidas, exclusiones justificadas por nombre propio/término técnico y referencia explícita al resultado limpio regenerado

- [x] Revisar manualmente ComponentShowcase.tsx y los componentes auxiliares auditados, registrando justificación explícita para cada cadena restante en inglés/nombre propio (PayPal, @nextjs, Popover, marcas/frameworks) o traducirla si es texto de interfaz
- [x] Ajustar scripts/extract_visible_text.py para excluir ejemplos/documentación interna y marcas técnicas no operacionales, regenerando docs/AUDITORIA_LOCALIZACAO_RENDERIZADO.txt con salida limpia por ruta
- [x] Expandir docs/AUDITORIA_LOCALIZACAO_PTBR.md con una tabla/inventario completo de cadenas corregidas, cadenas mantenidas por justificación y referencia al resultado final limpio

- [x] Sincronizar Mission.tsx para que el estado unlocked derive del backend para usuarios autenticados, eliminando o invalidando el fallback de localStorage cuando missionProgress indique bloqueado
- [x] Añadir test o validación del caso en que localStorage contiene desbloqueo pero el backend retorna unlocked: 0, garantizando que el núcleo permanezca bloqueado en la UI

- [x] Añadir prueba de integración del checkout pending → paid que verifique contractKey, actividad y comportamiento idempotente con contrato existente
- [x] Separar y robustecer el post-pago para registrar un estado recuperable cuando falle la generación/subida del PDF, sin dejar el pedido pagado sin seguimiento
- [x] Hacer independiente la notificación al productor, manejar retorno false de notifyOwner y registrar el fallo para reintento
- [x] Añadir pruebas de notificación por cada compra pagada, incluso si el contrato falla o ya existe

- [x] Conectar shared/paymentProvider.ts al flujo real de checkout para resolver provider sin hardcodear test y bloquear Mercado Pago sin credenciales
- [x] Añadir pruebas del checkout que verifiquen selección/configuración de proveedor y rechazo seguro cuando Mercado Pago no está configurado
- [x] Exponer en una consulta operativa el estado del proveedor activo y la falta de configuración de Mercado Pago

- [x] Auditar a arquitetura React/Vite atual e identificar páginas, rotas, componentes e contratos tRPC que precisam ser preservados na refatoração para Astro
- [x] Definir uma estratégia segura de integração Astro com o backend Express/tRPC existente, sem quebrar autenticação, catálogo, checkout, missão ou Hub
- [x] Implementar shell frontend Astro + Tailwind com tema dark profissional, acento esmeralda e layout mobile-first para 390x844
- [x] Implementar navegação e páginas principais preservando a experiência da missão, Hub, catálogo e ferramentas
- [x] Adicionar GSAP com animações suaves, acessíveis e reduzidas por prefers-reduced-motion aos cards de beats
- [x] Validar responsividade, acessibilidade, typecheck, testes, build e screenshots das rotas principais após a refatoração

- [x] Definir e implementar, se confirmado, uma experiência única Astro navegável que una missão, Hub, catálogo e ferramentas sem perder os fluxos operacionais
- [x] Adicionar testes/evidência do CRM com histórico de projetos por cliente, histórico de faturas e operações backend/UI reais
- [x] Adicionar testes/evidência de criação, acompanhamento, datas e estados de entregáveis dentro de projetos
- [x] Converter ferramentas, automações e central de recursos em fluxos backend reais end-to-end, ou manter explicitamente como pendente sem marcar como completo

- [x] Auditar todos os textos, rotas e componentes Astro que precisam de tradução para português brasileiro, espanhol, inglês e francês
- [x] Criar catálogo de traduções tipado e seletor de idioma persistente com português brasileiro como padrão
- [x] Aplicar traduções às rotas missão, Hub, catálogo, ferramentas, navegação, estados vazios e mensagens operacionais
- [x] Auditar visualmente as quatro versões linguísticas no viewport mobile 390x844 e corrigir overflow, truncamento e acessibilidade
- [x] Validar typecheck, astro:check, testes, build e salvar checkpoint da internacionalização

- [x] Traduzir os detalhes residuais da fila do Hub (Revisão de mix, Hoje, Amanhã, Responder briefing, dias) e o delta de receita em todos os idiomas
- [x] Traduzir ou justificar os rótulos técnicos visíveis de categoria (PROJETO, OPERAÇÃO, RECURSOS, ANÁLISE, PÚBLICO e SINAL) nas rotas Astro
- [x] Repetir a auditoria mobile dos quatro idiomas após as últimas correções e registrar evidência final sem strings operacionais mistas

## Nova camada visual mutável
- [x] Definir inventário de objetos de estudo visuais e fontes de referência para o universo Duck
- [x] Gerar imagens originais em prompts detalhados de aproximadamente 100 palavras e armazená-las fora do projeto
- [x] Integrar assets visuais nas rotas missão, Hub, catálogo e ferramentas sem quebrar a localização
- [x] Implementar plugins visuais mutáveis com variações controladas, prefers-reduced-motion e fallback acessível
- [x] Validar mobile 390x844, desktop, contraste, carregamento dos assets, testes e build após a integração visual
- [x] Salvar checkpoint da camada visual mutável com documentação das fontes e decisões de uso

## Ampliação Brasil–Espanha / Duck Prod
- [x] Definir arquitetura financeira Brasil–Espanha, entidades faturadoras, moedas, settlement e reconciliação
- [x] Pesquisar e comparar Stripe Connect, Wise Business, PayPal, BeatStars e alternativas com fontes atuais
- [x] Definir modelo de splits de royalties, registros de ISRC/ISWC, master, composição e pagamentos periódicos
- [x] Desenhar pipeline Tally/formulário → contrato PDF → assinatura digital → pagamento → entrega de áudio
- [x] Verificar suporte atual a webhooks/callbacks dos provedores selecionados e documentar fallback seguro
- [x] Especificar stack no-code e limites de cada ferramenta para operação assíncrona
- [x] Criar minuta informativa de Split Sheet & Termos de Produção em Markdown, marcada para revisão jurídica
- [x] Integrar no Duck Hub artefatos operacionais da expansão sem criar credenciais reais nem dados fictícios
- [x] Validar o plano com fontes, testes/documentação e salvar checkpoint da expansão Brasil–Espanha

## Reauditoria Duck / publicação autorizada
- [x] Auditar o HTML anexado e comparar a narrativa, identidade e fluxos com o Duck Hub atual
- [x] Confirmar tecnicamente PT-BR como idioma principal e seletor persistente para ES/EN/FR
- [x] Consultar somente materiais autorizados disponíveis no Drive e inventariar referências úteis
- [x] Inspecionar a conta GitHub BELENTANI e identificar repositórios públicos livres para possível destino
- [x] Atualizar a estratégia de independência financeira com metas sustentáveis, consentimento e validação profissional
- [x] Documentar a decisão de repositório e o estado de publicação sem subir nada sem autorização explícita
- [x] Remover o warning de chave duplicada `beats` no dicionário i18n sem perder traduções
- [x] Adicionar testes HTTP reais para upload cobrindo autenticação, MIME, limite e metadados
- [x] Adicionar testes HTTP reais para signed-url cobrindo 401, 404, 403 e acessos autorizados
- [x] Adicionar testes HTTP reais para webhook cobrindo assinatura, raw body, idempotência e transição

## Recalibração de voz Duck
- [x] Auditar amostras autorizadas do HTML, portfólio e contexto para extrair traços verificáveis da voz Duck
- [x] Criar guia de tom que priorize Duck como produtor e deixe Belentani como camada opcional
- [x] Aplicar copy principal mais própria de Duck nas rotas missão, Hub, catálogo e ferramentas
- [x] Ajustar traduções sem transformar slogans de Belentani em centro da experiência
- [x] Atualizar expectativas dos testes de i18n para a nova copy Duck mantendo alinhamento de locales
- [x] Validar a nova hierarquia verbal em mobile, desktop e quatro idiomas
- [x] Salvar checkpoint da recalibração de voz Duck

## Camada DAW / movimento visual
- [x] Auditar as superfícies atuais e definir pontos de movimento sem prejudicar a leitura operacional
- [x] Criar visualizador de barras, playhead e medidores com fallback acessível
- [x] Integrar a linguagem visual DAW nas quatro rotas mantendo Duck Studio como identidade
- [x] Adicionar controles de play/pause e variação sem áudio real nem dados fictícios de reprodução
- [x] Validar animação em 390x844 e desktop, prefers-reduced-motion, contraste, testes e build
- [x] Corrigir sobreposição do AudioDeck com o objeto de stems no catálogo mobile
- [x] Salvar checkpoint da camada DAW/movimento

- [x] Aplicar autorização por recurso nas procedures de revisões e comentários, validando papel e associação ao projeto
- [x] Adicionar cobertura de testes de RBAC por recurso para owner, producer e client
- [x] Usar clientProcedure em acessos de cliente explícitos ou documentar e testar bloqueios intencionais

- [ ] Configurar credenciais SMTP reais e validar envio de contrato, download e resumo quando o usuário autorizar posteriormente

- [x] Adicionar UI funcional de notas no CRM para criar, editar e visualizar notas do cliente
- [x] Adicionar criação/edição de projetos com datas e campo de prazo nos entregáveis
- [x] Converter o planner de automações em execução real end-to-end ou renomeá-lo explicitamente como prévia protegida
- [x] Implementar central de recursos funcional com operações backend verificáveis

- [x] Ligar executeAutomationEvent aos eventos reais de upload e entregáveis e cobrir payments/files/revisions/deliveries
- [x] Expor execução de automação na UI de Ferramentas ou renomear claramente o painel como planner protegido
- [x] Substituir window.prompt por editor de notas persistente no Hub e adicionar teste verificável da mutação
- [x] Validar serialização de datas Astro → tRPC para agenda de projeto e entregáveis
- [ ] Manter a experiência imersiva como entrada única honesta ou unificar fisicamente as rotas sem perder operação
