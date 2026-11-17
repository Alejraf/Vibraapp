# Reproductor Multimedia & Cursos Pro 🎵📚

Aplicación web modular diseñada para reproducir cursos precargados y buscar contenido en YouTube de forma integrada, optimizada para dispositivos móviles (Android) y estructurada para integrar publicidad de Monetag sin afectar la experiencia de usuario (evitando que los clics abran pestañas publicitarias no deseadas sobre el reproductor).

## Estructura del Proyecto
- `index.html`: Estructura principal de la interfaz.
- `css/style.css`: Estilos modernos y responsivos adaptados para móviles y PC.
- `js/app.js`: Lógica de cursos, reproductor seguro e integración con la API de YouTube.

## ¿Dónde integrar la API de YouTube?
Abre el archivo `js/app.js` y en la **línea 5**, reemplaza `"TU_YOUTUBE_API_KEY_AQUI"` por tu clave de la **YouTube Data v3 API**:

```javascript
const YOUTUBE_API_KEY = "TU_REAL_API_KEY";
```

## ¿Cómo proteger los videos de la publicidad Popunder de Monetag?
- Los videos se reproducen dentro de un `<iframe>` nativo controlado por la aplicación (`playVideo`), lo que impide que los scripts de redirección global de Monetag secuestren el clic del reproductor multimedia.
- Los banners de Monetag se pueden colocar en los espacios reservados en `index.html` (arriba y abajo), manteniendo la zona de interacción de los cursos y videos 100% limpia.
