# Estrategia empresarial de Duck: productor musical, catálogo y software

**Autor:** Manus AI  
**Fecha:** 15 de agosto de 2026  
**Estado:** documento de estrategia y decisión; no sustituye asesoría jurídica, fiscal o financiera profesional.

## Resumen ejecutivo

Duck no necesita empezar regalando todos sus activos para crear una empresa viable. La ventaja más defendible está en combinar producción musical, catálogo de beats, relación directa con clientes y un sistema operativo propio que capture datos, entregas, licencias, revisiones y cobros. El producto empresarial recomendado es una plataforma de servicios y activos musicales con software interno: el productor conserva la propiedad de la marca, del código y del catálogo salvo cesiones expresas, mientras que los clientes compran servicios, licencias o paquetes con alcance definido.

La estrategia más sólida no es perseguir una promesa de independencia financiera inevitable, sino construir **opcionalidad**: ingresos por servicios, licencias no exclusivas, licencias exclusivas, productos digitales, mantenimiento/retainers y, solo después de validar demanda, licenciar partes del software a otros productores. Cada línea debe tener una métrica, un coste máximo, un límite de riesgo y una condición de abandono. El objetivo es que el negocio pueda sostenerse por repetición de ventas y no por una única oportunidad, un inversor o la cesión total de derechos.

## 1. Qué empresa se está construyendo

Duck puede posicionarse como un **estudio-productora digital de música** con cuatro capas integradas:

| Capa | Oferta | Cliente | Evidencia actual |
|---|---|---|---|
| Producción | Producción, mezcla, renders, stems, revisiones y entrega | Artistas independientes, marcas y creadores | Portal de clientes, proyectos y revisiones |
| Catálogo | Beats con preview protegido, licencias exclusivas/no exclusivas | Artistas y compositores | Catálogo y checkout de prueba |
| Operación | CRM, pipeline, entregables, contratos, archivos y actividad | Duck y colaboradores | Duck Hub funcional |
| Plataforma futura | Herramientas para otros productores bajo licencia | Productores y pequeños estudios | Central de herramientas y arquitectura reusable |

La unidad económica inicial debe ser un **pedido trazable**: cliente, proyecto, entregable, alcance, licencia, precio, pago, contrato y descarga. Si una venta no puede reconstruirse desde esos datos, no está suficientemente controlada.

## 2. Modelo de ingresos recomendado

El orden importa. Primero se debe vender lo que Duck ya puede entregar; después se empaqueta el conocimiento; por último se licencia la plataforma.

| Línea | Cómo cobra | Ventaja | Riesgo | Criterio de validación |
|---|---|---|---|---|
| Servicio de producción | Precio fijo por proyecto, con revisiones limitadas | Flujo de caja rápido | Dependencia del tiempo de Duck | Tres clientes pagadores y margen positivo |
| Paquete de lanzamiento | Producción + mezcla + assets + entrega | Ticket mayor y oferta clara | Alcance ambiguo | Dos ventas repetibles con checklist |
| Licencia no exclusiva | Pago único o escalonado por beat | Escala sin perder siempre el catálogo | Confusión sobre usos | Contrato y ficha de licencia consistentes |
| Licencia exclusiva | Precio alto y retirada de disponibilidad | Monetiza escasez | Cesión o promesas mal delimitadas | Registro de exclusividad y auditoría |
| Retainer mensual | Capacidad reservada, feedback y entregas | Ingresos previsibles | Saturación | Renovación después de un ciclo |
| Productos digitales | Presets, templates, guías, recursos | Margen alto | Copias y soporte | Venta orgánica recurrente |
| Duck Hub para terceros | Suscripción o licencia de software | Escala más allá de horas de estudio | Soporte y cumplimiento | Solo después de uso interno estable |

No se recomienda invertir agresivamente en publicidad antes de conocer el margen por línea, la conversión de contacto a llamada, la conversión de propuesta a pago y el tiempo real de entrega.

## 3. Automatizaciones de alto impacto

La arquitectura debe ser orientada a eventos y a aprobaciones humanas. No todo debe automatizarse: un email de recordatorio puede ser automático; una cesión de derechos o una licencia exclusiva debe requerir confirmación explícita.

