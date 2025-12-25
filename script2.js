// 1. Sidebar Control (Membuka & Menutup Menu Garis Tiga)
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

// 2. Validasi Form Pendaftaran
const regForm = document.getElementById("regForm");

if (regForm) {
    regForm.addEventListener("submit", function(event) {
        // Browser akan otomatis menampilkan "Harap isi bidang ini" 
        // karena atribut 'required' ada di HTML.
        event.preventDefault(); 
        alert("Terima kasih, pendaftaran Anda berhasil disubmit!");
    });
}
