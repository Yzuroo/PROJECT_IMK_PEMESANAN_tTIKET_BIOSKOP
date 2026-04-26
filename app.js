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

// Data Bioskop lengkap seperti Cinema XXI
const cinemasData = [
    {
        id: 1,
        name: "Cinema XXI Grand Indonesia",
        city: "jakarta",
        address: "Jl. MH Thamrin No.1, Central Jakarta",
        image: "https://images.unsplash.com/photo-1558618047-3c8c76ca335e?w=400&h=300&fit=crop",
        rating: 4.8,
        screens: ["2D", "3D", "IMAX", "PREMIERE"],
        distance: "2.1 km",
        nowShowing: ["Avengers: Endgame", "Dune: Part Two"],
        coordinates: { lat: -6.1754, lng: 106.8272 }
    },
    {
        id: 2,
        name: "Cinema XXI Plaza Senayan",
        city: "jakarta",
        address: "Jl. Asia Afrika No.8, Senayan",
        image: "https://images.unsplash.com/photo-1571896349840-0d711e8f351e?w=400&h=300&fit=crop",
        rating: 4.7,
        screens: ["2D", "3D", "PREMIERE"],
        distance: "4.5 km",
        nowShowing: ["Spider-Man", "Oppenheimer"],
        coordinates: { lat: -6.2250, lng: 106.7990 }
    },
    {
        id: 3,
        name: "Cinema XXI Pantai Indah Kapuk",
        city: "jakarta",
        address: "PIK Avenue, Jakarta Utara",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop",
        rating: 4.9,
        screens: ["2D", "3D", "IMAX"],
        distance: "12.3 km",
        nowShowing: ["John Wick 4", "Barbie"],
        coordinates: { lat: -6.1240, lng: 106.7390 }
    },
    {
        id: 4,
        name: "Cinema XXI Paris Van Java",
        city: "bandung",
        address: "Jl. Sukajadi No.137-139, Bandung",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
        rating: 4.6,
        screens: ["2D", "3D"],
        distance: "1.8 km",
        nowShowing: ["Avengers", "Dune"],
        coordinates: { lat: -6.9000, lng: 107.6200 }
    },
    {
        id: 5,
        name: "Cinema XXI Tunjungan Plaza",
        city: "surabaya",
        address: "Jl. Basuki Rahmat No.8-12, Surabaya",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
        rating: 4.5,
        screens: ["2D", "3D", "PREMIERE"],
        distance: "0.9 km",
        nowShowing: ["Spider-Man", "Oppenheimer"],
        coordinates: { lat: -7.2580, lng: 112.7500 }
    },
    {
        id: 6,
        name: "Cinema XXI Centre Point",
        city: "surabaya",
        address: "Jl. Raya Kertajaya Indah No. 26",
        image: "https://images.unsplash.com/photo-1605391229711-62b0dd49c2ee?w=400&h=300&fit=crop",
        rating: 4.7,
        screens: ["2D", "3D"],
        distance: "3.2 km",
        nowShowing: ["John Wick 4", "Barbie"],
        coordinates: { lat: -7.2900, lng: 112.7700 }
    },
    {
        id: 7,
        name: "Cinema XXI Sun Plaza",
        city: "medan",
        address: "Jl. Gajah Mada No.1, Medan",
        image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=300&fit=crop",
        rating: 4.4,
        screens: ["2D", "3D"],
        distance: "1.2 km",
        nowShowing: ["Avengers", "Dune"],
        coordinates: { lat: 3.5952, lng: 98.6728 }
    }
];

// Cinemas Controller
class CinemasController {
    constructor() {
        this.currentFilter = 'all';
        this.init();
    }

    init() {
        this.renderCinemas(cinemasData);
        this.setupFilters();
        this.setupSearch();
        this.selectedCinema = null;
    }

