var swiper = new Swiper(".mySwiper", {
    pagination: {
        el: ".swiper-pagination",
        type: "fraction",
    },
    navigation: {
        nextEl: ".swiper-btn-next",
        prevEl: ".swiper-btn-prev",
    },
});
/*akıllı telefonlar swiper starts*/
var swiper = new Swiper(".smart-swiper",{
    scrollbar:{
        el:".swiper-scrollbar",
        hide:true,
    },
});

/*akıllı telefonlar swiper ends*/
/*bilgisayarlar*/
var swiper = new Swiper(".bilgisayar-swiper",{
    scrollbar:{
        el:".swiper-scrollbar",
        hide:true,
    },
});
/*saaat*/
var swiper = new Swiper(".saat-swiper",{
    scrollbar:{
        el:".swiper-scrollbar",
        hide:true,
    },
});

// Giriş/Kayıt Modalı
const authModal = document.getElementById('authModal');
const authLinks = document.querySelectorAll('.form div:first-child a');
const closeAuthModal = document.querySelector('#authModal .close');
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

// Modal açma
authLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    authModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
  });
});

// Modal kapatma
closeAuthModal.addEventListener('click', () => {
  authModal.style.display = 'none';
  document.body.style.overflow = 'auto';
});

// Dışarı tıklayarak kapatma
window.addEventListener('click', (e) => {
  if (e.target === authModal) {
    authModal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
});

// Tab değiştirme
tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const tabId = btn.getAttribute('data-tab');
    
    // Aktif tab butonunu değiştir
    tabBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    // Aktif içeriği değiştir
    tabContents.forEach(content => {
      content.classList.remove('active');
      if (content.id === tabId) {
        content.classList.add('active');
      }
    });
  });
});

// Form gönderme
document.getElementById('loginForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;
  
  // Burada giriş işlemleri yapılacak
  console.log('Giriş yapılıyor:', { email, password });
  authModal.style.display = 'none';
  document.body.style.overflow = 'auto';
});

document.getElementById('registerForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('registerName').value;
  const email = document.getElementById('registerEmail').value;
  const password = document.getElementById('registerPassword').value;
  const confirmPassword = document.getElementById('registerConfirmPassword').value;
  
  // Burada kayıt işlemleri yapılacak
  console.log('Kayıt yapılıyor:', { name, email, password, confirmPassword });
  authModal.style.display = 'none';
  document.body.style.overflow = 'auto';
});

// Sepet Fonksiyonları
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Sepet modalını aç/kapa
const cartModal = document.getElementById('cartModal');
const cartLink = document.querySelector('.form div:nth-child(2) a');
const closeCart = document.querySelector('.close-cart');

if (cartLink) {
  cartLink.addEventListener('click', function(e) {
    e.preventDefault();
    cartModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    updateCartUI();
  });
}

if (closeCart) {
  closeCart.addEventListener('click', function() {
    cartModal.style.display = 'none';
    document.body.style.overflow = 'auto';
  });
}

// Sepete ürün ekleme fonksiyonu
function setupAddToCartButtons() {
  document.querySelectorAll('.box').forEach(box => {
    const addButton = document.createElement('button');
    addButton.className = 'add-to-cart';
    addButton.textContent = 'Sepete Ekle';

    // Ürün kartına butonu ekle
    box.querySelector('.box-bottom').appendChild(addButton);

    // Tıklama olayı
    addButton.addEventListener('click', function (e) {
      e.stopPropagation();
      const product = {
        id: box.dataset.id || Math.random().toString(36).substr(2, 9),
        title: box.querySelector('.box-bottom h4').textContent,
        price: parseFloat(box.querySelector('.new-price').textContent.replace(' TL', '').replace('.', '').replace(',', '.')),
        image: box.querySelector('.box-top img').src,
        quantity: 1
      };

      addToCart(product);
    });
  });
}

// Sepete ürün ekle
function addToCart(product) {
  const existingItem = cart.find(item => item.id === product.id);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push(product);
  }
  
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartUI();
  showCartNotification();
}

// Sepetten ürün çıkar
function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartUI();
}

// Miktarı güncelle
function updateQuantity(productId, newQuantity) {
  const item = cart.find(item => item.id === productId);
  if (item) {
    item.quantity = Math.max(1, newQuantity);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
  }
}

