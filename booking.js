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
