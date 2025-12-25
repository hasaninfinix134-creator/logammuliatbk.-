// --- Kontrol Sidebar ---
const menuBtn = document.getElementById("menuBtn");
const closeBtn = document.getElementById("closeBtn");
const sidebar = document.getElementById("sidebarMenu");
const overlay = document.getElementById("sidebarOverlay");

const closeSidebar = () => {
    sidebar.classList.remove("active");
    overlay.style.display = "none";
    document.body.style.overflow = "auto";
};

if (menuBtn) {
    menuBtn.onclick = () => {
        sidebar.classList.add("active");
        overlay.style.display = "block";
        document.body.style.overflow = "hidden";
    };
}
if (closeBtn) closeBtn.onclick = closeSidebar;
if (overlay) overlay.onclick = closeSidebar;

// --- Quantity Produk ---
const plusBtn = document.getElementById("plusBtn");
const minusBtn = document.getElementById("minusBtn");
const qtyInput = document.getElementById("qtyInput");

if (plusBtn && minusBtn) {
    plusBtn.onclick = () => { qtyInput.value = parseInt(qtyInput.value) + 1; };
    minusBtn.onclick = () => {
        if (parseInt(qtyInput.value) > 1) qtyInput.value = parseInt(qtyInput.value) - 1;
    };
}

// --- Logika Keranjang Belanja ---
const cartModal = document.getElementById("cartModal");
const cartIcon = document.getElementById("cartIcon");
const closeCart = document.getElementById("closeCart");
const btnAddCart = document.querySelector(".btn-add-cart");

const openCart = () => {
    renderCart();
    cartModal.style.display = "flex";
    document.body.style.overflow = "hidden";
};

const hideCart = () => {
    cartModal.style.display = "none";
    document.body.style.overflow = "auto";
};

if (cartIcon) cartIcon.onclick = openCart;
if (closeCart) closeCart.onclick = hideCart;

// Tambah ke Keranjang
if (btnAddCart) {
    btnAddCart.onclick = () => {
        const title = document.querySelector(".product-title").innerText;
        const price = document.querySelector(".product-price").innerText;
        const img = document.querySelector(".product-banner img").src;
        const qty = parseInt(qtyInput.value);

        let cart = JSON.parse(localStorage.getItem("myCart")) || [];
        cart.push({ title, price, img, qty, selected: true });
        localStorage.setItem("myCart", JSON.stringify(cart));
        
        alert("Berhasil ditambahkan!");
        openCart();
    };
}

// Render Keranjang
function renderCart() {
    const cart = JSON.parse(localStorage.getItem("myCart")) || [];
    const emptyState = document.getElementById("emptyState");
    const activeState = document.getElementById("cartActiveState");
    const itemList = document.getElementById("itemList");
    document.getElementById("cartBadge").innerText = cart.length;

    if (cart.length > 0) {
        emptyState.style.display = "none";
        activeState.style.display = "block";
        itemList.innerHTML = cart.map((item, index) => `
            <div class="cart-item-card">
                <label class="checkbox-container">
                    <input type="checkbox" onchange="toggleSelect(${index})" ${item.selected ? 'checked' : ''}>
                    <span class="checkmark"></span>
                </label>
                <img src="${item.img}" class="item-img-sm">
                <div class="item-details">
                    <div class="item-name">${item.title}</div>
                    <div class="item-price">${item.price}</div>
                </div>
                <div style="display:flex; align-items:center; gap:10px;">
                    <i class="fas fa-trash-alt" style="color:#ccc; cursor:pointer;" onclick="removeItem(${index})"></i>
                </div>
            </div>
        `).join("");
    } else {
        emptyState.style.display = "block";
        activeState.style.display = "none";
    }
    calculateTotal();
}

window.toggleSelect = (index) => {
    let cart = JSON.parse(localStorage.getItem("myCart")) || [];
    cart[index].selected = !cart[index].selected;
    localStorage.setItem("myCart", JSON.stringify(cart));
    calculateTotal();
};

window.removeItem = (index) => {
    let cart = JSON.parse(localStorage.getItem("myCart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("myCart", JSON.stringify(cart));
    renderCart();
};

function calculateTotal() {
    const cart = JSON.parse(localStorage.getItem("myCart")) || [];
    let total = 0;
    let count = 0;
    cart.forEach(item => {
        if (item.selected) {
            total += parseInt(item.price.replace(/[^0-9]/g, '')) * item.qty;
            count++;
        }
    });
    document.getElementById("cartTotalPrice").innerText = "Rp " + total.toLocaleString('id-ID');
    document.getElementById("selectedCount").innerText = count;
    const btn = document.getElementById("btnCheckout");
    btn.disabled = count === 0;
    count > 0 ? btn.classList.add("active") : btn.classList.remove("active");
}
// --- Tambahan Koneksi Sidebar ke Keranjang ---
const sideCartBtn = document.getElementById("sideCartBtn");

if (sideCartBtn) {
    sideCartBtn.onclick = () => {
        closeSidebar(); // Menutup sidebar terlebih dahulu
        openCart();     // Membuka modal keranjang
    };
}