| Evento | Automatización | Control obligatorio |
|---|---|---|
| Nuevo lead | Crear cliente, asignar estado y recordatorio | Consentimiento, origen y retención |
| Propuesta aceptada | Crear proyecto, plantilla de entregables y carpeta privada | Idempotencia y ownership |
| Archivo recibido | Hash, MIME, versión, virus-scan si disponible y actividad | No confiar en `uploadedBy` del cliente |
| Demo publicada | Abrir revisión y notificar al cliente | Límite de revisiones server-side |
| Comentario con timestamp | Registrar autor, tiempo, versión y respuesta | Inmutabilidad del historial |
| Pago confirmado | Verificar firma, marcar evento único, generar licencia | Raw body, HMAC, clave única, reintentos |
| Entrega liberada | Crear URL firmada de corta duración | Permiso, expiración y auditoría |
| Proyecto atrasado | Crear alerta de operación | No enviar spam; límite por ventana |
| Cliente en riesgo | Recomendar seguimiento | No usar puntuaciones como diagnóstico personal |
| Nueva compra | Notificar a Duck y crear tarea de entrega | No enviar hasta estado `paid` confirmado |

La prioridad es integrar estas automatizaciones con un registro de eventos. Cada evento debe incluir `eventId`, `type`, `actor`, `entity`, `occurredAt`, `idempotencyKey`, `result` y `errorCode` cuando corresponda.

## 4. Estrategia España–Brasil

La residencia de Duck en Recife y la posición del creador en España hacen especialmente importante separar **propiedad**, **prestación de servicios**, **licencia** y **fiscalidad**. La estructura concreta debe revisarse con un abogado y un asesor fiscal que conozcan ambos países.

| Alternativa | Qué conserva el creador | Qué recibe Duck | Cuándo usar |
|---|---|---|---|
| Licencia limitada | Código, marca y catálogo | Derecho de uso por territorio, plazo y finalidad | Primera colaboración |
| Revenue share | Propiedad salvo activos definidos | Porcentaje sobre ventas atribuibles | Validar mercado sin valoración completa |
| Sociedad conjunta | Aportaciones documentadas | Participación económica y gobierno | Solo con confianza, contabilidad y salida |
| Cesión parcial por activo | Derechos concretos y precio concreto | Control del activo cedido | Cuando existe contraprestación clara |
| Cesión total | Poco control posterior | Propiedad amplia para Duck | No recomendable como primer paso |

La regla de negociación recomendada es: **no regalar el núcleo**. El núcleo comprende el código, los manifiestos, las metodologías, la marca, los datos de clientes, las plantillas de contratos y los activos que puedan reutilizarse con otros clientes. Si se concede acceso, debe ser mediante licencia, repositorio privado, NDA cuando proceda y una cláusula expresa de no sublicencia o de sublicencia limitada.

## 5. Propiedad intelectual y marca

### 5.1 Marco transfronterizo España–Brasil

El BOE publica un convenio entre España y Brasil para evitar la doble imposición y prevenir la evasión fiscal en materia de impuestos sobre la renta [6]. Su existencia permite diseñar una revisión bilateral de pagos por servicios, royalties y licencias, pero no permite concluir sin datos personales y contables dónde tributa una operación concreta. La residencia fiscal, la naturaleza jurídica de las partes, la calificación del pago, la existencia de establecimiento permanente, la retención en origen y la documentación de la operación deben ser revisadas por asesores en ambos países.

Para los datos personales, la AEPD mantiene orientación sobre garantías para transferencias internacionales y cláusulas contractuales tipo [7]. Duck debe evitar transferir a España o Brasil datos de clientes por defecto sin base, información, contrato y control de subencargados. La documentación contractual debe separar: tratamiento de datos, licencia de contenido, prestación de servicios y reparto económico.

La estructura inicial recomendada es una relación contractual entre partes independientes con licencia limitada y reparto medible, no una sociedad informal ni una cesión global. Antes de firmar, debe prepararse una matriz de activos y una tabla de pagos que indique moneda, quién factura, quién cobra, qué impuestos pueden aplicar y qué evidencia se conserva.

### 5.2 Matriz operativa de escenarios transfronterizos

