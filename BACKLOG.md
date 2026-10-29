# Backlog

Pendientes y puntos por revisar. Actualizado el 2026-10-15.

## Pendiente

- [ ] **Precios US de tres extras** (`src/lib/packages.ts`, `price.us: null`): Video producción, Gestión y producción esencial — Meta y — Google. MX ya tiene precio ($750 / $570 / $670 al mes); en US se muestra "Cotización a solicitud" hasta que el proyecto de precios los confirme.
- [ ] **Privacidad (LFPDPPP), antes de publicar**: revisión de un abogado del aviso de privacidad (`dict.ts`, `privacyIntro` / `privacySections`, es y en) y reenvío funcionando de `privacidad@ecommetrica.com`. El código ya está: casilla de consentimiento obligatoria en `ContactForm.tsx` y aviso reescrito (responsable, datos, finalidades, SMTP, 12 meses de conservación, derechos ARCO en 7 días hábiles).
  - Fuera de este repo: sitios de clientes (Lumbán, Monge, Cesia, Palmas), auditoría de accesibilidad con axe, NVDA y VoiceOver, y la política de retención y borrado del backend (proceso, no código).
  - Subtítulos y transcripciones de los videos de testimonial; no se sabe cuáles ya los llevan.
- [ ] **Probar en navegador la versión US**: precios US, filas solo-US (★) y la nota al pie. Hasta ahora solo se verificó la lógica.

