# USDC Massive Payments — rediseño

Landing en React + Vite basada en la dirección visual aprobada: grafito, verde lima y tipografía Inter.

## Ejecutar

```sh
npm install
npm run dev -- --host 127.0.0.1 --port 4173 --strictPort
npm run build
```

La compilación está en `dist/client`. Se preserva la configuración de hosting del starter Product Design.

## Publicar en Vercel

`vercel.json` ya define la instalación (`npm ci`), la compilación (`npm run build`) y la carpeta publicada (`dist/client`), así que alcanza con importar el repositorio en Vercel sin tocar la configuración.

Variables opcionales para compilar una versión con otros destinos (por ejemplo, la copia que se comparte como artifact de Claude): `VITE_APP_URL` (botones "Empezar ahora"), `VITE_TERMS_URL` y `VITE_DISCLAIMER_URL` (links legales). Sin definirlas, apuntan a la app en Railway.

## Alcance

- Landing completa en español con contenido del sitio original: portada, cifras de Arc Testnet, cuatro pasos, beneficios, cinco casos de uso, API y ejemplo completo, seis controles de seguridad, seis preguntas frecuentes, CTA y enlaces legales.
- Menú adaptable, anclas, FAQ accesible y copia del ejemplo de API.
- Todos los CTA de inicio llevan a la aplicación existente en https://apisix-production-e04e.up.railway.app/app.
- Proyecto independiente: no modifica ni despliega el sitio actual. No incluye backend, conexión de wallets ni ejecución de pagos.
- Esta versión está en español; no replica el selector multilingüe del sitio original.

## Activos

- `public/assets/hero.png`: ilustración generada con ImageGen siguiendo la referencia elegida, planilla de empleados y comprobantes con rutas verde lima sobre grafito. Es el original y solo se usa como respaldo.
- `public/assets/hero-{800,1254}.{avif,webp}`: versiones de la ilustración que sirve la página (15–44 KB contra 1,5 MB del PNG). Si se cambia `hero.png`, hay que regenerarlas.
- `public/assets/hero-layers/`: capas para animar el hero (`src/HeroMotion.jsx`), recortadas de `hero.png`: `plate.webp` es la ilustración sin tarjetas y `card-*`/`ghost-*` son los comprobantes y las tarjetas del fondo, cada uno por separado (64 KB en total). Si cambia la ilustración, hay que volver a recortarlas y a calcar las rutas de `HeroMotion.jsx`.
- `public/assets/ump.png`: extracción del logotipo de la propuesta elegida. Es un raster de 92×55 y se ve algo borroso en pantallas retina; conviene reemplazarlo por el SVG original de la marca.
- `public/assets/favicon.png`: favicon armado con el logotipo.
- `public/assets/og.jpg`: imagen de 1200×630 para compartir en redes. `og:image` usa una ruta relativa: cuando haya dominio definitivo, cambiarla por la URL absoluta en `index.html`.
- Inter variable alojada localmente mediante Fontsource; iconos Phosphor.
- Referencia: `C:/Users/Admin/.codex/generated_images/01a154d7-1716-77a0-aa36-6cfa9cb9e04c/exec-a83c4266-79d9-4e9c-a2e3-0155accef135.png`.

## Verificación

Compilación de producción completada. Evidencias visuales y comparación en `qa/`; revisión en `design-qa.md`.