| Escenario | Territorio y plazo | Partes, activo y responsable | Moneda, quién factura y quién cobra | Posibles impuestos/retenciones a revisar | Flujo documental previo | Datos y salvaguarda |
|---|---|---|---|---|---|---|
| Licencia limitada de código o marca | Brasil, España o ambos; plazo definido | Titular del código/marca licencia a Duck; responsable: titular + Duck | EUR o BRL; factura la parte que presta/licencia; cobra la parte titular o acordada | Retención sobre royalties/servicios, IVA/ISS y residencia fiscal: validar en ambos países | Due diligence, inventario, licencia, factura, comprobante de pago y acta de aceptación | Contacto y soporte mínimo; contrato de tratamiento si hay acceso a clientes |
| Revenue share de beats o servicios | Territorio de ventas y plataformas expresamente listados; periodo de liquidación | Duck y titular del beat/servicio; responsable: Duck calcula y titular audita | EUR o BRL; Duck cobra al cliente y liquida porcentaje documentado | Retenciones, calificación del royalty/servicio y conversión de moneda: validar por operación | Hoja de derechos, pedido, factura, informe de ventas, liquidación y comprobante | Datos de cliente minimizados; acceso por rol y exportación limitada |
| Cesión condicionada de un activo | Territorio, duración y condición de efectividad explícitos | Cedente y adquirente; solo master, composición, marca o código enumerado; responsable: ambas partes | EUR o BRL; cobra el cedente solo tras condición; activo no se transfiere antes | Impuesto sobre renta/ganancia, retenciones y tratamiento de contraprestación: validar antes de firmar | Due diligence, prueba de titularidad, contrato, hitos, pago, acta de transferencia y reversión | Expediente de titulares; cifrado, acceso restringido y borrado de copias no necesarias |
| Servicio España → Brasil o Brasil → España | País de prestación, entrega y uso definidos; plazo del servicio | Prestador y cliente; responsable: prestador entrega y cliente acepta | Moneda pactada; factura el prestador; cobra el prestador o plataforma autorizada | Impuesto sobre renta, IVA/ISS, retenciones y establecimiento permanente: asesoría bilateral obligatoria | Contrato de servicios, factura, aceptación, comprobante, registro de residencia y tratamiento de datos | Datos mínimos; cláusulas AEPD/ANPD y medidas de transferencia internacional |
| Acceso de soporte a datos de clientes | País donde se alojan y desde donde se accede; acceso temporal | Controlador y operador definidos; responsable: controlador decide y operador ejecuta | No es venta de IP; coste de soporte facturado por quien presta el servicio | Tributación del servicio y retención según partes y residencia: validar | DPA/encargo, matriz de roles, lista de subencargados, registro de acceso y borrado | Minimización, MFA, URLs expirables, logs, derechos del titular y cierre de acceso |

Esta matriz no calcula impuestos ni retenciones automáticamente. Su función es impedir que una factura, licencia, royalty o cesión se trate como si fuera la misma operación. La clasificación debe revisarse antes del primer cobro transfronterizo con profesionales de ambos países.

### Notas de decisión y activación

**Licencia limitada:** se activa solo cuando el inventario identifica al titular, el territorio, el plazo, los usos y la prohibición o alcance de sublicencia. Documentos mínimos: licencia firmada, ficha de activo, factura y comprobante de pago. Responsable de aprobación: titular y Duck.

**Revenue share:** se activa solo cuando existe una definición de venta atribuible, una periodicidad de liquidación, una cuenta de auditoría y un umbral de pago. Documentos mínimos: hoja de derechos, pedido, liquidación y comprobante. Responsable operativo: Duck; responsable de revisión: cada titular.

**Cesión condicionada:** se activa únicamente después de la verificación de titularidad, cumplimiento de hitos y confirmación del pago. Documentos mínimos: contrato, prueba de titularidad, acta de condición cumplida y registro de transferencia. Responsable de aprobación: todos los titulares afectados y asesoría jurídica local.

**Servicio transfronterizo:** se activa cuando las partes han definido quién presta, quién factura, dónde se utiliza el resultado, qué datos se transfieren y qué documentación fiscal se conservará. Documentos mínimos: contrato, factura, aceptación y evidencia de pago. Responsable: prestador y cliente, con revisión fiscal bilateral.

**Acceso de soporte:** se activa con permisos temporales, registro de accesos y acuerdo de tratamiento cuando corresponda. Documentos mínimos: DPA/encargo, matriz de roles y cierre de acceso. Responsable: controlador de datos.

### 5.3 Propiedad intelectual y marca

La Ley brasileña 9.610/1998 regula derechos de autor y derechos conexos. Su texto define el fonograma, el productor y los titulares originarios, y señala que los negocios jurídicos sobre derechos autorales deben interpretarse restrictivamente [1]. En la práctica, cada entrega musical necesita una hoja de derechos que indique quién compuso, quién interpretó, quién produjo, quién fijó el fonograma y qué uso está permitido.

