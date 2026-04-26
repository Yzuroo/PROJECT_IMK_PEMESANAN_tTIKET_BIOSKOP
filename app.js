// App.js - Master Controller untuk seluruh aplikasi
class CinemaXXIApp {
    constructor() {
        this.init();
    }

    init() {
        this.setupNavbar();
        this.setupSmoothScroll();
        this.setupMobileMenu();
        this.loadSampleData();
        this.pageSpecificInit();
    }

    // Setup Navbar Active State
    setupNavbar() {
        const navLinks = document.querySelectorAll('.nav-link');
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';

        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPath || (currentPath === '' && href === 'index.html')) {
                link.classList.add('active');
            }
            
            link.addEventListener('click', () => {
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            });
        });
    }

    // Smooth Scrolling & Animations
    setupSmoothScroll() {
        // Smooth scroll untuk semua link internal
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Mobile Menu Toggle
    setupMobileMenu() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');

        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
            });

            // Close menu on link click
            document.querySelectorAll('.nav-link, .login-btn').forEach(link => {
                link.addEventListener('click', () => {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                });
            });
        }
    }

    // Load Sample Data (simulasi database)
    loadSampleData() {
        // Pastikan ada data awal untuk demo
        if (!localStorage.getItem('bookings')) {
            localStorage.setItem('bookings', JSON.stringify([]));
        }
    }

    // Page-specific initialization
    pageSpecificInit() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        
        // Auto-init berdasarkan halaman
        switch(currentPage) {
            case 'index.html':
            case '':
                // Movies sudah di-handle di movies.js
                break;
            case 'booking.html':
                // Booking sudah di-handle di booking.js
                break;
            case 'my-tickets.html':
                // My tickets sudah di-handle di my-tickets.js
                break;
        }
    }

    // Utility: Format Rupiah
    static formatRupiah(amount) {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(amount);
    }

    // Utility: Generate Booking Code
    static generateBookingCode() {
        return 'XXI' + Math.random().toString(36).substr(2, 6).toUpperCase();
    }

    // Global: Login Modal (simulasi)
    static showLoginModal() {
        const modalHTML = `
            <div class="modal-overlay" onclick="this.remove()">
                <div class="modal-content" onclick="event.stopPropagation()">
                    <h3>Login Cinema XXI</h3>
                    <input type="email" placeholder="Email" class="modal-input">
                    <input type="password" placeholder="Password" class="modal-input">
                    <button class="modal-btn primary">Login</button>
                    <button class="modal-btn secondary" onclick="this.parentElement.parentElement.remove()">Batal</button>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }
}

// Event Listeners Global
document.addEventListener('DOMContentLoaded', function() {
    // Inisialisasi aplikasi utama
    window.app = new CinemaXXIApp();

    // Login button handler
    document.querySelectorAll('.login-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            CinemaXXIApp.showLoginModal();
        });
    });

    // Search global (cross-page)
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const query = this.value;
                if (query) {
                    alert(`Mencari: "${query}"\nFitur pencarian lengkap akan segera hadir!`);
                }
            }
        });
    }

    // Back to top button (opsional)
    window.addEventListener('scroll', function() {
        const backToTop = document.querySelector('.back-to-top');
        if (!backToTop) return;

        if (window.scrollY > 500) {
            backToTop.style.opacity = '1';
            backToTop.style.visibility = 'visible';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.visibility = 'hidden';
        }
    });
});

// Window resize handler untuk mobile responsiveness
window.addEventListener('resize', function() {
    // Reset mobile menu on resize
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    if (window.innerWidth > 768) {
        if (hamburger) hamburger.classList.remove('active');
        if (navMenu) navMenu.classList.remove('active');
    }
});

// PWA-like offline support
window.addEventListener('online', function() {
    console.log('🌐 Koneksi internet tersambung');
});

window.addEventListener('offline', function() {
    console.log('📴 Koneksi internet terputus - Mode offline aktif');
});

// Service Worker Registration (untuk PWA)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(reg => console.log('SW registered'))
            .catch(err => console.log('SW registration failed'));
    });
}

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


// Export untuk akses global
window.CinemaXXIApp = CinemaXXIApp;
