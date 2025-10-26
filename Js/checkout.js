/* ===============================
   🧾 FUSION FEAST - CHECKOUT PAGE
   Handles displaying and clearing the cart
=============================== */

const checkoutItemsList = document.getElementById('checkout-cart-items');
const checkoutTotal = document.getElementById('checkout-total');
const placeOrderBtn = document.getElementById('place-order-btn');

// Fetch cart from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// ===== Update Checkout UI =====
function updateCheckoutUI() {
  checkoutItemsList.innerHTML = '';
  let total = 0;

  if (cart.length === 0) {
    checkoutItemsList.innerHTML = '<li>Your cart is empty 🛒</li>';
    checkoutTotal.textContent = '';
    placeOrderBtn.style.display = 'none';
    return;
  }

  cart.forEach((item, index) => {
    const li = document.createElement('li');
    li.classList.add('checkout-item');
    li.innerHTML = `
      <span>${item.name}</span>
      <span>₹${item.price}</span>
    `;
    checkoutItemsList.appendChild(li);
    total += item.price;
  });

  checkoutTotal.textContent = `Total Amount: ₹${total}`;
  placeOrderBtn.style.display = 'inline-block';
}

// ===== Handle Place Order =====
placeOrderBtn.addEventListener('click', () => {
  if (cart.length === 0) return;

  // Thank you message
  alert('🎉 Thank you for your order!\nYour delicious food is on the way!');

  // Clear cart
  localStorage.removeItem('cart');
  cart = [];
  updateCheckoutUI();
});

// ===== Initialize Page =====
updateCheckoutUI();