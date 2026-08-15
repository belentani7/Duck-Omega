# Inventario exhaustivo y curado de fuentes Duck

**Fecha:** 15 de agosto de 2026. **Propósito:** registrar origen, relación, estado de verificación y decisión de reutilización sin importar material sensible por defecto. El volcado automático previo se conserva en `docs/INVENTARIO_FUENTES_EXHAUSTIVO_RAW.md`.

> Las etiquetas `hecho`, `idea`, `sensible-no-reutilizar` y `pendiente-de-revisión` describen el estado de trazabilidad, no la calidad o la verdad absoluta del material.

## Fuentes locales y corpus recibido

| Fuente | Tipo | Origen | Estado | Clasificación | Decisión de reutilización |
|---|---|---|---|---|---|
| `/home/ubuntu/upload/pasted_content*.txt` | Chats/contexto | Adjuntos recibidos | Leídos y normalizados parcialmente | hecho + idea; revisar sensibilidad por archivo | Usar solo resúmenes y requisitos ya trasladados al código |
| `/home/ubuntu/upload/chat-DesenvolvimentoProfissionalcomIA.txt` | Chat profesional | Adjuntos recibidos | Leído para principios técnicos | idea | Reutilizar como criterios de calidad, no como datos personales |
| `/home/ubuntu/upload/README.md` | Documento de entrega | Adjuntos recibidos | Leído | hecho declarado | Reutilizar como referencia narrativa, contrastando con el código |
| `/home/ubuntu/upload/INVENTARIO-COMPLETO-DEFINICIONES.txt` | Definiciones | Adjuntos recibidos | Leído/contrastado parcialmente | idea | Reutilizar vocabulario y requisitos, no afirmar ejecución no verificada |
| `/home/ubuntu/upload/10-ZIPS.zip` | Paquete comprimido | Adjuntos recibidos | Extraído en `audit_unpack` | pendiente-de-revisión | No ejecutar; usar solo archivos auditados y clasificados |
| `/home/ubuntu/audit_unpack/01-STUDIO-OS` | Proyecto/referencia | Corpus extraído | Auditado como referencia | idea | Reutilizar patrones de CRM, proyectos, sesiones y recursos |
| `/home/ubuntu/audit_unpack/02-ECOSYSTEM` | Proyecto full stack previo | Corpus extraído | Auditado parcialmente | idea + pendiente-de-revisión | Reutilizar aprendizajes; no copiar secretos ni datos |
| `/home/ubuntu/audit_unpack/03-TOOLKIT-GEMA-1` | HTML narrativo | Corpus extraído | Auditado visualmente | idea | Reutilizar narrativa/branding, no sustituir software operativo |
| `/home/ubuntu/audit_unpack/04-STUDIO-LOCAL` | Herramientas locales | Corpus extraído | Auditado como referencia | idea | Reutilizar catálogo de recursos y flujos offline como inspiración |
| `/home/ubuntu/audit_unpack/05-HERRAMIENTAS-PREMIUM` | Manuales/prompts | Corpus extraído | Revisado | idea | Reutilizar conceptos, no credenciales ni instrucciones no verificadas |
| `/home/ubuntu/audit_unpack/06-EXPERIENCIA-INMERSIVA` | HTML/branding | Corpus extraído | Auditado con manifest y exclusiones | idea | Reutilizar capa inmersiva y proveniencia, no activos sin licencia |
| `/home/ubuntu/audit_unpack/08-ENVIO-GEMA-01` | Paquete de entrega | Corpus extraído | Hash/QA revisados | hecho declarado + idea narrativa | Usar como referencia del protocolo, no como prueba de funcionalidades actuales |
| `/home/ubuntu/audit_unpack/11-PORTAL-CLIENTES` | Portal previo | Corpus extraído | Revisado como fuente de módulos | idea + pendiente-de-revisión | Reutilizar dominio CRM/portal; excluir `.env`, bases, logs y seed data |
| `/home/ubuntu/audit_unpack/12-REFERENCIAS-VISUALES` | Imágenes/logo | Corpus extraído | Origen individual pendiente | pendiente-de-revisión | No publicar hasta verificar derechos/proveniencia |