El material de ECAD explica que la obra está protegida desde su creación y que la grabación genera un fonograma con titulares y derechos distintos; también describe la recaudación por ejecución pública y la relación con asociaciones [2]. Duck debe separar en el sistema los metadatos de composición, fonograma, intérpretes, productores, editoras, ISRC/identificadores cuando existan y documentos de autorización.

Para la marca Duck, el INPI indica que el registro busca garantizar exclusividad territorial sobre un signo distintivo y recomienda investigar marcas similares antes de solicitarlo [3] [4]. La búsqueda de disponibilidad debe preceder a una campaña grande y debe cubrir clases relacionadas con servicios de producción, software, educación/recursos y productos digitales, según la clasificación aplicable.

## 6. Privacidad y operación de datos

El Portal de Clientes y Duck Hub manejan emails, teléfonos, notas, proyectos, archivos, conversaciones y actividad. La ANPD identifica las funciones de controlador, operador y encargado, y publica orientación específica sobre esos agentes [5]. Duck debe documentar finalidades, base legal, minimización, retención, derechos del titular, control de acceso, incidentes, subencargados y transferencias internacionales.

No se deben importar chats privados o adjuntos de Gmail en la base de producción por defecto. El índice interno debe conservar solo referencias, hashes y resúmenes necesarios. Los originales sensibles deben permanecer fuera del repositorio y con acceso restringido.

## 7. Escenarios económicos, no promesas

| Escenario | Supuesto operativo | Señal de salud | Acción |
|---|---|---|---|
| Conservador | Pocas ventas y fuerte dependencia de servicios | Margen bajo o pagos irregulares | Reducir costes fijos y vender paquetes simples |
| Base | Mezcla de servicios, beats y algunos retainers | Repetición y entregas a tiempo | Estandarizar oferta y seguimiento |
| Expansivo | Catálogo, retainers y primeras licencias de software | CAC controlado, margen creciente y baja concentración | Reinvertir con límites y soporte |

La métrica central no es la facturación bruta, sino **margen de contribución por oferta**. Deben medirse: ingresos cobrados, costes directos, horas de Duck, reembolsos, porcentaje de revisiones extra, días hasta pago, concentración del mayor cliente, recurrencia y caja disponible. Ninguna proyección garantiza independencia financiera; una meta responsable es aumentar la probabilidad de sostenibilidad y la capacidad de corregir pronto.

## 8. Plan de 90 días

Durante los primeros 30 días, Duck debe cerrar la definición de oferta, separar el catálogo propio del material de terceros, documentar licencias, registrar fuentes, comprobar disponibilidad de la marca y validar el flujo de propuesta → pago → entrega con pocos clientes reales.

Entre los días 31 y 60, se debe medir conversión, margen y tiempo de entrega, automatizar solo eventos repetitivos, publicar un catálogo limitado y crear dos casos de estudio con autorización. El software debe registrar auditoría, ownership, expiración de URLs y estado de pago.

Entre los días 61 y 90, Duck puede probar un retainer, un producto digital y una colaboración revenue-share. Solo si hay demanda repetida debe considerarse ofrecer Duck Hub a otros productores. La decisión de sociedad, cesión o inversión debe quedar fuera de la urgencia operativa.

## 9. Recomendación ejecutiva

La mejor aproximación es **licencia limitada + revenue share acotado + opción de compra por activo**, no una cesión total. El creador conserva el núcleo y Duck obtiene un camino para capturar valor si realmente genera ventas. Todo acuerdo debe definir partes, activos, territorio, plazo, exclusividad, usos, sublicencias, pagos, impuestos, auditoría, confidencialidad, protección de datos, resolución de conflictos, terminación, devolución o destrucción de materiales y tratamiento del código.

La estrategia “nivel Elon Musk” que sí es defendible no consiste en prometer grandeza inevitable; consiste en construir una máquina de aprendizaje con ciclos rápidos, control de costes, distribución propia, activos reutilizables, métricas y capacidad de decir no. Duck debe ganar por claridad y repetición, no por entregar gratuitamente el patrimonio que podría sostenerlo.

## Referencias

[1]: https://www.planalto.gov.br/ccivil_03/leis/l9610.htm "Lei nº 9.610/1998 — Planalto"
[2]: https://www4.ecad.org.br/noticias/entendendo-os-direitos-autorais-na-musica/ "Ecad — Entendendo os direitos autorais na música"
[3]: https://www.gov.br/pt-br/servicos/solicitar-o-registro-de-marca-de-produto-ou-servico "Gov.br — Solicitar o registro de marca"
[4]: https://www.gov.br/inpi/pt-br/servicos/marcas/guia-basico "INPI — Guia Básico de Marcas"
[5]: https://www.gov.br/anpd/pt-br/centrais-de-conteudo/materiais-educativos-e-publicacoes/guia-orientativo-para-definicoes-dos-agentes-de-tratamento-de-dados-pessoais-e-do-encarregado "ANPD — Guia sobre agentes de tratamento e encarregado"

