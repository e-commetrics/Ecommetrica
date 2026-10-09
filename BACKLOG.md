# Backlog

Pendientes y puntos por revisar.

## Pendiente

- [ ] **Páginas explicativas con media pantalla vacía** (`/ga4`, `/meta-graph-api`, `/google-business-profile`, `/vpat` y sus versiones `/en/...`).
  `src/components/FeatureExplainerPage.tsx` limita el contenido a `max-w-3xl` dentro de `shell` (hasta 112rem), así que en pantallas anchas la mitad derecha queda en blanco.
  Opciones:
  - Columna lateral fija con los planes que incluyen la característica (usando `learnMoreSlug` en las filas de `matrix` de `src/lib/pricing.ts`) y un CTA a planes o contacto.
  - Centrar el contenido.

## Por revisar

- [ ] **Escalera v1.2 (2026-10-09): puntos abiertos** (matriz Tijuana-ES / San Diego-EN ya aplicada en `src/lib/pricing.ts`).
  - `N0` / `N1` aparecen tal cual en la fila "Renovación à la carte" de Escala y Cúspide (`Plan.renewal`). Confirmar qué significan y ponerles nombre; el cliente no los entiende.
  - Tarifa de horas de código: el PDF de Tijuana dice $62/h y el de San Diego no pone tarifa, así que solo se muestra para MX (`codingHourRate`). En `packages.ts` el bloque de 10 h en US cuesta $1,100 ($110/h).
  - `googleBusinessProfilePage` (dict.ts): título y meta ya dicen "Arranque", pero el cuerpo sigue diciendo "en este nivel ya estás convirtiendo tráfico en clientes".
  - Revisar `src/lib/faq.ts` por menciones de precios o planes (no se tocó).
  - El ahorro de 56% a 72% se tomó tal cual del PDF; falta la lista de precios por servicio que lo respalda.
  - Duda de contenido en el PDF: Arranque en MX incluye "Declaración de accesibilidad" sin "Sitio accesible ADA/WCAG" (este empieza en Tracción). En US se resuelve dando ADA desde Arranque.
  - Decidir si se agrega un selector visible de mercado (Tijuana / San Diego); hoy la región sale solo de la geolocalización (`RegionProvider`) y por defecto es MX.
  - Probar en navegador la versión US (precios $790 y ★); solo se verificó la lógica con un script.

- [ ] **ESLint roto**: `npm run lint` falla con "Converting circular structure to JSON" (plugin `react`, desajuste entre `eslint-config-next` y `eslint`). Sin lint, los cambios solo se validan con `tsc` y `next build`.
- [ ] **Probar con teclado** la tarjeta de plan del configurador (`PackagesConfigurator.tsx`, `PlanStep`): Tab, Enter y Espacio sobre "Ver todo lo incluido", "Saber más" y "Seleccionar". Se corrigió leyendo el código, no en un navegador.
- [ ] **Mensaje del commit `62449a1`** dice que VPAT se "refactorizó" sobre `FeatureExplainerPage`, pero `/vpat` y `vpatPage` no existían antes; es una página nueva. El commit ya está en `production` y `qa`, así que solo queda como nota.
- [ ] **Cambios sin commit** de la revisión del 2026-10-02: `scripts/generate-seo.ts` (sitemap con `/packages`, `/ga4`, `/meta-graph-api`, `/google-business-profile`), `PackagesConfigurator.tsx` (botón real en vez de `role="button"`) y `Planes.tsx` (nota de la ★ en la home). Falta commit y PR a `qa`.