    renderCinemas(cinemasList) {
        const grid = document.getElementById('cinemasGrid');
        if (!grid) return;

        grid.innerHTML = cinemasList.map(cinema => `
            <div class="cinema-card" data-city="${cinema.city}" onclick="cinemasController.selectCinema(${cinema.id})">
                <div class="cinema-image">
                    <img src="${cinema.image}" alt="${cinema.name}" loading="lazy">
                    <div class="cinema-overlay">
                        <div class="screens-info">
                            ${cinema.screens.map(screen => `<span>${screen}</span>`).join('')}
                        </div>
                    </div>
                </div>
                <div class="cinema-info">
                    <h3>${cinema.name}</h3>
                    <div class="location">${cinema.address}</div>
                    <div class="cinema-stats">
                        <div class="rating">
                            <i class="fas fa-star"></i>
                            <span>${cinema.rating}</span>
                        </div>
                        <div class="distance">${cinema.distance}</div>
                    </div>
                    <div class="now-showing">
                        ${cinema.nowShowing.slice(0, 2).map(movie => `<span>${movie}</span>`).join('')}
                        ${cinema.nowShowing.length > 2 ? '<span>+${cinema.nowShowing.length - 2} lagi</span>' : ''}
                    </div>
                    <div class="cinema-actions">
                        <button class="book-btn" onclick="event.stopPropagation(); cinemasController.bookTickets(${cinema.id})">
                            Pesan Tiket
                        </button>
                        <button class="map-btn" onclick="event.stopPropagation(); cinemasController.showMap(${cinema.id})">
                            <i class="fas fa-map-marker-alt"></i> Peta
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    setupFilters() {
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                // Update active filter
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                
                this.currentFilter = e.target.dataset.filter;
                this.filterCinemas();
            });
        });
    }

    setupSearch() {
        const searchInput = document.getElementById('cinemaSearch');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchCinemas(e.target.value);
            });
        }
    }

    filterCinemas() {
        let filtered = cinemasData;

        if (this.currentFilter !== 'all') {
            filtered = filtered.filter(cinema => cinema.city === this.currentFilter);
        }

        this.renderCinemas(filtered);
    }

    searchCinemas(query) {
        if (!query.trim()) {
            this.renderCinemas(cinemasData.filter(c => c.city === this.currentFilter));
            return;
        }

        const filtered = cinemasData.filter(cinema => 
            cinema.name.toLowerCase().includes(query.toLowerCase()) ||
            cinema.address.toLowerCase().includes(query.toLowerCase()) ||
            cinema.city.toLowerCase().includes(query.toLowerCase())
        );

        this.renderCinemas(filtered);
    }

    selectCinema(cinemaId) {
        const cinema = cinemasData.find(c => c.id === cinemaId);
        if (!cinema) return;

        this.selectedCinema = cinema;
        
        // Update map placeholder
        const mapPlaceholder = document.getElementById('mapPlaceholder');
        mapPlaceholder.innerHTML = `
            <div class="selected-cinema-map">
                <h3>${cinema.name}</h3>
                <p>${cinema.address}</p>
                <div class="map-actions">
                    <button class="map-btn primary" onclick="window.open('https://maps.google.com?q=${cinema.coordinates.lat},${cinema.coordinates.lng}', '_blank')">
                        <i class="fas fa-directions"></i> Buka Peta
                    </button>
                    <button class="map-btn" onclick="cinemasController.showShowtimes(${cinema.id})">
                        <i class="fas fa-clock"></i> Lihat Jadwal
                    </button>
                </div>
            </div>
        `;
    }

    bookTickets(cinemaId) {
        const cinema = cinemasData.find(c => c.id === cinemaId);
        const movie = JSON.parse(localStorage.getItem('selectedMovie')) || cinemasData[0].nowShowing[0];
        
        // Simulasi showtime
        const showtime = {
            id: Date.now(),
            cinemaId: cinema.id,
            cinemaName: cinema.name,
            movie: typeof movie === 'string' ? movie : movie.title
        };

        localStorage.setItem('selectedShowtime', JSON.stringify(showtime));
        window.location.href = 'booking.html';
    }

    showMap(cinemaId) {
        const cinema = cinemasData.find(c => c.id === cinemaId);
        if (cinema) {
            const url = `https://maps.google.com?q=${cinema.coordinates.lat},${cinema.coordinates.lng}`;
            window.open(url, '_blank');
        }
    }

