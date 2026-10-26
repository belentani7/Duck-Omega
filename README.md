# Duck-Omega

> Ecosistema artístico y productivo del universo Duck / Zion: identidad visual, sitio
> público y las piezas de producción que giran alrededor.

[![Pages](https://github.com/belentani7/Duck-Omega/actions/workflows/pages.yml/badge.svg)](https://github.com/belentani7/Duck-Omega/actions/workflows/pages.yml)
[![Quality](https://github.com/belentani7/Duck-Omega/actions/workflows/quality.yml/badge.svg)](https://github.com/belentani7/Duck-Omega/actions/workflows/quality.yml)
[![Licencia: MIT](https://img.shields.io/badge/License-MIT-00E676.svg)](./LICENSE)
[![Seguridad](https://img.shields.io/badge/security--policy-brightgreen.svg)](./SECURITY.md)

## Qué es

El contenedor del universo Duck. Reúne la identidad, el sitio público y las herramientas
de producción en un solo lugar, con **Astro** como base y islas interactivas solo donde
hacen falta.

| Ruta | Contenido |
|---|---|
| `src/` | Páginas y componentes Astro del sitio |
| `client/` | Islas React interactivas |
| `server/` | Núcleo de servidor (`server/_core`) |
| `shared/` | Tipos y contratos compartidos |
| `drizzle/` | Capa de datos y esquema |
| `docs/` | Documentación del ecosistema |
| `scripts/` | Utilidades de build y generación |
| `magic/` | Assets y helpers de proyecto |

## Stack

- **Astro 7** — sitio, SSG y enrutado
- **TypeScript** — tipado estricto (`tsc --noEmit`)
- **Drizzle** — capa de datos
- **Tailwind + shadcn/ui** — sistema visual (`components.json`)
- **Vitest** — tests
- **Radix UI** — primitives accesibles

## Puesta en marcha

```bash
pnpm install
pnpm dev        # astro build + server en modo watch
pnpm build      # astro build + bundle ESM del server con esbuild
pnpm test       # vitest run
pnpm check      # tsc --noEmit
pnpm astro:check
pnpm db:push    # drizzle-kit generate && migrate
```

## Estado

`todo.md` lleva lo pendiente. Los repos hermanos (`duck-ecosystem`, `duck-2026`,
`duck-lab`) contienen las piezas especializadas.

## Licencia

[MIT](./LICENSE) — ver el fichero completo. Este README antes decía "sin licencia
declarada": era incorrecto, el `LICENSE` existe y es MIT.

<sub>Duck Omega · by <a href="https://github.com/belentani7">@belentani7</a></sub>
