// Data Film (seperti Cinema XXI)
const movies = [
    {
        id: 1,
        title: "Avengers: Endgame",
        poster: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop",
        genre: ["Action", "Sci-Fi"],
        duration: 181,
        rating: "PG-13",
        price: 65000,
        status: "NOW SHOWING"
    },
    {
        id: 2,
        title: "Spider-Man: No Way Home",
        poster: "https://images.unsplash.com/photo-1611606063302-500fb8c8a9c3?w=400&h=600&fit=crop",
        genre: ["Action", "Adventure"],
        duration: 148,
        rating: "PG-13",
        price: 55000,
        status: "NOW SHOWING"
    },
    {
        id: 3,
        title: "Dune: Part Two",
        poster: "https://images.unsplash.com/photo-1635805734198-33c763d71b5b?w=400&h=600&fit=crop",
        genre: ["Sci-Fi", "Adventure"],
        duration: 166,
        rating: "PG-13",
        price: 70000,
        status: "NOW SHOWING"
    },
    {
        id: 4,
        title: "Oppenheimer",
        poster: "https://images.unsplash.com/photo-1692834492990-6eaaddb2aabd?w=400&h=600&fit=crop",
        genre: ["Biography", "Drama"],
        duration: 180,
        rating: "R",
        price: 60000,
        status: "NOW SHOWING"
    },
    {
        id: 5,
        title: "Barbie",
        poster: "https://images.unsplash.com/photo-1692834508658-6d11e0bbea49?w=400&h=600&fit=crop",
        genre: ["Comedy", "Fantasy"],
        duration: 114,
        rating: "PG-13",
        price: 50000,
        status: "NOW SHOWING"
    },
    {
        id: 6,
        title: "John Wick 4",
        poster: "https://images.unsplash.com/photo-1682685798433-6c5ce7e9fc5d?w=400&h=600&fit=crop",
        genre: ["Action", "Thriller"],
        duration: 169,
        rating: "R",
        price: 65000,
        status: "NOW SHOWING"
    }
];

// Render Movies
function renderMovies(moviesToRender = movies) {
    const moviesGrid = document.getElementById('moviesGrid');
    if (!moviesGrid) return;

    moviesGrid.innerHTML = moviesToRender.map(movie => `
        <div class="movie-card" onclick="selectMovie(${movie.id})">
            <img src="${movie.poster}" alt="${movie.title}" class="movie-poster">
            <div class="movie-info">
                <span class="movie-badge">${movie.status}</span>
                <h3 class="movie-title">${movie.title}</h3>
                <div class="movie-meta">
                    <span>${movie.duration} menit</span>
                    <span>${movie.rating}</span>
                </div>
                <div class="movie-price">Rp ${movie.price.toLocaleString()}</div>
            </div>
        </div>
    `).join('');
}

// Search Functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            const filteredMovies = movies.filter(movie => 
                movie.title.toLowerCase().includes(searchTerm)
            );
            renderMovies(filteredMovies);
        });
    }
    
    renderMovies();
});

// Select Movie (simulasi pilih film)
function selectMovie(movieId) {
    const movie = movies.find(m => m.id === movieId);
    if (movie) {
        // Simulasi redirect ke halaman booking
        localStorage.setItem('selectedMovie', JSON.stringify(movie));
        window.location.href = 'cinemas.html';
    }
}
