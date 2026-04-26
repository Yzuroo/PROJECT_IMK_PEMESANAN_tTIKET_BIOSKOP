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