[6]: https://www.boe.es/buscar/act.php?id=BOE-A-1975-26928 "BOE — Convenio España–Brasil para evitar la doble imposición"
[7]: https://www.aepd.es/derechos-y-deberes/cumple-tus-deberes/medidas-de-cumplimiento/garantias-transferencias-datos-personales "AEPD — Garantías para transferencias internacionales"

## 10. Consumidor, email y pagos en la operación brasileña

El Código de Defensa del Consumidor exige información clara, protección contra publicidad engañosa y condiciones comprensibles. El Decreto 7.962/2013 exige que el comercio electrónico muestre proveedor, características, precio, condiciones de pago, entrega, restricciones, resumen del contrato, corrección de errores, confirmación, contrato conservable, atención electrónica y medios claros para el arrepentimiento [8] [9].

Para email y comunicaciones comerciales, Duck Hub debe separar mensajes transaccionales de marketing. El consentimiento debe registrar finalidad, versión, fecha y origen; la baja debe ser gratuita, visible y procesarse antes de cualquier campaña; y la lista de supresión debe conservarse para no recontactar por error. La orientación del Serpro y una política de privacidad oficial brasileña identifican consentimiento determinado, revocación y oposición, incluido marketing directo [10] [11].

Para Mercado Pago, la integración debe mantener URLs de prueba y producción separadas, credenciales separadas, firma secreta, cuerpo bruto para verificación, consulta del estado en el proveedor, y tratamiento explícito de reembolsos, reclamaciones y chargebacks. El pedido no puede liberar contrato ni descarga por una simple llamada del navegador; debe existir confirmación del proveedor y evento idempotente [12].

### Requisitos verificables de Duck Hub

| Área | Requisito | Evidencia |
|---|---|---|
| Oferta | Proveedor, precio total, licencia, restricciones, disponibilidad y plazo visibles antes de pagar | Snapshot de checkout y contrato |
| Consentimiento | Finalidad, versión, fecha, origen y alcance registrados | Registro de consentimiento |
| Opt-out | Enlace de baja funcional y lista de supresión | Test de baja y evento de auditoría |
| Email transaccional | Solo se envía tras evento de negocio válido | Evento `order.paid` y plantilla versionada |
| Pago | Test/producción separados, firma y consulta de estado | Test de webhook válido, inválido y reintento |
| Reembolso | Estado que bloquea o revierte entrega cuando corresponde | Máquina de estados y registro de proveedor |
| Arrepentimiento | Canal electrónico y confirmación de recepción | Endpoint o procedimiento documentado |
| Conciliación | Pedido interno, evento externo, importe, moneda y fecha comparables | Informe de conciliación |

[8]: https://www.planalto.gov.br/ccivil_03/leis/l8078compilado.htm "Código de Defesa do Consumidor"
[9]: https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2013/decreto/d7962.htm "Decreto 7.962/2013"
[10]: https://www.serpro.gov.br/lgpd/cidadao/seu-consentimento-e-lei "Serpro — Consentimento LGPD"
[11]: https://www.gov.br/mdh/pt-br/acesso-a-informacao/politica-de-privacidade "Política de Privacidade oficial"
[12]: https://www.mercadopago.com.br/developers/pt/docs/checkout-pro/additional-content/notifications/webhooks "Mercado Pago — Webhooks"

## 11. Matriz operativa de pagos