## Google Drive y Gmail

| Fuente | Tipo | Origen | Estado | Clasificación | Decisión de reutilización |
|---|---|---|---|---|---|
| `🎉 LUPA - Entrega Final del Proyecto.md [93ECE026].url.terabox.uploading.cfg` | Registro text/plain, 847 bytes | Google Drive, ID `1Eio7F1CNXTkIeq7olJWlhlpasdcKiMyA` | Metadatos revisados; contenido no importado | pendiente-de-revisión | No reutilizar hasta identificar el destino y confirmar seguridad |
| Hilo `Arte que Veste`, 27/06/2026 | Email + posible `loja.zip` | Gmail, thread `19f0a7fe31cda200` | Encabezado/snippet revisados | hecho de existencia + pendiente de contenido | No importar el ZIP; conservar referencia y pedir autorización específica |
| Hilo `conjunto`, 05/08/2026 | Email autoenviado con 16 adjuntos | Gmail, thread `19f44e2b48bef684` | Encabezado, snippet y nombres revisados | sensible-no-reutilizar + idea | No importar `.eml`, chats, ZIP, imágenes ni contactos |
| Bienvenida de Bandcamp | Email de servicio | Gmail | Detectado por búsqueda; no leído en profundidad | hecho de existencia | No reutilizar; solo señal contextual de canal |
| Avisos GitHub/OAuth/tokens | Seguridad/credenciales | Gmail | Detectados y excluidos | sensible-no-reutilizar | Nunca copiar, leer en profundidad, publicar o usar como fuente de producto |

## Repositorios y webs relacionados

| Fuente | Tipo | Origen | Estado | Clasificación | Decisión de reutilización |
|---|---|---|---|---|---|
| `belentani7/DUCK` | Repositorio GitHub | Cuenta GitHub del usuario | Localizado; destino no confirmado | pendiente-de-revisión | No subir ni modificar sin confirmación |
| `belentani7/Duck-green` | Repositorio GitHub público | Cuenta GitHub del usuario | Localizado; repositorio previo | idea + pendiente-de-revisión | Referencia visual potencial; no asumir que es destino |
| `belentani7/Duck-Omega` | Repositorio GitHub público | Cuenta GitHub del usuario | Localizado; repositorio previo | idea + pendiente-de-revisión | Referencia potencial; no asumir ownership operativo |
| `belentani7/Duck-Europe` | Repositorio GitHub público | Cuenta GitHub del usuario | Localizado | idea + pendiente-de-revisión | Referencia España–Brasil potencial; no modificar |
| `belentani7/Duck-Glassmorphism-` | Repositorio GitHub público | Cuenta GitHub del usuario | Localizado | idea + pendiente-de-revisión | Referencia visual; no modificar |
| `belentani7/heyduck` | Repositorio GitHub público | Cuenta GitHub del usuario | Localizado | pendiente-de-revisión | Revisar solo si el usuario confirma relación |
| `belentani7/belentani_Omega` | Repositorio GitHub público | Cuenta GitHub del usuario | Localizado como ecosistema de artista | idea | Referencia de posicionamiento; no copiar material automáticamente |
| `belentani7/Netlify` | Repositorio GitHub público | Cuenta GitHub del usuario | Localizado; descripción genérica | pendiente-de-revisión | No usar como destino por defecto |
| `duck-hub` / preview Manus | Web/app actual | Proyecto activo | Verificado en navegador y build | hecho | Núcleo operativo reutilizable y mantenible |
| `audit_unpack/*` HTML locales | Webs/referencias locales | Corpus recibido | Verificados por ruta y auditorías | idea | No publicar como webs separadas; usar solo aprendizajes clasificados |
| URLs oficiales de Planalto, ANPD, AEPD, INPI, BOE, ECAD, Mercado Pago, ABMI, Pro-Música, UBC, Airbit, BeatStars, TuneCore, SoundBetter, Fiverr e ITA | Fuentes públicas | Investigación web | Consultadas y citadas en dossier | hecho externo | Mantener enlaces y citas; no copiar contenido protegido más allá del análisis |
| URLs de dependencias, localhost, CDN y documentación técnica detectadas en corpus | Referencias técnicas | Archivos extraídos | No relacionadas directamente con Duck | pendiente-de-revisión | Excluir del inventario comercial y del producto salvo dependencia explícita |

