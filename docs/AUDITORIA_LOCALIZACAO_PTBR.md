# Auditoría de localización PT-BR

**Fecha:** 15 de agosto de 2026. **Alcance:** páginas y componentes TypeScript/TSX del Duck Hub, excluyendo primitivas internas de `components/ui` y nombres de imports/identificadores que no se muestran al usuario.

Se ejecutó una búsqueda amplia sobre cadenas residuales como `Discovery`, `Beat Store`, `CATALOG`, estados de pedido, navegación, acciones de archivo y mensajes de error. La entrada narrativa, el Hub, el catálogo público y la central de herramientas ya usan portugués brasileño. Las etiquetas visibles `Paid` y `Pending` de la página de componentes fueron corregidas a `Pago` y `Pendente`, y `Go Home` de la pantalla de error fue corregido a `Voltar ao início`.

La búsqueda también encontró palabras que no son texto visible del producto: nombres de componentes/imports como `Dashboard`, `Mission`, `Tools`, `Project`, `Client`, `Home`, `Search` y `Loading`, además de controles de demostración de `ComponentShowcase.tsx` que no forman parte del flujo operativo principal. `Discovery`, `Beat Store` y `CATALOG` no aparecen como etiquetas visibles residuales en las páginas operativas auditadas. Los nombres técnicos se conservan cuando forman parte de APIs, rutas, tipos o símbolos de código.

La decisión es mantener los identificadores técnicos en inglés cuando no se renderizan y exigir portugués brasileño en todo texto de usuario. Esta evidencia no declara que el sistema esté traducido automáticamente: documenta la búsqueda, las correcciones concretas y las exclusiones justificadas para que futuras cadenas se puedan detectar con el mismo procedimiento.

## Resultado de la búsqueda final

La búsqueda final se ejecutó sobre `client/src`, excluyendo primitivas internas de `components/ui`. No se encontraron como texto visible operativo los términos `Discovery`, `Beat Store`, `CATALOG`, `Paid`, `Pending`, `Cancelled`, `Credit Card`, `Bank Transfer`, `Go Home`, `Open Dialog`, `Open Sheet`, `Open Drawer`, `Open Popover`, `Hover me`, `Add to library`, `Dropdown Menu`, `My Account`, `Right Click Me`, `Hover Card`, `Your session`, `Please wait` ni `Best practices`. Los únicos resultados restantes pertenecen a identificadores, comentarios, mensajes de error de infraestructura o nombres de librerías/API; no se renderizan como interfaz del producto. La página `ComponentShowcase.tsx` conserva nombres propios de frameworks como React, Vue, Angular, Svelte, Next.js, Nuxt y Remix, que no se traducen porque identifican tecnologías.

Las correcciones verificables de esta ronda incluyen `Paid` → `Pago`, `Pending` → `Pendente`, `Go Home` → `Voltar ao início`, `Credit Card` → `Cartão de crédito`, `Bank Transfer` → `Transferência bancária`, `Invoice` → `Fatura`, acciones de diálogo/panel/menú, alertas, estados de procesamiento, descripciones de cuenta y contraseña, y sugerencias del chat. El typecheck, los 20 tests Vitest y el build de producción fueron ejecutados después de las correcciones y pasaron correctamente.

La evidencia reproducible quedó guardada en `docs/AUDITORIA_LOCALIZACAO_RENDERIZADO.txt`, generada por `scripts/extract_visible_text.py`. El extractor inspecciona textos JSX y atributos de interfaz de las páginas navegables y de los componentes auxiliares visibles de autenticación, error y chat; excluye primitivas internas de `components/ui`, documentación de implementación y símbolos no renderizados. La salida limpia separa las secciones por ruta y una búsqueda posterior no devolvió coincidencias para `Primary`, `Destructive`, `Secondary`, `Muted`, `Accent`, `Background`, acciones inglesas, estados ingleses, `Account`, `Password`, `Settings`, `AI ChatBox`, `Accordion`, `Reload Page`, `Please login` o `Login with Manus`. La única coincidencia del patrón fue `pages/Home.tsx`, causada por el nombre técnico de la ruta/archivo, no por texto visible. Los nombres propios de frameworks, marcas, APIs e identificadores internos quedan expresamente excluidos por no ser traducción de interfaz.

La ronda final también corrigió las variantes de tema y botones de `ComponentShowcase.tsx`, los formularios y frutas de ejemplo, las pestañas y breadcrumbs, los estados de tabla, los mensajes de acordeón, los menús y overlays, el chat de IA, el fallback de error y el diálogo de login. La etiqueta visible `Popover` se convirtió en `Janela flutuante`; el token CSS `popover` permanece únicamente en clases técnicas. Se verificó nuevamente el typecheck y el resultado fue cero errores; la suite mantiene 20 pruebas Vitest aprobadas y el build de producción fue ejecutado después de la ronda anterior de correcciones.

### Inventario de exclusiones justificadas

| Cadena mantenida | Justificación |
|---|---|
| `PayPal` | Marca de medio de pago; no se traduce. |
| `React`, `Vue`, `Angular`, `Svelte`, `Next.js`, `Nuxt`, `Remix` | Nombres propios de tecnologías mostradas en un ejemplo de componentes. |
| `@nextjs`, `@vercel`, `@radix-ui/*`, `@stitches/react` | Identificadores de cuentas, marcas o repositorios del ejemplo visual. |
| `WAI-ARIA`, `Markdown`, `LLM`, `tRPC`, `OTP` | Estándares, formatos, sistemas o siglas técnicas reconocibles; no son etiquetas de negocio. |
| `Duck Hub`, `DUCK`, `Studio Hub` | Nombres propios de la marca y del producto. |
| `Home.tsx` | Nombre técnico de archivo que aparece solo en la cabecera de la evidencia, no en la interfaz. |

La evidencia final limpia está en `docs/AUDITORIA_LOCALIZACAO_RENDERIZADO.txt`. Fue generada con `scripts/extract_visible_text.py`, que limita el alcance a páginas navegables y componentes auxiliares visibles, descarta primitivas internas, fragmentos de código y una lista explícita de marcas/tokens técnicos. El control final no devolvió coincidencias inglesas de interfaz; la única coincidencia del patrón correspondió a `pages/Home.tsx` como nombre de ruta de la evidencia.