- [ ] **Comparación del "Compliance Remediation Plan" contra el repo (2026-10-13): brechas que no cubre el punto anterior.** Orden sugerido de arriba abajo.
  - **ESTADO tras ejecutar la subtarea 1 (2026-10-13, solo frontend, cambios en el árbol de trabajo sin subir a git).** Hecho: enlace "saltar al contenido" y `<main id="main-content">`; botón de pausa y `prefers-reduced-motion` en los videos de fondo (`BackgroundVideo`); foco del menú móvil (entra, queda atrapado, Escape y vuelve al botón); casilla de consentimiento y aviso simplificado en `ContactForm.tsx` (es y en, con pruebas); `LegalDocument` acepta una línea de vigencia; páginas `/accessibility` y `/en/accessibility` con enlace en el footer y en el sitemap; `resend` quitado de `package.json`; `bun run lint` corre. Documentación interna: todo está en `C:\Users\kevin\e-commetrics\compliance\Subtask-1-ecommetrica.com.docx` (reporte de accesibilidad, inventario de tags, captura de red, textos propuestos, retención, ARCO y brechas, como apéndices A a G). Los archivos `.md` sueltos que se mencionan más abajo ya no existen; el mapa completo de rutas está en `C:\Users\kevin\e-commetrics\BACKLOG-compliance-remediation.md`.
  - **PENDIENTE de esa ejecución:** (1) contraste de color, el único hallazgo serio de axe que queda: requiere decidir un acento más oscuro o subir opacidades (ver Apéndice A del Word de la subtarea 1); (2) política de privacidad y FAQ en `dict.ts` y `faq.ts`: textos propuestos en el Apéndice D del Word de la subtarea 1, esperan correo de privacidad, responsable, abogado y tu visto bueno; (3) pruebas manuales con NVDA y VoiceOver; (4) subtítulos de los dos testimoniales; (5) repetir axe y la captura de red en el dominio publicado; (6) decisión sobre las promesas de `pricing.ts`; (7) el backend sigue fuera de alcance: sin validación ni registro del consentimiento, y `console.error` que puede registrar correos. (8) **`/arturo` y `/bites` no se modifican** (páginas entregadas a los clientes tal cual; se revirtieron los cambios que se habían hecho): sus mapas de Google, los íconos de `cdn.simpleicons.org` en `/arturo`, el formulario de citas sin consentimiento y los hallazgos de axe (botones sin nombre, iframes sin título, enlace sin nombre, lista inválida) quedan como riesgo conocido. Más abajo, los puntos ya resueltos conservan su texto original como referencia.
  - **Política de privacidad (`dict.ts`, solo con visto bueno):** además de lo ya listado, falta separar finalidades primarias y secundarias con opt-out, listar transferencias a terceros (servidor SMTP), mencionar el almacenamiento local (tema, idioma y scroll) y corregir "Archivos de registro", que dice que las IP no son identificables. Falta también guardar versiones anteriores de cada aviso. La versión `/en` es traducción de la misma política: sin derechos de California ni terceros.
  - **Formulario y backend:** la casilla de consentimiento también debe entrar en `contactForm.ts` y en `contact.controller.ts` (hoy el backend no valida ningún consentimiento). `console.error` puede registrar correos de visitantes en los logs. Aclarar en el aviso que la confirmación al visitante es transaccional.
  - **Declaración de accesibilidad:** no existe página ni enlace en el footer (solo `/vpat`, que explica el servicio). Necesita fecha de prueba, estándar, límites conocidos y contacto para reportar barreras.
  - **Enlace "saltar al contenido":** no hay, y `<main>` en `(es)/layout.tsx` y `en/layout.tsx` no tiene ancla.
  - **Videos con autoplay y bucle** sin control de pausa ni subtítulos: `Pillars.tsx`, `studio/page.tsx`, `services/page.tsx` (es y en) y `CaseStudyDetail.tsx` (el que lleva `controls` sí se puede pausar). Confirmar cuáles tienen audio y si respetan `prefers-reduced-motion`.
  - **Contraste (4.5:1): medido con axe el 2026-10-15 sobre el árbol unido con QA.** Ember conserva el aspecto original aprobado por el owner y falla en cuatro casos: etiquetas naranja pequeñas (`text-ecom-eyebrow`, 3.3:1), texto secundario al 50 % (`text-ecom-meta`, 2.96:1), letra blanca sobre botón naranja (3.84:1) y algunos `ink/45` sueltos. Los otros temas tienen fallos puntuales (2 a 21 elementos). Se arreglaría con valores de token solo en Ember, pendiente de aprobación del owner (la solución probada está en el commit `68f77f0`).
  - **Alt:** 11 de 18 `<img>` tienen `alt=""`; revisar que todos sean decorativos.
  - **Menú móvil (`Header.tsx`):** confirmar que atrapa y devuelve el foco, y que Escape lo cierra.
  - **Evidencia de pruebas:** correr axe en cada plantilla (home, services, pricing, packages, work, blog, contact, legal), más una pasada con teclado y con NVDA y VoiceOver sobre el formulario. Guardar el reporte con fecha y quién lo hizo. Sin esto no se puede publicar la declaración ni usar el VPAT propio.
  - **Escaneo periódico de requests** (DevTools, caché limpio): hoy no hay trackers, pero hace falta un inventario de tags escrito (aunque quede vacío) y repetir la captura al agregar cualquier script. Si se suma GA4 o Meta Pixel, CMP, Consent Mode v2, GPC y política de EE. UU. pasan a ser obligatorios.
  - **`pricing.ts` promete "Meta Pixel con consentimiento" y "CCPA/CPRA"** (líneas ~501, ~566-607) sin que el propio sitio los implemente. Decidir si se construye en el sitio propio como referencia o si se aclara que aplica a los sitios de cliente.
  - **`/arturo` y `/bites` (viven en este repo):** iframes de Google Maps (`arturo/Booking.tsx`, `bites/Map.tsx`) y Vimeo (`bites/Hero.tsx`, `bites/Information.tsx`) cargan sin consentimiento y mandan la IP del visitante a terceros. Son sitios de salud, el caso de mayor riesgo del plan. La política de `/arturo` habla de cookies y anunciantes que el sitio no usa, y su formulario de cita no tiene aviso ni consentimiento. Subirlos de prioridad frente a "se dejan aparte".
  - **Proceso (fuera del código):** retención y borrado de los correos del formulario, procedimiento ARCO de una página con bitácora y su plazo legal citado, plan de respuesta ante una brecha, y contrato de encargo con clientes (en sus sitios Ecommetrica es encargado, no responsable). Valorar también un seguro E&O y una figura legal que separe el patrimonio personal del negocio.
  - **Documentos propios por entregar** (capítulo 4 del plan): reporte de accesibilidad, declaración de accesibilidad, VPAT, inventario de tags, captura pre-consentimiento, política de EE. UU., aviso integral y simplificado, y procedimiento de retención y ARCO.
  - **Lint:** `npm run lint` roto (ver "ESLint roto" abajo); sin él no hay red automática de accesibilidad.
  - **Umbrales del CCPA y mención de California (por decidir):** el CCPA completo aplica solo si el negocio supera ~26.6 M USD de ingresos, maneja datos de 100,000+ consumidores de California o saca 50%+ de sus ingresos de vender o compartir datos. Las cifras salen del doc, no están verificadas y se ajustan cada dos años; confirmarlas con un abogado antes de publicarlas. Aunque no se llegue al umbral, siguen aplicando CIPA (sin umbral), ADA/Unruh y CalOPPA. Para clientes de San Diego conviene una pregunta de admisión (ingresos, consumidores en California, venta de datos) que decida su paquete de cumplimiento. Propuesta para la web, solo informativa: una sección "Residentes de California" en la política en inglés y una pregunta en el FAQ (`faq.ts`, también copy aceptado). Redactar el texto como propuesta aparte antes de tocar `dict.ts` o `faq.ts`.
  - **Qué no publicar:** nada de "cumplimos con CCPA", "tu sitio quedará en cumplimiento" ni "Ecommetrica no está sujeta al CCPA"; son promesas o afirmaciones legales que se vuelven en contra. Tampoco publicar los reportes de pruebas, el inventario de tags, las capturas de red, el orden de rollout ni lo relativo al riesgo personal por el DBA: son evidencia o gestión interna (carpeta del cliente y este backlog).
  - **Límites técnicos:** el sitio es estático (`output: "export"` en `next.config.ts`), así que los encabezados de seguridad se configuran en el hosting, no en el repo. El backend no tiene base de datos: la bitácora ARCO y el registro de consentimientos no tienen dónde vivir. Decidir si se llevan fuera del sistema (hoja de cálculo, empezando así) o si se agrega almacenamiento, lo que crea nuevas obligaciones de retención y seguridad.
  - **Subtítulos:** además de ser brecha, es trabajo de producción (archivos `.vtt` por video y saber cuáles tienen audio); no se resuelve solo con código.
  - **Orden de ejecución sugerido (un PR por paso, a `qa`):**
    1. Enlace "saltar al contenido", pausa de videos con autoplay y limpieza de `console.error` en el backend.
    2. Casilla de consentimiento en formulario, esquema y backend, con los textos pendientes de aprobación.
    3. Declaración de accesibilidad, solo después de correr axe y las pruebas con teclado y lectores de pantalla.
    4. Política de privacidad corregida, cuando estén el correo de privacidad, el responsable y la revisión legal.
    5. Bloqueo previo de Maps y Vimeo en `/arturo` y `/bites`, y el resto de la lista.
    Antes del paso 1 conviene arreglar ESLint para que haya red automática.

