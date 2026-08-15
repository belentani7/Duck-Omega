# Automatizaciones operativas de Duck Hub

## Decisión

Duck Hub adoptará un flujo orientado a eventos con procesamiento determinista en el backend. Las acciones de alto impacto —cesión de derechos, licencia exclusiva, reembolso, publicación pública o envío contractual— requieren aprobación humana explícita. Las acciones repetitivas —registro de actividad, recordatorios, hash de archivos, creación de tareas internas y cálculo de métricas— pueden ejecutarse automáticamente.

## Contrato mínimo de evento

```json
{
  "eventId": "uuid",
  "type": "order.paid",
  "entityType": "order",
  "entityId": "order-id",
  "actorId": "user-id-or-system",
  "occurredAt": "utc-iso-8601",
  "idempotencyKey": "provider-event-id",
  "payloadVersion": 1,
  "status": "received|processed|failed|ignored",
  "attempt": 1,
  "errorCode": null
}
```

## Matriz de eventos

| Evento | Acción automática | Aprobación | Idempotencia | Límite de coste |
|---|---|---|---|---|
| `lead.created` | Crear cliente y tarea de seguimiento | No | `lead.id + type` | Máximo una tarea por 24 h |
| `project.created` | Crear plantilla de entregables y carpeta lógica | No | `project.id + template` | Máximo una plantilla |
| `file.received` | Calcular hash, MIME, versión y actividad | No | `file.hash + project.id` | Rechazar archivos fuera de tamaño |
| `revision.comment.created` | Notificar al responsable | No | `comment.id` | Agrupar notificaciones en ventana |
| `revision.approved` | Avanzar proyecto si se cumplen condiciones | Sí si implica entrega contractual | `revision.id + approved` | Una transición |
| `order.created` | Mantener estado pendiente y registrar auditoría | No | `order.id` | Sin tareas externas |
| `order.paid` | Marcar pagado, crear contrato pendiente y tarea de entrega | Sí para envío final | `providerEventId` | Un contrato y una tarea |
| `download.requested` | Crear URL firmada corta y registrar acceso | No | `file.id + user.id + timeBucket` | Máximo por ventana configurable |
| `project.overdue` | Crear alerta interna | No | `project.id + dateBucket` | Una alerta diaria |

## Estados críticos

Los pedidos siguen `pending → paid`, `pending → failed` o `pending → cancelled`. Un estado `paid` no puede volver a `cancelled` automáticamente. El webhook debe verificar firma sobre el cuerpo bruto, usar la clave única del proveedor y responder de forma segura a reintentos.

Las revisiones deben validar el límite exclusivamente en el servidor. El cliente puede mostrar el contador, pero nunca decidir si una revisión es válida. Los archivos privados se sirven mediante URLs firmadas con expiración corta y con comprobación de ownership.

## Observabilidad

Cada acción debe registrar actor, entidad, resultado, latencia, proveedor, versión de payload y error normalizado. Los logs no deben contener tokens, contenido completo de archivos, contraseñas, datos de pago ni conversaciones privadas innecesarias.

## Backlog operativo

| Prioridad | Entregable | Evidencia de terminado |
|---|---|---|
| P0 | Webhook raw-body + firma + idempotencia | Test de firma válida, inválida y reintento |
| P0 | Ownership de archivos y proyectos | Test de acceso permitido y denegado |
| P0 | Revisiones server-side | Test de límite excedido |
| P1 | Máquina de estados de pedidos | Test de cada transición válida e inválida |
| P1 | Contrato PDF y email | Artefacto generado en sandbox y email de prueba |
| P1 | Centro de actividad | Evento visible con actor y timestamp |
| P2 | Automatizaciones configurables | UI de reglas, límites y apagado |
| P2 | Panel de métricas | Margen, conversión, tiempo de entrega y concentración |

## Control de costes

Cada automatización que consuma un proveedor externo debe tener un `costCenter`, un límite por evento, un límite diario y un circuito de apagado. El sistema debe preferir operaciones locales y deterministas; el LLM solo se usa donde aporta juicio o generación, con modelo, coste y salida registrados.