| Fase | Estado Duck Hub | Evidencia externa | Control interno | Responsable |
|---|---|---|---|---|
| Creación de checkout | `pending` | Preferencia/order creada con credencial de ambiente correcto | Guardar `orderId`, importe, moneda, licencia y cliente; no liberar activos | Backend |
| Notificación | Evento recibido | Webhook HTTP POST y tópicos configurados por aplicación [12] | Raw body, firma secreta, `providerEventId`, respuesta rápida e idempotencia | Backend |
| Confirmación | `paid` solo tras consulta | Consultar order/payment y validar estado del proveedor | Comparar importe, moneda, orderId y estado; registrar actividad | Backend + productor |
| Entrega | Contrato/descarga pendiente de aprobación | Requisito de contrato conservable y condiciones de oferta [9] | Crear contrato, URL firmada corta y actividad; aprobación humana si implica licencia exclusiva | Productor |
| Cancelación | `cancelled` o `expired` | Solo para pagos no aprobados o estados elegibles; expiración según medio [13] | Bloquear entrega y registrar motivo/fecha | Backend |
| Reembolso | `refunded` o `partially_refunded` | Total/parcial; después de captura; ventana y saldo según proveedor [13] [14] | Revertir o limitar entrega; registrar importe, motivo y referencia externa | Productor + backend |
| Chargeback/reclamación | `dispute` | Mercado Pago ofrece eventos y gestión de contestaciones [12] | Congelar nueva entrega, abrir tarea y conservar evidencia mínima | Productor |
| Conciliación | `reconciled` o `exception` | Reporte de dinero en cuenta y opción SFTP [15] | Comparar ID externo, importe, moneda, fecha, tasas y neto; excepción manual | Finanzas |

La regla es **proveedor primero, navegador nunca**: una redirección o botón de éxito no confirma el cobro. El sistema solo cambia a `paid` tras validar el evento y consultar el proveedor. Un reembolso o chargeback puede cambiar la capacidad de entrega y debe ser visible en la auditoría.

[13]: https://www.mercadopago.com.br/developers/pt/docs/checkout-pro/additional-settings/refunds-and-cancellations "Mercado Pago — Reembolsos y cancelaciones"
[14]: https://www.mercadopago.com.br/developers/pt/docs/checkout-api-orders/refunds-cancellations "Mercado Pago — Orders, reembolsos y cancelaciones"
[15]: https://www.mercadopago.com.br/developers/pt/docs/links-and-debts/conciliation "Mercado Pago — Conciliación"

## 12. Mercado musical brasileño y oportunidad Duck

La UBC, al resumir datos de IFPI y Pro-Música publicados el 18 de marzo de 2026, reporta que el mercado brasileño de música grabada alcanzó aproximadamente R$ 3,958 mil millones en 2025, con crecimiento interanual de 14,1 %, situando a Brasil como el octavo mercado mundial. El streaming representó la locomotora del crecimiento y el segmento digital brasileño alcanzó aproximadamente R$ 3,4 mil millones; el artículo también destaca el aumento de derechos conexos y el crecimiento del vinilo [16].

La oportunidad de Duck no debe depender de una sola fuente de streaming. El producto puede capturar valor en cinco capas: servicios de producción y mezcla; beats con licencias diferenciadas; paquetes de stems y entregas seguras; contratos y administración documental; y herramientas operativas para clientes recurrentes. La automatización debe reducir tiempo administrativo, no sustituir el criterio creativo ni prometer ingresos inevitables.

El mismo informe alerta sobre fraude de streaming y uso de obras para entrenar IA sin permiso o transparencia. Para Duck, esto refuerza la necesidad de hojas de derechos por beat, registro de versiones, watermark en previews, trazabilidad de entregas, cláusulas de uso de IA y bloqueo de liberación cuando la titularidad no esté clara.

[16]: https://www.ubc.org.br/publicacoes/noticias/quatro-bi-mercado-musical-brasileiro-oitavo-mundo "UBC — mercado musical brasileño 2025"

## 13. Licencias de beats: modelo operativo verificable

Las guías de BeatStars, Airbit y TuneCore coinciden en que Duck no debería presentar un beat como una venta absoluta por defecto, sino como una licencia con derechos de uso definidos. Airbit distingue licencias no exclusivas y exclusivas, y explica que la licencia no exclusiva permite reutilizar el mismo instrumental con varios artistas, con límites configurables sobre copias, presentaciones, streams, duración y archivos entregados. También señala que una estructura habitual ofrece varios niveles, desde archivo comprimido hasta WAV y stems, con precios orientativos publicados por la propia plataforma de aproximadamente USD 10–40 para niveles bajos y USD 70–150 para niveles altos no exclusivos [17].

BeatStars describe una modalidad regular/no exclusiva, una exclusiva y una gratuita de prueba no comercial. Su guía advierte que las plantillas son orientación y no asesoría legal. La modalidad no exclusiva mantiene el control del productor sobre el beat y puede generar ingresos recurrentes; la exclusiva aumenta el precio porque limita futuras licencias del instrumental, aunque deben preservarse y documentarse los derechos de compradores anteriores [18].