    showShowtimes(cinemaId) {
        const cinema = cinemasData.find(c => c.id === cinemaId);
        if (!cinema) return;

        alert(`Jadwal Tayang ${cinema.name}:\n\n${cinema.nowShowing.join('\n')}\n\nPilih film di halaman utama untuk booking!`);
    }
}

// Global access
let cinemasController;

// Initialize when DOM loaded
document.addEventListener('DOMContentLoaded', function() {
    cinemasController = new CinemasController();
    
    // Loading animation
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 500);
});

// Simulate real-time updates
setInterval(() => {
    // Update ratings randomly (demo)
    const ratings = document.querySelectorAll('.rating span');
    ratings.forEach(rating => {
        if (Math.random() < 0.1) {
            const newRating = (4 + Math.random()).toFixed(1);
            rating.textContent = newRating;
        }
    });
}, 10000);

class BookingSystem {
    constructor() {
        this.seats = 10; // Total kursi per baris
        this.selectedSeats = [];
        this.basePrice = 65000;
        this.init();
    }

    init() {
        this.loadMovieData();
        this.createSeats();
        this.attachEvents();
    }

    loadMovieData() {
        const movieData = JSON.parse(localStorage.getItem('selectedMovie')) || {
            title: "Avengers: Endgame",
            poster: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop"
        };

        document.getElementById('moviePoster').src = movieData.poster;
        document.getElementById('movieTitle').textContent = movieData.title;
        document.getElementById('cinemaName').textContent = "Cinema XXI Grand Indonesia";
        document.getElementById('showDate').textContent = "Sabtu, 15 Feb 2024";
        document.getElementById('showTime').textContent = "19:00 WIB";
        document.getElementById('screenType').textContent = "Screen 3 (2D)";
    }

    createSeats() {
        const container = document.getElementById('seatsContainer');
        let seatsHTML = '';

        // Buat 8 baris kursi (A-H)
        for (let row = 0; row < 8; row++) {
            const rowLetter = String.fromCharCode(65 + row); // A, B, C...
            seatsHTML += `<div class="seat-row"><span>${rowLetter}</span>`;

            for (let seat = 1; seat <= this.seats; seat++) {
                const isTaken = Math.random() < 0.3; // 30% kursi sudah diambil
                seatsHTML += `
                    <div class="seat ${isTaken ? 'taken' : 'available'}" 
                         data-row="${rowLetter}" 
                         data-seat="${seat}">
                        ${seat}
                    </div>
                `;
            }
            seatsHTML += '</div>';
        }

        container.innerHTML = seatsHTML;
    }

    attachEvents() {
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('seat') && !e.target.classList.contains('taken')) {
                this.toggleSeat(e.target);
            }
        });

        document.getElementById('payBtn').addEventListener('click', () => this.processPayment());
    }

    toggleSeat(seatElement) {
        const row = seatElement.dataset.row;
        const seatNum = parseInt(seatElement.dataset.seat);

        const seatIndex = this.selectedSeats.findIndex(s => s.row === row && s.number === seatNum);
        
        if (seatIndex > -1) {
            // Hapus dari selected
            this.selectedSeats.splice(seatIndex, 1);
            seatElement.classList.remove('selected');
        } else {
            // Tambah ke selected
            this.selectedSeats.push({ row, number: seatNum });
            seatElement.classList.add('selected');
        }

        this.updateSummary();
    }

    updateSummary() {
        const count = this.selectedSeats.length;
        const total = count * this.basePrice;

        document.getElementById('ticketCount').textContent = count;
        document.getElementById('ticketPrice').textContent = `Rp ${this.basePrice.toLocaleString()}`;
        document.getElementById('totalAmount').textContent = `Rp ${total.toLocaleString()}`;

        const seatsList = document.getElementById('selectedSeatsList');
        const payBtn = document.getElementById('payBtn');

        if (count > 0) {
            seatsList.innerHTML = `
                <div>Kursi: ${this.selectedSeats.map(s => `${s.row}${s.number}`).join(', ')}</div>
            `;
            payBtn.disabled = false;
            payBtn.classList.add('active');
        } else {
            seatsList.innerHTML = '<p>Pilih kursi untuk melanjutkan</p>';
            payBtn.disabled = true;
            payBtn.classList.remove('active');
        }
    }

    processPayment() {
        if (this.selectedSeats.length === 0) return;

        // Simulasi pembayaran berhasil
        const bookingCode = 'XXI' + Date.now().toString().slice(-6);
        const total = this.selectedSeats.length * this.basePrice;

        // Simpan ke localStorage
        const booking = {
            id: Date.now(),
            movie: document.getElementById('movieTitle').textContent,
            seats: this.selectedSeats,
            total: total,
            bookingCode: bookingCode,
            date: new Date().toLocaleString('id-ID'),
            status: 'confirmed'
        };

        let allBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
        allBookings.unshift(booking);
        localStorage.setItem('bookings', JSON.stringify(allBookings));

        // Tampilkan QR Code
        document.getElementById('qrSection').style.display = 'block';
        document.getElementById('bookingCode').textContent = bookingCode;
        document.getElementById('qrCode').innerHTML = `
            <div style="width: 150px; height: 150px; background: #333; margin: 0 auto 1rem; display: grid; place-items: center; border-radius: 12px;">
                <i class="fas fa-qrcode" style="font-size: 3rem; color: #a855f7;"></i>
            </div>
        `;

        // Scroll ke QR
        document.getElementById('qrSection').scrollIntoView({ behavior: 'smooth' });
    }
}

