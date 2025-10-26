// ===== MOBILE MENU TOGGLE =====
const navToggle = document.createElement('div');
navToggle.classList.add('nav-toggle');
navToggle.innerHTML = '&#9776;';
document.querySelector('header').appendChild(navToggle);

const navLinks = document.querySelector('.nav-links');
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 60,
        behavior: 'smooth'
      });
    }
    navLinks.classList.remove('active');
  });
});

// ===== DYNAMIC FOOTER YEAR =====
const footer = document.querySelector('footer p');
const currentYear = new Date().getFullYear();
footer.innerHTML = `© ${currentYear} Delicious Bites`;

// ===== CART FUNCTIONALITY =====
let cart = JSON.parse(localStorage.getItem('cart')) || [];

const cartCount = document.getElementById('cart-count');
const cartDropdown = document.getElementById('cart-dropdown');
const cartItemsList = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');
const cartBtn = document.getElementById('cart-btn');

// ===== UPDATE CART UI =====
function updateCartUI() {
  cartCount.textContent = cart.length;
  cartItemsList.innerHTML = '';

  let total = 0;
  cart.forEach((item, index) => {
    const li = document.createElement('li');
    li.innerHTML = `${item.name} <span>₹${item.price}</span>`;
    cartItemsList.appendChild(li);
    total += item.price;
  });

  cartTotal.textContent = `Total: ₹${total}`;
  localStorage.setItem('cart', JSON.stringify(cart)); // 🔹 Save to localStorage
}

// ===== ADD TO CART =====
document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', () => {
    const item = button.parentElement;
    const name = item.querySelector('h3').textContent;
    const price = parseInt(item.querySelector('.price').dataset.price);

    cart.push({ name, price });
    updateCartUI();
    
  });
});

// ===== SHOW/HIDE CART DROPDOWN =====
cartBtn.addEventListener('click', () => {
  cartDropdown.classList.toggle('active');
  updateCartUI(); // 🔹 Refresh cart each time it's opened
});

// ===== CHECKOUT BUTTON =====
checkoutBtn.addEventListener('click', () => {
  if (cart.length === 0) {
    alert('Your cart is empty!');
  } else {
    alert('Thank you for your order!');
    cart = [];
    updateCartUI();
    cartDropdown.classList.remove('active');
    localStorage.removeItem('cart'); // 🔹 Clear storage
  }
});

// ===== INITIAL LOAD =====
updateCartUI();