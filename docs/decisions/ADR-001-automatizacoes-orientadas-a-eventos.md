# ADR-001: Automatizaciones orientadas a eventos con aprobación humana

## Estado

Aceptada para implementación incremental.

## Contexto

Duck Hub gestiona clientes, proyectos, archivos, revisiones, catálogo y pedidos. Las automatizaciones deben reducir trabajo repetitivo sin convertir una decisión jurídica, financiera o de publicación en una acción irreversible ejecutada sin revisión.

## Decisión

Usaremos eventos persistidos y handlers deterministas. Cada evento tendrá identificador, entidad, actor, versión, clave de idempotencia, estado, intento y error normalizado. Los handlers deberán ser reentrantes y registrar actividad. Las acciones de alto impacto —licencia exclusiva, cesión, reembolso, publicación pública y envío contractual— quedarán detrás de aprobación humana.

La especificación de eventos, límites y backlog vive en `docs/AUTOMATIZACIONES_DUCK_OPERATIVAS.md`. Toda nueva automatización debe añadir una fila a esa matriz, un test de idempotencia y un límite de coste antes de activarse.

## Alternativas consideradas

| Opción | Motivo de descarte |
|---|---|
| Automatizaciones solo en frontend | No protege reglas, permisos ni límites; puede manipularse |
| Cron genérico sin eventos | Pierde causalidad, dificulta reintentos y genera duplicados |
| LLM para todas las decisiones | Coste, imprevisibilidad y riesgo en pagos/derechos |
| Webhooks sin idempotencia | Puede duplicar contratos, emails o entregas |

## Consecuencias

Se gana trazabilidad, reintento seguro y separación entre decisión humana y tarea automática. A cambio, se necesita una tabla o registro de eventos, tests de transición, observabilidad y una política de retención.

## Criterios de aceptación

La decisión se considera implementada cuando existe un evento persistido por operación crítica, los handlers verifican ownership y permisos, las claves de idempotencia evitan duplicados, los límites de coste son configurables y hay tests para éxito, reintento y fallo.

## Seguridad y privacidad

Los eventos no almacenan tokens, contraseñas, cuerpos completos de audio, datos bancarios ni conversaciones privadas innecesarias. Los payloads se minimizan y los accesos quedan auditados.
