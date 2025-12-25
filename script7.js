// Sidebar Control
const menuBtn = document.getElementById("menuBtn");
const closeBtn = document.getElementById("closeBtn");
const sidebar = document.getElementById("sidebarMenu");
const overlay = document.getElementById("sidebarOverlay");

if (menuBtn) {
    menuBtn.onclick = () => {
        sidebar.classList.add("active");
        overlay.style.display = "block";
        document.body.style.overflow = "hidden";
    };
}

const closeSidebar = () => {
    sidebar.classList.remove("active");
    overlay.style.display = "none";
    document.body.style.overflow = "auto";
};

if (closeBtn) closeBtn.onclick = closeSidebar;
if (overlay) overlay.onclick = closeSidebar;

// Validasi Form Pembayaran
const paymentForm = document.getElementById("paymentForm");
if (paymentForm) {
    paymentForm.addEventListener("submit", function(e) {
        e.preventDefault();
        alert("Melanjutkan ke Metode Pengiriman...");
    });
}

