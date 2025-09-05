window.addEventListener('DOMContentLoaded', () => {
  // 🔗 Element references
  const cartBtn = document.getElementById('cart-btn');
  const cartContainer = document.querySelector('.cart-items-container');
  const cartTotalDisplay = document.getElementById('cart-total');
  const cartCountDisplay = document.getElementById('cart-count');
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  const checkoutBtn = document.getElementById('checkout-btn');

  // 🛒 Cart state
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  // 💡 Update cart UI
  function updateCartUI() {
    cartContainer.querySelectorAll('.cart-item').forEach(item => item.remove());

    let total = 0;
    cart.forEach((item, index) => {
      const cartItem = document.createElement('div');
      cartItem.classList.add('cart-item');
      cartItem.innerHTML = `
        <span class="fas fa-times" data-index="${index}"></span>
        <img src="${item.img}" alt="">
        <div class="content">
          <h3>${item.title}</h3>
          <div class="price">£${item.price.toFixed(2)}</div>
        </div>
      `;
      cartContainer.insertBefore(cartItem, cartContainer.querySelector('.cart-total'));
      total += item.price;
    });

    cartTotalDisplay.innerText = total.toFixed(2);
    cartCountDisplay.innerText = cart.length;

    // ❌ Remove item logic
    cartContainer.querySelectorAll('.fa-times').forEach(btn => {
      btn.addEventListener('click', () => {
        const index = btn.getAttribute('data-index');
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartUI();
      });
    });
  }

  // ➕ Add product to cart
  addToCartButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();

      const box = button.closest('.box');
      const title = box.querySelector('h3').innerText;
      const priceText = box.querySelector('.price').innerText;
      const price = parseFloat(priceText.replace('£', '').split(' ')[0]);
      const img = box.querySelector('img').src;

      cart.push({ title, price, img });
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartUI();
      cartContainer.classList.add('active');
    });
  });

  // 🛍 Toggle cart visibility
  cartBtn.addEventListener('click', () => {
    cartContainer.classList.toggle('active');
  });

  // ✅ Checkout functionality
  checkoutBtn.addEventListener('click', (e) => {
    e.preventDefault();

    cart = [];
    localStorage.removeItem('cart');
    updateCartUI();

    alert("✅ Payment successful!\nYour product is on its way to you. Thank you for your purchase!");
  });

  // 🔁 Initialize cart on page load
  updateCartUI();
});


// 🎯 Discover random product
document.getElementById('discoverBtn').addEventListener('click', function (e) {
  e.preventDefault();

  const products = document.querySelectorAll('.box');
  if (products.length === 0) return;

  const randomIndex = Math.floor(Math.random() * products.length);
  const selectedProduct = products[randomIndex];
  selectedProduct.scrollIntoView({ behavior: 'smooth', block: 'center' });
  selectedProduct.classList.add('highlight');
  setTimeout(() => selectedProduct.classList.remove('highlight'), 2000);
});

// 📱 Mobile menu toggle
const menu = document.querySelector('.navbar');
const menuBtn = document.querySelector('#menu-btn');
const closeBtn = document.querySelector('#close-navbar');

menuBtn.onclick = () => menu.classList.add('active');
closeBtn.onclick = () => menu.classList.remove('active');