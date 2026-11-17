/*************************************************************
 * CONFIGURACIÓN DE LA API DE YOUTUBE
 * Instrucción: Coloca tu API Key de YouTube Data v3 aquí abajo.
 *************************************************************/
const YOUTUBE_API_KEY = "TU_YOUTUBE_API_KEY_AQUI";

// Cursos precargados de ejemplo (puedes añadir más)
const precookedCourses = [
    { title: "Curso de Desarrollo Web 2026", id: "dQw4w9WgXcQ", desc: "Aprende HTML, CSS y JS desde cero para dispositivos móviles.", thumb: "https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg" },
    { title: "Masterclass de JavaScript Moderno", id: "dQw4w9WgXcQ", desc: "Domina promesas, async/await y manipulación del DOM.", thumb: "https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg" },
    { title: "Producción Musical y Beats", id: "dQw4w9WgXcQ", desc: "Crea tus primeros ritmos y mezcla audio de forma profesional.", thumb: "https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg" }
];

const player = document.getElementById("youtubePlayer");
const currentTitle = document.getElementById("currentTitle");
const courseList = document.getElementById("courseList");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const searchResults = document.getElementById("searchResults");

// Cargar cursos precargados en la interfaz
function loadCourses() {
    courseList.innerHTML = "";
    precookedCourses.forEach(course => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <img src="${course.thumb}" alt="${course.title}">
            <h4>📚 ${course.title}</h4>
            <p>${course.desc}</p>
        `;
        card.addEventListener("click", () => {
            playVideo(course.id, course.title);
        });
        courseList.appendChild(card);
    });
}

// Reproducir video de forma segura dentro del iframe (Evita pestañas basura de Monetag)
function playVideo(videoId, title) {
    player.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    currentTitle.textContent = `Reproduciendo: ${title}`;
    
    // Desplazarse suavemente hacia arriba para ver el reproductor
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Función de Búsqueda conectada a YouTube Data API v3
async function searchYouTube(query) {
    if (!query.trim()) return;
    
    if (YOUTUBE_API_KEY === "TU_YOUTUBE_API_KEY_AQUI") {
        searchResults.innerHTML = `<p style="color: #f59e0b; grid-column: 1/-1;">⚠️ Por favor, ingresa tu API Key de YouTube en <code>js/app.js</code> para habilitar las búsquedas en vivo.</p>`;
        return;
    }

    searchResults.innerHTML = `<p style="color: #94a3b8; grid-column: 1/-1;">Buscando en YouTube...</p>`;

    try {
        const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=8&q=${encodeURIComponent(query)}&type=video&key=${YOUTUBE_API_KEY}`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.items && data.items.length > 0) {
            searchResults.innerHTML = "";
            data.items.forEach(item => {
                const videoId = item.id.videoId;
                const title = item.snippet.title;
                const description = item.snippet.description;
                const thumb = item.snippet.thumbnails.medium.url;

                const card = document.createElement("div");
                card.className = "card";
                card.innerHTML = `
                    <img src="${thumb}" alt="${title}">
                    <h4>${title}</h4>
                    <p>${description.substring(0, 60)}...</p>
                `;
                card.addEventListener("click", () => {
                    playVideo(videoId, title);
                });
                searchResults.appendChild(card);
            });
        } else {
            searchResults.innerHTML = `<p style="color: #94a3b8; grid-column: 1/-1;">No se encontraron resultados.</p>`;
        }
    } catch (error) {
        console.error("Error al buscar en YouTube:", error);
        searchResults.innerHTML = `<p style="color: #ef4444; grid-column: 1/-1;">Error al conectar con la API de YouTube.</p>`;
    }
}

// Eventos de búsqueda
searchBtn.addEventListener("click", () => {
    searchYouTube(searchInput.value);
});

searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        searchYouTube(searchInput.value);
    }
});

// Inicializar aplicación al cargar
loadCourses();