// Inisialisasi saat halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
    new BookingSystem();
});

function printTicket() {
    window.print();
}

class MyTickets {
    constructor() {
        this.init();
    }

    init() {
        this.loadTickets();
        this.attachEvents();
    }

    loadTickets() {
        const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
        
        const ticketsGrid = document.getElementById('ticketsGrid');
        if (bookings.length === 0) {
            ticketsGrid.innerHTML = `
                <div class="no-tickets">
                    <i class="fas fa-ticket-alt" style="font-size: 4rem; color: #a855f7; margin-bottom: 1rem;"></i>
                    <h3>Belum ada tiket</h3>
                    <p>Pesan tiket film favorit Anda sekarang</p>
                    <a href="index.html" class="cta-btn">Pesan Tiket</a>
                </div>
            `;
            return;
        }

        ticketsGrid.innerHTML = bookings.map(booking => `
            <div class="ticket-card">
                <div class="ticket-header">
                    <div class="status ${booking.status}">${booking.status === 'confirmed' ? '✅ Terkonfirmasi' : '⏳ Pending'}</div>
                    <div class="booking-code">#${booking.bookingCode}</div>
                </div>
                <div class="ticket-movie">
                    <img src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=100&h=150&fit=crop" alt="${booking.movie}">
                    <div>
                        <h3>${booking.movie}</h3>
                        <div class="ticket-details">
                            <span><i class="fas fa-calendar"></i> ${new Date(booking.date).toLocaleDateString('id-ID')}</span>
                            <span><i class="fas fa-clock"></i> 19:00 WIB</span>
                            <span><i class="fas fa-chair"></i> ${booking.seats.map(s => `${s.row}${s.number}`).join(', ')}</span>
                        </div>
                    </div>
                </div>
                <div class="ticket-footer">
                    <div class="total">Total: Rp ${booking.total.toLocaleString()}</div>
                    <div class="ticket-actions">
                        <button class="qr-btn" onclick="showQR('${booking.bookingCode}')">
                            <i class="fas fa-qrcode"></i> QR Code
                        </button>
                        <button class="print-btn" onclick="printTicket('${booking.id}')">
                            <i class="fas fa-print"></i> Cetak
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    attachEvents() {
        // Auto refresh setiap 5 detik (simulasi real-time)
        setInterval(() => this.loadTickets(), 5000);
    }
}

// Global functions
function showQR(bookingCode) {
    alert(`QR Code untuk booking #${bookingCode}\n\nTunjukkan di konter bioskop!`);
}

function printTicket(bookingId) {
    window.print();
}

// Inisialisasi
document.addEventListener('DOMContentLoaded', () => {
    new MyTickets();
});

// Export untuk akses global
window.CinemaXXIApp = CinemaXXIApp;