// Sepet UI güncelleme
function updateCartUI() {
  const cartItemsContainer = document.querySelector('.cart-items');
  const cartSubtotal = document.querySelector('.cart-subtotal');
  const cartTotal = document.querySelector('.cart-total');
  
  // Sepet sayacını güncelle
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartLinkText = document.querySelector('.form div:nth-child(2) a');
  if (cartLinkText) {
    cartLinkText.textContent = `Sepet (${cartCount})`;
  }
  
  // Sepet öğelerini render et
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<div class="empty-cart">Sepetiniz boş</div>';
    cartSubtotal.textContent = '0 TL';
    cartTotal.textContent = '0 TL';
    return;
  }
  
  let itemsHTML = '';
  let subtotal = 0;
  
  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    subtotal += itemTotal;
    
    itemsHTML += `
      <div class="cart-item" data-id="${item.id}">
        <img src="${item.image}" alt="${item.title}" class="cart-item-img">
        <div class="cart-item-details">
          <div class="cart-item-title">${item.title}</div>
          <div class="cart-item-price">${item.price.toFixed(2).replace('.', ',')} TL</div>
          <div class="cart-item-actions">
            <div class="quantity-control">
              <button class="quantity-btn minus">-</button>
              <input type="number" class="quantity-input" value="${item.quantity}" min="1">
              <button class="quantity-btn plus">+</button>
            </div>
            <button class="remove-item">Kaldır</button>
          </div>
        </div>
      </div>
    `;
  });
  
  cartItemsContainer.innerHTML = itemsHTML;
  cartSubtotal.textContent = subtotal.toFixed(2).replace('.', ',') + ' TL';
  cartTotal.textContent = subtotal.toFixed(2).replace('.', ',') + ' TL';
  
  // Miktar değiştirme olayları
  document.querySelectorAll('.quantity-btn.minus').forEach(btn => {
    btn.addEventListener('click', function() {
      const itemId = this.closest('.cart-item').dataset.id;
      const input = this.nextElementSibling;
      const newQuantity = parseInt(input.value) - 1;
      updateQuantity(itemId, newQuantity);
    });
  });
  
  document.querySelectorAll('.quantity-btn.plus').forEach(btn => {
    btn.addEventListener('click', function() {
      const itemId = this.closest('.cart-item').dataset.id;
      const input = this.previousElementSibling;
      const newQuantity = parseInt(input.value) + 1;
      updateQuantity(itemId, newQuantity);
    });
  });
  
  document.querySelectorAll('.quantity-input').forEach(input => {
    input.addEventListener('change', function() {
      const itemId = this.closest('.cart-item').dataset.id;
      const newQuantity = parseInt(this.value) || 1;
      updateQuantity(itemId, newQuantity);
    });
  });
  
  // Ürün kaldırma olayları
  document.querySelectorAll('.remove-item').forEach(btn => {
    btn.addEventListener('click', function() {
      const itemId = this.closest('.cart-item').dataset.id;
      removeFromCart(itemId);
    });
  });
}

// Sepet bildirimi göster
function showCartNotification() {
  const notification = document.createElement('div');
  notification.className = 'cart-notification';
  notification.textContent = 'Ürün sepete eklendi!';
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.classList.add('show');
  }, 10);
  
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 2000);
}

// Sepet bildirimi için CSS
const cartNotificationStyle = document.createElement('style');
cartNotificationStyle.textContent = `
  .cart-notification {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: #008ECC;
    color: white;
    padding: 12px 20px;
    border-radius: 4px;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
    transform: translateY(100px);
    opacity: 0;
    transition: all 0.3s ease;
    z-index: 1000;
  }
  
  .cart-notification.show {
    transform: translateY(0);
    opacity: 1;
  }
`;
document.head.appendChild(cartNotificationStyle);

// Ödeme butonu olayı
document.querySelector('.checkout-btn')?.addEventListener('click', function() {
  if (cart.length === 0) {
    alert('Sepetiniz boş!');
    return;
  }
  
  // Burada ödeme işlemleri yapılacak
  alert('Ödeme sayfasına yönlendiriliyorsunuz...');
  console.log('Ödeme yapılacak ürünler:', cart);
});

// Sayfa yüklendiğinde sepet butonlarını ayarla
document.addEventListener('DOMContentLoaded', function() {
  setupAddToCartButtons();
  updateCartUI();
});

// Arama fonksiyonu
const searchInput = document.querySelector('.search input');
const searchButton = document.querySelector('.search img:first-child');
const listButton = document.querySelector('.search img:last-child');

// Kategoriler
const categories = [
    { name: 'Telefonlar', url: 'tum-urunler.html?kategori=telefonlar' },
    { name: 'Bilgisayarlar', url: 'tum-urunler.html?kategori=bilgisayarlar' },
    { name: 'Akıllı Saatler', url: 'tum-urunler.html?kategori=saatler' },
    { name: 'Donanım Malzemeleri', url: 'tum-urunler.html?kategori=donanim' },
    { name: 'Aksesuarlar', url: 'tum-urunler.html?kategori=aksesuarlar' }
];

// Arama fonksiyonu
searchButton.addEventListener('click', () => {
    const searchTerm = searchInput.value.toLowerCase();
    if (searchTerm) {
        window.location.href = `tum-urunler.html?kategori=telefonlar&search=${searchTerm}`;
    }
});

// Enter tuşu ile arama
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const searchTerm = searchInput.value.toLowerCase();
        if (searchTerm) {
            window.location.href = `tum-urunler.html?kategori=telefonlar&search=${searchTerm}`;
        }
    }
});

// Kategori listesi
let categoryList = null;

listButton.addEventListener('click', () => {
    if (categoryList) {
        categoryList.remove();
        categoryList = null;
        return;
    }

    categoryList = document.createElement('div');
    categoryList.className = 'category-list';
    categoryList.style.cssText = `
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        background: white;
        border: 1px solid #ddd;
        border-radius: 4px;
        padding: 10px;
        z-index: 1000;
        box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        margin-top: 5px;
    `;

    categories.forEach(category => {
        const link = document.createElement('a');
        link.href = category.url;
        link.textContent = category.name;
        link.style.cssText = `
            display: block;
            padding: 12px 15px;
            color: #333;
            text-decoration: none;
            transition: background 0.3s;
            border-bottom: 1px solid #eee;
            font-size: 14px;
        `;
        link.addEventListener('mouseover', () => {
            link.style.background = '#f5f5f5';
        });
        link.addEventListener('mouseout', () => {
            link.style.background = 'white';
        });
        categoryList.appendChild(link);
    });

    const searchContainer = document.querySelector('.search');
    searchContainer.style.position = 'relative';
    searchContainer.appendChild(categoryList);

    // Dışarı tıklandığında listeyi kapat
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search')) {
            if (categoryList) {
                categoryList.remove();
                categoryList = null;
            }
        }
    });
});