TuneCore explica la separación entre dos activos: la grabación sonora o master y la composición subyacente. Sus rangos orientativos para el mercado de plataformas sitúan licencias no exclusivas alrededor de USD 30–150 y exclusivas alrededor de USD 300–1.000 o más, pero deben tratarse como benchmarks de plataformas, no como precios recomendados para Duck ni como equivalentes directos al mercado brasileño [19].

La implementación de Duck Hub debe modelar por licencia: territorio, plazo, medios, número de streams o copias, número de videoclips, stems incluidos, atribución, porcentaje de composición, derechos sobre el master, Content ID, sincronización, posibilidad de sublicencia, tratamiento de compradores anteriores, política de reembolso y firma/aceptación. No debe generarse un contrato final ni liberarse un archivo de alta calidad cuando falte la cadena de titularidad o existan samples/loops sin licencia verificable.

[17]: https://help.airbit.com/hc/en-us/articles/24166157589657-Licensing-Overview "Airbit — Licensing Overview"
[18]: https://blog.beatstars.com/posts/understanding-music-licenses-in-beatstars-studio "BeatStars — Music Licenses in Studio"
[19]: https://www.tunecore.com/guides/beat-licensing-101 "TuneCore — Beat Licensing 101"

## 14. Servicios de producción y automatización: benchmark operativo

SoundBetter organiza la oferta alrededor de productores, beat makers, mezcla, mastering, composición, vocalistas e instrumentistas, y muestra un flujo de proyecto basado en briefing, propuestas, contratación, financiación y liberación del pago al completar el trabajo [20]. Su bolsa de trabajos contiene solicitudes de producción de canciones, mezcla, mastering, instrumentales, álbumes y colaboraciones, lo que sirve como señal cualitativa de que los paquetes de Duck deben ser comprensibles por entregable y no solo por “horas de estudio” [21].

Fiverr agrupa música y audio en producción, composición, beat making, mezcla/mastering, edición, afinación vocal, jingles, canciones personalizadas, sonido para anuncios, remix, diseño sonoro, samples y plugins. También recomienda que el cliente defina briefing, deadline, presupuesto, materiales de entrada y entregables antes de ordenar [22]. No se deben copiar sus precios ni asumir que la presencia de una categoría equivale a demanda local; sí puede reutilizarse la taxonomía para estructurar el catálogo de Duck.

La conclusión accionable es una escalera de paquetes: diagnóstico/briefing; beat o instrumental con licencia; producción de canción; mezcla y master; paquete de lanzamiento con stems y assets; y retainer mensual con capacidad reservada. Duck Hub debe convertir cada paquete en una plantilla de proyecto con checklist de archivos de entrada, alcance, número de revisiones, fecha objetivo, entregables, derechos, estado de pago y criterio de aceptación. Las automatizaciones de mayor valor son la creación idempotente del proyecto tras propuesta aceptada, recordatorios de material faltante, registro de revisión, protección de archivos, notificación solo después de pago confirmado y liberación controlada tras aceptación.

[20]: https://soundbetter.com/ "SoundBetter — categorías y flujo de contratación"
[21]: https://soundbetter.com/jobs "SoundBetter — bolsa de trabajos de producción musical"
[22]: https://www.fiverr.com/categories/music-audio "Fiverr — categorías y preparación de proyectos de música y audio"

## 15. Benchmarks observables y límites de comparabilidad

Los benchmarks públicos no constituyen una tarifa oficial para Recife. En un perfil brasileño de SoundBetter, un proveedor publica USD 250 para arreglo y mezcla, USD 550 para producción completa con mezcla y master, USD 150 para mezcla, USD 30 para master y un plazo de siete días hábiles para la primera versión [23]. Otro perfil de SoundBetter publica USD 400 por mezcla, USD 70 por master, USD 350 por mezcla y master, cuatro a seis días de entrega y tres revisiones [24]. Estos datos son ofertas individuales, dependen de reputación, género, alcance y plataforma, y no deben convertirse automáticamente a BRL ni copiarse sin validar costes, impuestos y capacidad de Duck.

La página de categoría de Fiverr muestra más de 6.300 resultados en mezcla/mastering y precios de entrada observables entre USD 10 y USD 135 en varios anuncios, con entregas de aproximadamente uno a tres días en algunos casos [25]. La dispersión revela un mercado estratificado, no un precio de equilibrio: las ofertas de entrada suelen tener límites de stems, duración, revisiones o profundidad de servicio que no son comparables con producción completa. El dato de volumen de resultados se interpreta como disponibilidad de oferta en la plataforma, no como demanda pagadora de Recife.

