# Backlog

Pendientes y puntos por revisar.

## Pendiente

- [ ] **Páginas explicativas con media pantalla vacía** (`/ga4`, `/meta-graph-api`, `/google-business-profile`, `/vpat` y sus versiones `/en/...`).
  `src/components/FeatureExplainerPage.tsx` limita el contenido a `max-w-3xl` dentro de `shell` (hasta 112rem), así que en pantallas anchas la mitad derecha queda en blanco.
  Opciones:
  - Columna lateral fija con los planes que incluyen la característica (usando `learnMoreSlug` en `src/lib/pricing.ts`) y un CTA a planes o contacto.
  - Centrar el contenido.

## Por revisar

- [ ] **`serviceCount` desactualizado en `src/lib/pricing.ts`** (decisión de negocio). Tras reordenar los tiers en `62449a1`, el conteo mostrado como "N servicios" y usado en `planPerService` no cambió (MX: 7, 13, 22, 28; US: 9, 16, 26, 34). La suma acumulada de características ahora da MX 7, 16, 25, 31 y US 9, 19, 29, 37. Antes ya diferían por poco (p. ej. Tracción 14 vs 13). Tracción ganó redes sociales y Google Business Profile API sin que subiera su conteo. Decidir si el conteo debe seguir la lista de características o es una cifra comercial independiente, y ajustarlo (esto cambia el costo por servicio que ve el cliente).

- [ ] **ESLint roto**: `npm run lint` falla con "Converting circular structure to JSON" (plugin `react`, desajuste entre `eslint-config-next` y `eslint`). Sin lint, los cambios solo se validan con `tsc` y `next build`.
- [ ] **Probar con teclado** la tarjeta de plan del configurador (`PackagesConfigurator.tsx`, `PlanStep`): Tab, Enter y Espacio sobre "Ver todo lo incluido", "Saber más" y "Seleccionar". Se corrigió leyendo el código, no en un navegador.
- [ ] **Mensaje del commit `62449a1`** dice que VPAT se "refactorizó" sobre `FeatureExplainerPage`, pero `/vpat` y `vpatPage` no existían antes; es una página nueva. El commit ya está en `production` y `qa`, así que solo queda como nota.
- [ ] **Cambios sin commit** de la revisión del 2026-10-02: `scripts/generate-seo.ts` (sitemap con `/packages`, `/ga4`, `/meta-graph-api`, `/google-business-profile`), `PackagesConfigurator.tsx` (botón real en vez de `role="button"`) y `Planes.tsx` (nota de la ★ en la home). Falta commit y PR a `qa`.
