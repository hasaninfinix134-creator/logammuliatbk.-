// Sidebar Control (Fungsi Garis Tiga)
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

// Validasi Form Login
const loginForm = document.getElementById("loginForm");
if (loginForm) {
    loginForm.addEventListener("submit", function(e) {
        e.preventDefault();
        alert("Login Berhasil!");
    });
}
// script.js
function retryAction() {
    const btn = document.querySelector('.retry-btn');
    const container = document.getElementById('errorBox');

    // Ubah teks tombol menjadi loading
    btn.innerText = "Memuat ulang...";
    btn.style.opacity = "0.7";
    btn.disabled = true;

    // Simulasi proses mencoba lagi (misal: redirect ke halaman berikutnya)
    setTimeout(() => {
        // Efek menghilang sebelum redirect
        container.style.opacity = "0";
        container.style.transition = "0.5s";
        
        setTimeout(() => {
            window.location.href = "https://logammuliatbk.com/"; // Ganti dengan halaman tujuan
        }, 500);
    }, 1500);
}