Un artículo comercial de una agencia de producción publica rangos de USD 500–1.500 por single de servicio completo, USD 1.800–4.000 por EP de cuatro canciones, USD 3.500–8.000 por álbum de ocho canciones y USD 300–800 por instrumental preparado para sincronización [26]. Al provenir de un proveedor que vende esos servicios, su evidencia tiene sesgo comercial y debe usarse como benchmark de alcance y empaquetado, no como estudio independiente de mercado. Aun así, refuerza que el paquete completo debe especificar composición, producción, mezcla, master, stems/ADM, revisiones, plazos, splits, metadatos y derechos.

Para Duck, la decisión correcta es probar tres bandas en BRL mediante ventas reales: una entrada limitada por alcance, una producción intermedia y un paquete completo con mayor acompañamiento. Cada banda debe registrar horas, costes directos, revisiones, reembolsos, conversión y margen. Solo después de diez o más propuestas comparables debería ajustarse el precio; los benchmarks en USD sirven para formular hipótesis, no para garantizar rentabilidad.

[23]: https://www.soundbetter.com/profiles/645030-meucci "SoundBetter — perfil brasileño Meucci"
[24]: https://www.soundbetter.com/profiles/534510-audiob "SoundBetter — perfil AudioB"
[25]: https://www.fiverr.com/categories/music-audio/mixing-mastering "Fiverr — categoría Mixing & Mastering"
[26]: https://audiomixingmastering.com/blog/music-production-agency-2025-what-it-does-costs-how-to-pick-one "Audio Mixing Mastering — rangos publicados por proveedor"

## 16. Evidencia de demanda versus oferta

La evidencia de demanda sectorial debe separarse de los listados de proveedores. ABMI reportó, en una investigación basada en datos de plataformas y entrevistas con 60 empresas del ecosistema independiente, que el 53,5 % de los artistas que pasaron por el Top 200 de Spotify en su muestra eran independientes y que el 50 % de la facturación de las empresas investigadas procedía de plataformas digitales [27]. Es una evidencia histórica de participación y digitalización del segmento independiente, no una medición actual de pedidos de mezcla de Duck ni una garantía de conversión.

La Pro-Música Brasil reportó para 2025 R$ 3,958 mil millones de facturación fonográfica, R$ 3,4 mil millones de ingresos digitales y una expansión de 14,1 %. El informe también señala aumento de derechos conexos y que las inversiones de las productoras fonográficas incluyen descubrimiento, desarrollo, producción, marketing y distribución [28]. Esto respalda demanda estructural para obras, producción y administración de derechos, pero no prueba por sí solo que un artista de Recife pagará a Duck.

El U.S. Commercial Service, en una nota de inteligencia comercial de noviembre de 2025, describe un sector brasileño fragmentado con aproximadamente 19.530 empresas registradas, 88 % microempresas y casi la mitad como empresas unipersonales. La misma fuente identifica oportunidades para soluciones de software, gestión de derechos, monetización, micropagos, analytics y distribución cloud, y señala que el mercado grabado está impulsado por streaming [29]. Por ser una fuente de promoción comercial y no un censo de clientes de Duck, se usa como señal de estructura y necesidades, no como estimación de TAM/SAM/SOM.

La conclusión accionable por tipo de servicio es: para **producción y mezcla**, validar la demanda mediante briefs y propuestas pagadas de artistas independientes; para **beats y licencias**, medir descargas de preview, solicitudes de stems, conversión por tier y conflictos de derechos; para **administración**, vender paquetes de metadata, split sheets y entregas porque el crecimiento digital aumenta la necesidad de trazabilidad; y para **software**, no vender a terceros hasta que Duck Hub registre uso interno, tiempos ahorrados y errores evitados. Los marketplaces aportan evidencia de oferta y formatos, mientras que ABMI, Pro-Música y la nota de ITA aportan señales de estructura y demanda sectorial; ninguno sustituye un experimento comercial local.

[27]: https://abmi.com.br/artistas-independentes-sao-53-nas-paradas-de-sucesso-do-streaming-revela-pesquisa-da-abmi/ "ABMI — Pesquisa do Mercado Brasileiro da Música Independente"
[28]: https://pro-musicabr.org.br/2026/03/18/mercado-fonografico-brasileiro-cresceu-14-em-2025-e-faturou-r-4-bilhoes/ "Pro-Música Brasil — mercado fonográfico 2025"
[29]: https://www.trade.gov/market-intelligence/brazil-media-and-entertainment "U.S. Commercial Service — Brazil Media and Entertainment"