## Por revisar

- [ ] **Ahorro de 56% a 72%** (`Plan.savingPercent`): se tomó tal cual del PDF de la Escalera v1.2; falta la lista de precios por servicio que lo respalda.
- [ ] **Arranque en MX**: incluye "Declaración de accesibilidad" sin "Sitio accesible ADA/WCAG" (este empieza en Tracción en MX; en US viene desde Arranque). Confirmar si es intencional.
- [ ] **Selector visible de mercado** (Tijuana / San Diego): hoy la región sale solo de la geolocalización (`RegionProvider`) y por defecto es MX.
- [ ] **Copy "cada plan incluye todo lo del anterior"** (`pricingPage.notes.inheritance`): puede contradecirse con las filas solo-US (★).
- [ ] **Probar con teclado**: el comparador de `PlanMatrix.tsx` y la tarjeta de plan del configurador (`PlanStep`: "Ver todo lo incluido", "Saber más", "Seleccionar").

- [x] **ESLint roto** (arreglado 2026-10-13, sin subir a git): `eslint.config.mjs` ahora usa las configuraciones nativas de `eslint-config-next` 16 en lugar de `FlatCompat`, y `bun run lint` corre. Los 5 errores que reveló ya están corregidos (`Header.tsx`, `ContactForm.tsx`, `GlobalNotFoundShell.tsx`, `PackagesConfigurator.tsx` y `useVideoAvailable.ts`); `bun run lint` termina con 0 errores y 44 advertencias previas: 41 `@next/next/no-img-element` (sobre todo `/arturo` y `/bites`) y 3 de variables sin usar en pruebas. `@eslint/eslintrc` sigue instalado.

## Actualización 2026-10-15
- Se unió `development` con la rama QA del owner (commit `42ad630`); en colores y textos ganó la versión del owner. El contraste de Ember queda como decisión del owner: la solución probada de cuatro valores está en el commit `68f77f0`.
- Se agregaron Google Analytics (GA4, `G-41JBQVH40M`) y Meta Pixel (`557300731391676`) en `src/components/GoogleAnalytics.tsx` y `MetaPixel.tsx`, usados en `src/app/(es)/layout.tsx` y `src/app/en/layout.tsx`. No cargan en `/arturo` ni `/bites`. Cargan antes de cualquier consentimiento: faltan banner, Consent Mode v2 y GPC (decisión 20 del resumen para el owner).
- La política publicada en `src/lib/i18n/dict.ts` (es, línea ~920; en, línea ~1570) dice que el sitio no usa cookies de publicidad ni de analítica: deja de ser cierta con los rastreadores activos.
- `NEXT_PUBLIC_BACKEND_URL` se fija al compilar: compilar con la URL real de producción antes de subir `out/`.
- Detalle completo en `BACKLOG-compliance-remediation.md` (carpeta `e-commetrics`, fuera del repo).

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