## Reglas de seguridad y publicación

No se importan al repositorio conversaciones privadas, adjuntos `.eml`, chats de WhatsApp, vCards, números telefónicos, capturas personales, bases de datos, `.env`, tokens, cookies, credenciales ni logs. Los activos visuales se publican solo tras verificar proveniencia y licencia. El destino GitHub sigue pendiente de confirmación; el token compartido previamente debe revocarse antes de cualquier subida. El inventario no autoriza por sí mismo la publicación o cesión de ningún activo.

## Detalle individual de hilos y adjuntos relevantes

| Fuente individual | Tipo | Origen | Estado | Clasificación | Justificación | Decisión |
|---|---|---|---|---|---|---|
| Hilo `Arte que Veste` / `19f0a7fe31cda200` | Email | Gmail | Encabezado y snippet revisados | hecho de existencia + pendiente | Menciona `loja.zip` y proyecto enviado a Duck | No importar ZIP sin autorización |
| Hilo `conjunto` / `19f44e2b48bef684` | Email | Gmail | Encabezado, snippet y adjuntos listados | sensible-no-reutilizar | Paquete autoenviado con chats y material mixto | Conservar solo referencia |
| `Nem tao pronto assim.eml` | Email adjunto | Gmail/conjunto | Nombre identificado; cuerpo no leído | sensible-no-reutilizar | Conversación privada potencial | No copiar |
| `Acho que esta bom pra voce testar..eml` | Email adjunto | Gmail/conjunto | Nombre identificado; cuerpo no leído | sensible-no-reutilizar | Material de prueba no clasificado | No copiar |
| `Demo packed and saved on cloud server encripted as eternal love.eml` | Email adjunto | Gmail/conjunto | Nombre identificado; cuerpo no leído | pendiente-de-revisión | Puede contener instrucciones o enlaces | No ejecutar ni importar |
| `Chat ex.eml` | Email adjunto | Gmail/conjunto | Nombre identificado; cuerpo no leído | sensible-no-reutilizar | Conversación privada | No copiar |
| `Thank you for reporting abuse on Google Cloud Platform.eml` | Aviso de servicio | Gmail/conjunto | Nombre identificado | sensible-no-reutilizar | Comunicación de cuenta/seguridad | Excluir |
| `Chat de WhatsApp con +34 673 17 57 44.eml` | Chat adjunto | Gmail/conjunto | Nombre identificado; no leído | sensible-no-reutilizar | Contiene contacto personal | Excluir |
| `Chat de WhatsApp con Thiago Luiz.eml` | Chat adjunto | Gmail/conjunto | Nombre identificado; no leído | sensible-no-reutilizar | Conversación de tercero | Excluir |
| `Solicitud de compartir Plan Belentani Digimon Nivel 5.eml` | Notificación | Gmail/conjunto | Nombre identificado | pendiente-de-revisión | Puede referir a un archivo compartido | No abrir sin relación confirmada |
| `ChatGPT Image 7 jul 2026, 06_45_08.png` | Imagen | Gmail/conjunto | Nombre identificado; no descargada | pendiente-de-revisión | Proveniencia y derechos no verificados | No publicar |
| `Chat de WhatsApp con Dominic Montalban.txt` | Chat adjunto | Gmail/conjunto | Nombre identificado; no leído | sensible-no-reutilizar | Conversación privada | Excluir |
| `Chat de WhatsApp con Thiago Luiz.txt` | Chat adjunto | Gmail/conjunto | Nombre identificado; no leído | sensible-no-reutilizar | Conversación privada | Excluir |
| `Chat de WhatsApp con +34 673 17 57 44.txt` | Chat adjunto | Gmail/conjunto | Nombre identificado; no leído | sensible-no-reutilizar | Contacto personal | Excluir |
| `Chat de WhatsApp con Mikko Suop Whats.txt` | Chat adjunto | Gmail/conjunto | Nombre identificado; no leído | sensible-no-reutilizar | Conversación privada | Excluir |
| `Chat de WhatsApp con +34 673 17 57 44.zip` | ZIP de chat | Gmail/conjunto | Nombre identificado; no abierto | sensible-no-reutilizar | Contenido privado comprimido | Excluir |
| `Chat de WhatsApp con Thiago Luiz.zip` | ZIP de chat | Gmail/conjunto | Nombre identificado; no abierto | sensible-no-reutilizar | Contenido privado comprimido | Excluir |
| `c362bc7b-d2f3-43ba-88a8-4051f02d0f67.png` | Imagen | Gmail/conjunto | Nombre identificado; no descargada | pendiente-de-revisión | Proveniencia no documentada | No publicar |
| `pasted_content.txt` | Texto/chat | Upload local | Ruta inventariada; uso selectivo | hecho + idea | Requisitos y contexto del chat | Solo fragmentos normalizados |
| `pasted_content_2.txt` | Texto/chat | Upload local | Ruta inventariada; uso selectivo | hecho + idea | Requisitos del producto | Solo fragmentos normalizados |
| `pasted_content_3.txt` | Texto/chat | Upload local | Ruta inventariada; uso selectivo | hecho + idea | Requisitos y narrativa | Solo fragmentos normalizados |
| `pasted_content_4.txt` | Texto/chat | Upload local | Ruta inventariada; uso selectivo | idea | Material de trabajo | No importar literalmente |
| `pasted_content_5.txt` | Texto/chat | Upload local | Ruta inventariada; uso selectivo | hecho + idea | Requisitos y decisiones | Solo decisiones verificadas |
| `pasted_content_6.txt` | Texto/chat | Upload local | Ruta inventariada; uso selectivo | idea + sensible | Puede contener material privado | No publicar contenido bruto |
| `pasted_content_7.txt` | Texto/chat | Upload local | Ruta inventariada; uso selectivo | idea | Narrativa y producto | Reutilizar solo resumen |
| `pasted_content_8.txt` | Texto/chat | Upload local | Ruta inventariada; uso selectivo | hecho + idea | Alcance operativo | Contrastar con código |
| `pasted_content_9.txt` | Texto/chat | Upload local | Ruta inventariada; uso selectivo | idea | Exploración de producto | No publicar literalmente |
| `pasted_content_10.txt` | Texto/chat | Upload local | Ruta inventariada; uso selectivo | idea + sensible | Contexto mixto | Excluir datos personales |
| `pasted_content_11.txt` | Texto/chat | Upload local | Ruta inventariada; uso selectivo | idea | Decisiones de experiencia | Solo requisitos verificados |
| `pasted_content_12.txt` | Texto/chat | Upload local | Ruta inventariada; uso selectivo | hecho + idea | Protocolo y entrega | Reutilizar como referencia |
| `pasted_content_13.txt` | Texto/chat | Upload local | Ruta inventariada; uso selectivo | idea | Material conceptual | No publicar literalmente |
| `pasted_content_14.txt` | Texto/chat | Upload local | Ruta inventariada; uso selectivo | idea | Material conceptual | Solo resumen normalizado |
| `pasted_content_15.txt` | Texto/chat | Upload local | Ruta inventariada; uso selectivo | hecho + idea | Entregables y alcance | Contrastar con build |
| `pasted_content_16.txt` | Texto/chat | Upload local | Ruta inventariada; uso selectivo | pendiente-de-revisión | Origen contextual no revalidado | No reutilizar sin revisión |
| `chat-DesenvolvimentoProfissionalcomIA.txt` | Chat profesional | Upload local | Leído parcialmente | idea | Principios técnicos y de proceso | Reutilizar criterios, no datos |
| `README.md` | Documento | Upload local | Leído | hecho declarado | Instrucciones de entrega | Usar como referencia, no prueba |
| `INVENTARIO-COMPLETO-DEFINICIONES.txt` | Definiciones | Upload local | Leído parcialmente | idea | Vocabulario y alcance | Normalizar antes de usar |
| `Untitled2(2).png` | Imagen | Upload local | Archivo localizado; provenance pendiente | pendiente-de-revisión | Origen/licencia no confirmados | No publicar |
| `copilot_image_1780517769334.jpeg` | Imagen | Upload local | Archivo localizado; provenance pendiente | pendiente-de-revisión | Imagen generada o recibida sin ficha | No publicar |
| `file_000000000fb88210ad871e5f263f3cac.jpg` | Imagen | Upload local | Archivo localizado; provenance pendiente | pendiente-de-revisión | Origen no documentado | No publicar |
| `file_000000005f3071f4b54a4cb5d66452b8.jpg` | Imagen | Upload local | Archivo localizado; provenance pendiente | pendiente-de-revisión | Origen no documentado | No publicar |
| `file_00000000447871f49a4cc68abd4b4f62.jpg` | Imagen | Upload local | Archivo localizado; provenance pendiente | pendiente-de-revisión | Origen no documentado | No publicar |
| `file_000000007a3081f4a91766fc0439581d.png` | Imagen | Upload local | Archivo localizado; provenance pendiente | pendiente-de-revisión | Origen no documentado | No publicar |
| `file_00000000eeec8246a3b99d9b489d6dfb(1).png` | Imagen | Upload local | Archivo localizado; provenance pendiente | pendiente-de-revisión | Origen no documentado | No publicar |
| `file_000000003d507246940e08ea63626196.png` | Imagen | Upload local | Archivo localizado; provenance pendiente | pendiente-de-revisión | Origen no documentado | No publicar |
| `nnn.png` | Imagen | Upload local | Archivo localizado; provenance pendiente | pendiente-de-revisión | Origen no documentado | No publicar |
| `ChatGPTImage13ago2026,02_56_40.png` | Imagen | Upload local | Archivo localizado; provenance pendiente | pendiente-de-revisión | Asset generado/recibido no fichado | No publicar |
| `ChatGPTImage13ago2026,03_02_26.png` | Imagen | Upload local | Archivo localizado; provenance pendiente | pendiente-de-revisión | Asset generado/recibido no fichado | No publicar |
| `ChatGPTImage13ago2026,03_02_33.png` | Imagen | Upload local | Archivo localizado; provenance pendiente | pendiente-de-revisión | Asset generado/recibido no fichado | No publicar |
| `ChatGPTImage13ago2026,03_10_24.png` | Imagen | Upload local | Archivo localizado; provenance pendiente | pendiente-de-revisión | Asset generado/recibido no fichado | No publicar |
| `ChatGPTImage14ago2026,13_35_01.png` | Imagen | Upload local | Archivo localizado; provenance pendiente | pendiente-de-revisión | Asset generado/recibido no fichado | No publicar |
| `ChatGPTImage14ago2026,13_35_08.png` | Imagen | Upload local | Archivo localizado; provenance pendiente | pendiente-de-revisión | Asset generado/recibido no fichado | No publicar |
| `ChatGPTImage14ago2026,13_35_15.png` | Imagen | Upload local | Archivo localizado; provenance pendiente | pendiente-de-revisión | Asset generado/recibido no fichado | No publicar |
| `ChatGPTImage14ago2026,13_35_26.png` | Imagen | Upload local | Archivo localizado; provenance pendiente | pendiente-de-revisión | Asset generado/recibido no fichado | No publicar |
| `ChatGPTImage14ago2026,13_35_32.png` | Imagen | Upload local | Archivo localizado; provenance pendiente | pendiente-de-revisión | Asset generado/recibido no fichado | No publicar |
| `ChatGPTImage14ago2026,13_35_36.png` | Imagen | Upload local | Archivo localizado; provenance pendiente | pendiente-de-revisión | Asset generado/recibido no fichado | No publicar |
| `ChatGPTImage14ago2026,14_31_53.png` | Imagen | Upload local | Archivo localizado; provenance pendiente | pendiente-de-revisión | Asset generado/recibido no fichado | No publicar |
| `belentani-red-artifact.webp` | Imagen/branding | Upload local | Archivo localizado; uso visual existente | pendiente-de-revisión | Provenance/licencia no consolidada | Solo usar si provenance se confirma |
| `duck-green-artifact.webp` | Imagen/branding | Upload local | Archivo localizado; uso visual existente | pendiente-de-revisión | Provenance/licencia no consolidada | Solo usar si provenance se confirma |
| `Gemini_Generated_Image_h043unh043unh043.webp` | Imagen generada | Upload local | Archivo localizado; provenance pendiente | pendiente-de-revisión | Generación sin ficha de derechos | No publicar sin decisión |
| `10-ZIPS.zip` | ZIP | Upload local | Extraído y auditado por rutas | pendiente-de-revisión | Contiene materiales heterogéneos | No distribuir sin selección |

