# Backlog

Pendientes y puntos por revisar. Actualizado el 2026-10-15.

## Pendiente

- [ ] **Precios US de tres extras** (`src/lib/packages.ts`, `price.us: null`): Video producción, Gestión y producción esencial — Meta y — Google. MX ya tiene precio ($750 / $570 / $670 al mes); en US se muestra "Cotización a solicitud" hasta que el proyecto de precios los confirme.
- [ ] **Privacidad (LFPDPPP), antes de publicar**: revisión de un abogado del aviso de privacidad (`dict.ts`, `privacyIntro` / `privacySections`, es y en) y reenvío funcionando de `privacidad@ecommetrica.com`. El código ya está: casilla de consentimiento obligatoria en `ContactForm.tsx` y aviso reescrito (responsable, datos, finalidades, SMTP, 12 meses de conservación, derechos ARCO en 7 días hábiles).
  - Fuera de este repo: sitios de clientes (Lumbán, Monge, Cesia, Palmas), auditoría de accesibilidad con axe, NVDA y VoiceOver, y la política de retención y borrado del backend (proceso, no código).
  - Subtítulos y transcripciones de los videos de testimonial; no se sabe cuáles ya los llevan.
- [ ] **Probar en navegador la versión US**: precios US, filas solo-US (★) y la nota al pie. Hasta ahora solo se verificó la lógica.

## Por revisar

- [ ] **Ahorro de 56% a 72%** (`Plan.savingPercent`): se tomó tal cual del PDF de la Escalera v1.2; falta la lista de precios por servicio que lo respalda.
- [ ] **Arranque en MX**: incluye "Declaración de accesibilidad" sin "Sitio accesible ADA/WCAG" (este empieza en Tracción en MX; en US viene desde Arranque). Confirmar si es intencional.
- [ ] **Selector visible de mercado** (Tijuana / San Diego): hoy la región sale solo de la geolocalización (`RegionProvider`) y por defecto es MX.
- [ ] **Copy "cada plan incluye todo lo del anterior"** (`pricingPage.notes.inheritance`): puede contradecirse con las filas solo-US (★).
- [ ] **Probar con teclado**: el comparador de `PlanMatrix.tsx` y la tarjeta de plan del configurador (`PlanStep`: "Ver todo lo incluido", "Saber más", "Seleccionar").
- [ ] **ESLint roto**: `npm run lint` falla con "Converting circular structure to JSON" (plugin `react`, desajuste entre `eslint-config-next` y `eslint`). Mientras tanto los cambios se validan con `tsc` y `next build`.

## Decidido / resuelto (oct 2026)

- `N0` / `N1` en la fila de renovación de Escala y Cúspide: se quedan como están (códigos internos, no se explican en el sitio).
- Trabajo por horas y tarifa de código: se quitaron del sitio (información interna).
- `planPerService` sin protección contra un plan sin filas: se deja así.
- Configurador: precios mensuales (plan + extras), total del paquete por plazo, IA Exprés se vende solo y sin extras, crédito IA Exprés → Arranque visible y en el mensaje a ventas.
- `schema.ts`: los planes mensuales publican precio por mes (`UnitPriceSpecification`, `MON`) y su plazo; IA Exprés queda como pago único.
- Páginas explicativas (`/ga4`, `/vpat`, …): columna lateral con los planes que incluyen la característica.
- FAQ de tiempos (`faq.ts`): cubre IA Exprés (7 días) y los cuatro planes mensuales.
- Temas de color: seis temas; Ember conserva el look original (ver `CLAUDE.md`).
- Servicios: sección de inicio y `/services` por capas (opción C), solo con planes.
- Contenido de planes: IA Exprés solo sitio con IA y AEO; sin "Talla"; Arranque con sitio multilingüe.
