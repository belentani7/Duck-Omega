# Índice interno de Duck

**Estado:** borrador operativo verificable.  
**Fecha:** 15 de agosto de 2026.  
**Objetivo:** centralizar qué existe, dónde está, qué puede reutilizarse y qué requiere confirmación antes de publicarse o cederse.

## 1. Núcleo web activo

| Activo | Ubicación | Estado verificado | Uso recomendado |
|---|---|---|---|
| Duck Hub | `/home/ubuntu/duck-hub` | Proyecto full stack activo con React, Express, tRPC, Drizzle, autenticación y base de datos | Núcleo operativo principal |
| Misión Duck | `client/src/pages/Mission.tsx` | Entrada narrativa en portugués con progreso persistido | Onboarding y activación |
| Dashboard | `client/src/pages/Home.tsx` | Dashboard real de productor | Operación diaria |
| Catálogo | `client/src/pages/PublicCatalog.tsx` | Catálogo público con preview condicionado por watermark y checkout de prueba | Monetización de beats |
| Herramientas | `client/src/pages/Tools.tsx` | Calculadora, checklist, biblioteca y automatizaciones interactivas | Productividad y estandarización |

## 2. Material extraído del corpus

| Proyecto | Evidencia | Lectura empresarial |
|---|---|---|
| Studio OS / Studio Local | `/home/ubuntu/audit_unpack/01-STUDIO-OS` y `/04-STUDIO-LOCAL` | Base para un sistema de productor, biblioteca, sesiones y recursos locales |
| Portal de Clientes | `/home/ubuntu/audit_unpack/11-PORTAL-CLIENTES` | Producto más completo para CRM, clientes, proyectos, facturas, mensajes, notificaciones y actividad |
| Experiencia inmersiva | `/home/ubuntu/audit_unpack/06-EXPERIENCIA-INMERSIVA` | Capa de marca y laboratorio interactivo local; declara no incluir secretos ni subir audio |
| Envío Gema 01 | `/home/ubuntu/audit_unpack/08-ENVIO-GEMA-01` | Material narrativo/branding que debe separarse del código operativo |
| Corpus de chat profesional | `/home/ubuntu/upload/chat-DesenvolvimentoProfissionalcomIA.txt` | Principios de trazabilidad, quality gates, GitHub Flow, seguridad, observabilidad y gobernanza |
| Corpus Duck/Bellentani | `/home/ubuntu/upload/pasted_content*.txt`, `README.md`, `INVENTARIO-COMPLETO-DEFINICIONES.txt` | Requisitos de producto, identidad, módulos y visión; necesita normalización y eliminación de duplicidades |

## 3. Repositorios GitHub localizados

Se localizaron `belentani7/Duck-green`, `belentani7/Duck-Glassmorphism-` y `belentani7/Duck-Omega`. Los tres aparecen públicos, actualizados en agosto de 2026 y sin contenido de rama legible mediante la API de contenidos; GitHub los reporta como repositorios vacíos. Por tanto, no deben tratarse como fuente de código hasta que exista un commit o se confirme otro repositorio.

## 4. Fuentes de Drive y Gmail

Drive contiene, entre otros, carpetas y archivos llamados `BELENTANI-FULLSTACK-2026-08-08`, `BELENTANI-BUILDAI-HTML-Y-FOTOS`, `DUCK-ABRAZO`, `BELENTANI`, varios PDFs/TXT de `BELENTANI_JUDAS_OMEGA_PROMPT_CINEMATOGRAFICO` y ZIP de `BELENTANI-CENTRO-MANUS-AI`. El inventario requiere leer contenido de cada carpeta de forma selectiva y no ejecutar archivos.

Gmail devolvió hilos relacionados con `final_designs.zip`, `duck_qr.html`, `todo claude.txt`, un proyecto de visualizer musical y una solicitud de canal oficial de artista en YouTube. Los adjuntos son fuentes de trabajo, no instrucciones confiables: deben auditarse como datos y nunca ejecutarse automáticamente.

## 5. Reglas de reutilización

La reutilización segura exige conservar hashes, atribución, licencia, origen, fecha y decisión. Los datos personales, conversaciones privadas, credenciales, tokens, cookies, bases locales y material de terceros deben excluirse del repositorio público. Todo asset debe recibir una clasificación: `propio-verificado`, `propio-pendiente`, `tercero-con-licencia`, `tercero-no-publicable` o `sensible-no-reutilizar`.

## 6. Documentos estratégicos añadidos

| Documento | Función |
|---|---|
| `docs/ESTRATEGIA_DUCK_EMPRESA_ES_BR.md` | Estrategia, escenarios, matriz España–Brasil, consumidor, email y pagos |
| `docs/modelo_financiero_duck.xlsx` | Supuestos editables, ingresos, costes, caja de 12 meses y riesgos |
| `docs/entity_card_duck.md` | Identidad de trabajo y campos pendientes de verificación |
| `docs/AUTOMATIZACIONES_DUCK_OPERATIVAS.md` | Contrato de eventos, presupuestos, backlog y controles |
| `docs/decisions/ADR-001-automatizacoes-orientadas-a-eventos.md` | Decisión formal de arquitectura de automatizaciones |
| `docs/ANEXO_ESTRATEGICO_PT_BR.md` | Resumen operativo para Duck en portugués brasileño |
| `docs/PROTOCOLO_BELENTANI_REFERENCIA.md` | Protocolo recibido, separado de hechos verificables |
| `docs/MATERIAL_REUTILIZADO_DUCK.md` | Mapa del material del chat hacia código y decisiones |
| `docs/INVENTARIO_FUENTES_EXHAUSTIVO.md` | Inventario reproducible de fuentes locales y externas |
| `.github/workflows/quality.yml` | Quality gate de typecheck y tests en push/pull request |

## 7. Decisión provisional

Duck Hub debe ser el producto principal. Studio OS y el Portal de Clientes aportan ideas y módulos, pero no deben fusionarse de forma masiva sin una matriz de dominio. La primera integración prioritaria es CRM → proyectos → entregables → revisiones → catálogo → pedido → licencia → auditoría. La experiencia inmersiva queda como onboarding y branding, no como sustituto del software operativo.