## Tabla curada de webs públicas y webs de Duck

| URL concreta | Origen | Relación con Duck | Estado de verificación | Decisión |
|---|---|---|---|---|
| `https://3000-iqo8gvp14w3x2r2tsfn4j-047e3c2c.us3.manus.computer` | Preview Manus | Duck Hub actual | Verificada en navegador; servidor activo | Web operativa de revisión, no repositorio público |
| `https://github.com/belentani7/DUCK` | GitHub | Candidato por nombre | Localizado; destino no confirmado | No modificar ni subir |
| `https://github.com/belentani7/Duck-green` | GitHub | Referencia visual Duck | Localizado como público | Referencia, no destino |
| `https://github.com/belentani7/Duck-Omega` | GitHub | Referencia narrativa/ecosistema | Localizado como público | Referencia, no destino |
| `https://github.com/belentani7/Duck-Europe` | GitHub | Referencia España–Brasil potencial | Localizado | No modificar |
| `https://github.com/belentani7/Duck-Glassmorphism-` | GitHub | Referencia visual | Localizado | No modificar |
| `https://github.com/belentani7/heyduck` | GitHub | Relación potencial por nombre | Localizado | Pendiente de confirmación |
| `https://github.com/belentani7/belentani_Omega` | GitHub | Ecosistema de artista | Localizado | Referencia, no copiar |
| `https://www.ubc.org.br/publicacoes/noticias/quatro-bi-mercado-musical-brasileiro-oitavo-mundo` | Web pública UBC | Fuente de mercado | Leída y citada | Mantener como cita |
| `https://pro-musicabr.org.br/2026/03/18/mercado-fonografico-brasileiro-cresceu-14-em-2025-e-faturou-r-4-bilhoes/` | Web pública Pro-Música | Fuente sectorial | Leída y citada | Mantener como cita |
| `https://abmi.com.br/artistas-independentes-sao-53-nas-paradas-de-sucesso-do-streaming-revela-pesquisa-da-abmi/` | Web pública ABMI | Fuente de música independiente | Leída y citada | Mantener como cita |
| `https://www.trade.gov/market-intelligence/brazil-media-and-entertainment` | Web pública ITA | Fuente de estructura/demanda | Leída y citada con sesgo declarado | Mantener como cita |
| `https://help.airbit.com/hc/en-us/articles/24166157589657-Licensing-Overview` | Web pública Airbit | Benchmark de licencias | Leída y citada | Mantener como benchmark, no copiar contrato |
| `https://blog.beatstars.com/posts/understanding-music-licenses-in-beatstars-studio` | Web pública BeatStars | Benchmark de licencias | Leída y citada | Mantener como benchmark, no asesoría legal |
| `https://www.tunecore.com/guides/beat-licensing-101` | Web pública TuneCore | Derechos master/composición | Leída y citada | Mantener como fuente educativa |
| `https://soundbetter.com/` | Web pública SoundBetter | Categorías y flujo de contratación | Leída y citada | Mantener como benchmark de oferta |
| `https://www.fiverr.com/categories/music-audio/mixing-mastering` | Web pública Fiverr | Categorías/precios observables | Leída y citada | Mantener con límites de comparabilidad |
