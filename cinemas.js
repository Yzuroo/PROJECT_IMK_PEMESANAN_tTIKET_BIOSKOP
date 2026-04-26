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
