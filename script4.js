// Data State
let cart = [];

// Sidebar Control (Kode Asli Anda)
const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebarMenu");
const overlay = document.getElementById("sidebarOverlay");
const closeBtn = document.getElementById("closeBtn");

menuBtn.onclick = () => {
    sidebar.classList.add("active");
    overlay.style.display = "block";
    document.body.style.overflow = "hidden";
};

const hideSidebar = () => {
    sidebar.classList.remove("active");
    overlay.style.display = "none";
    document.body.style.overflow = "auto";
};
closeBtn.onclick = hideSidebar;
overlay.onclick = hideSidebar;

// Modal Filter Urutan (Kode Asli Anda)
const sortTrigger = document.getElementById("openSortModal");
const sortModal = document.getElementById("sortModalOverlay");
const sortItems = document.querySelectorAll(".modal-sort-item");
const sortText = document.getElementById("currentSortText");

if(sortTrigger) {
    sortTrigger.onclick = () => { sortModal.style.display = "flex"; };
}

sortModal.onclick = (e) => {
    if(e.target === sortModal) sortModal.style.display = "none";
};

sortItems.forEach(item => {
    item.onclick = () => {
        document.querySelector(".modal-sort-item.active").classList.remove("active");
        item.classList.add("active");
        sortText.innerText = item.querySelector("span").innerText;
        setTimeout(() => { sortModal.style.display = "none"; }, 300);
    };
});

// --- LOGIKA KERANJANG BELANJA BARU ---

const cartBtn = document.getElementById("cartBtn");
const cartOverlay = document.getElementById("cartOverlay");
const closeCart = document.getElementById("closeCart");
const sidebarCartBtn = document.getElementById("sidebarCartBtn");

// Buka/Tutup Keranjang
const toggleCart = () => {
    cartOverlay.style.display = cartOverlay.style.display === "flex" ? "none" : "flex";
    if(cartOverlay.style.display === "flex") hideSidebar();
    renderCart();
};

cartBtn.onclick = toggleCart;
closeCart.onclick = toggleCart;
sidebarCartBtn.onclick = toggleCart;

// Fungsi Tambah Barang
window.addToCart = (title, price, img) => {
    const existingIndex = cart.findIndex(item => item.title === title);
    
    if(existingIndex > -1) {
        cart[existingIndex].qty += 1;
    } else {
        cart.push({ title, price, img, qty: 1 });
    }
    
    updateBadge();
    alert("Berhasil ditambahkan ke keranjang!");
};

// Update Badge Angka Merah
function updateBadge() {
    const totalQty = cart.reduce((acc, item) => acc + item.qty, 0);
    document.getElementById("cartBadge").innerText = totalQty;
}

// Render Item di dalam Modal
function renderCart() {
    const container = document.getElementById("cartItems");
    const totalText = document.getElementById("cartTotal");
    const checkoutBtn = document.getElementById("checkoutBtn");
    
    if(cart.length === 0) {
        container.innerHTML = '<p class="empty-text">Keranjang masih kosong.</p>';
        totalText.innerText = "Rp 0";
        checkoutBtn.disabled = true;
        checkoutBtn.classList.remove("active");
        checkoutBtn.innerText = "Checkout (0)";
        return;
    }

    let html = "";
    let totalHarga = 0;
    let totalQty = 0;

    cart.forEach((item, index) => {
        totalHarga += (item.price * item.qty);
        totalQty += item.qty;
        html += `
            <div class="cart-item-ui">
                <img src="${item.img}" alt="prod">
                <div class="item-details">
                    <h4>${item.title}</h4>
                    <p>Rp ${item.price.toLocaleString('id-ID')}</p>
                    <div class="qty-box">
                        <button onclick="updateQty(${index}, -1)">-</button>
                        <span>${item.qty}</span>
                        <button onclick="updateQty(${index}, 1)">+</button>
                    </div>
                </div>
                <i class="fas fa-trash-alt" onclick="removeItem(${index})" style="color:#ccc; cursor:pointer"></i>
            </div>
        `;
    });

    container.innerHTML = html;
    totalText.innerText = "Rp " + totalHarga.toLocaleString('id-ID');
    checkoutBtn.disabled = false;
    checkoutBtn.classList.add("active");
    checkoutBtn.innerText = `Checkout ( ${totalQty} )`;
}

// Fungsi Edit Quantity
window.updateQty = (index, change) => {
    cart[index].qty += change;
    if(cart[index].qty <= 0) {
        cart.splice(index, 1);
    }
    updateBadge();
    renderCart();
};

// Fungsi Hapus Item
window.removeItem = (index) => {
    cart.splice(index, 1);
    updateBadge();
    renderCart();
};
