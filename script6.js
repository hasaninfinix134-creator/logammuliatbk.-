// Inisialisasi saat halaman dimuat
document.addEventListener("DOMContentLoaded", () => {
    renderCart();

    // Tambahkan event listener tombol checkout di sini
    const btnCheckout = document.getElementById('btnCheckout');
    if (btnCheckout) {
        btnCheckout.addEventListener('click', function() {
            // Ganti 'payment.html' dengan halaman tujuan Anda
            window.location.href = 'payment.html';
        });
    }
});

// Fungsi Render Keranjang
function renderCart() {
    const cart = JSON.parse(localStorage.getItem("myCart")) || [];
    const emptyState = document.getElementById("emptyState");
    const activeState = document.getElementById("cartActiveState");
    const itemList = document.getElementById("itemList");
    const badge = document.getElementById("cartBadge");

    badge.innerText = cart.length;

    if (cart.length === 0) {
        emptyState.style.display = "block";
        activeState.style.display = "none";
        return;
    }

    emptyState.style.display = "none";
    activeState.style.display = "block";

    itemList.innerHTML = cart.map((item, index) => `
        <div class="cart-item-card">
            <label class="checkbox-container">
                <input type="checkbox" onchange="toggleItemSelect(${index})" ${item.selected ? 'checked' : ''}>
                <span class="checkmark"></span>
            </label>
            <img src="${item.img}" class="item-img-sm">
            <div class="item-details">
                <div class="item-name">${item.title}</div>
                <div class="item-price">${item.price}</div>
            </div>
            <i class="fas fa-trash-alt" style="color:#ddd; cursor:pointer;" onclick="removeItem(${index})"></i>
        </div>
    `).join("");

    calculateTotal();
}

// Pilih/Hapus Centang Item Tunggal
function toggleItemSelect(index) {
    let cart = JSON.parse(localStorage.getItem("myCart")) || [];
    cart[index].selected = !cart[index].selected;
    localStorage.setItem("myCart", JSON.stringify(cart));
    calculateTotal();
}

// Pilih Semua Item
function toggleSelectAll(checkbox) {
    let cart = JSON.parse(localStorage.getItem("myCart")) || [];
    cart.forEach(item => item.selected = checkbox.checked);
    localStorage.setItem("myCart", JSON.stringify(cart));
    renderCart();
}

// Hapus Satu Item
function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem("myCart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("myCart", JSON.stringify(cart));
    renderCart();
}

// Hapus Item yang Dipilih (Bulk Delete)
function removeSelected() {
    let cart = JSON.parse(localStorage.getItem("myCart")) || [];
    const newCart = cart.filter(item => !item.selected);
    localStorage.setItem("myCart", JSON.stringify(newCart));
    renderCart();
}

// Kalkulasi Total Harga
function calculateTotal() {
    const cart = JSON.parse(localStorage.getItem("myCart")) || [];
    let total = 0;
    let count = 0;

    cart.forEach(item => {
        if (item.selected) {
            // Menghilangkan karakter non-digit untuk konversi angka
            const price = parseInt(item.price.replace(/[^0-9]/g, ''));
            total += price * (item.qty || 1);
            count++;
        }
    });

    document.getElementById("cartTotalPrice").innerText = "Rp " + total.toLocaleString('id-ID');
    document.getElementById("selectedCount").innerText = count;

    // Update status tombol checkout
    const btn = document.getElementById("btnCheckout");
    if (count > 0) {
        btn.disabled = false;
        btn.classList.add("active");
    } else {
        btn.disabled = true;
        btn.classList.remove("active");
    }
}
// ...existing code...

document.addEventListener('DOMContentLoaded', function() {
    const btnCheckout = document.getElementById('btnCheckout');
    if (btnCheckout) {
        btnCheckout.addEventListener('click', function() {
            // Ganti 'pembayaran.html' dengan nama file tujuan Anda
            window.location.href = 'payment.html';
        });
    }
});

// ...existing code...