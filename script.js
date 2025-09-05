  window.addEventListener('DOMContentLoaded', () => {
    const cartBtn = document.getElementById('cart-btn');
    const cartContainer = document.querySelector('.cart-items-container');
    const cartTotalDisplay = document.getElementById('cart-total');
    const cartCountDisplay = document.getElementById('cart-count');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const checkoutBtn = document.getElementById('checkout-btn');

    let total = 0;
    let itemCount = 0;

    // Toggle cart visibility
    cartBtn.addEventListener('click', () => {
      cartContainer.classList.toggle('active');
    });

    // Add product to cart
    addToCartButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();

        const box = button.closest('.box');
        const title = box.querySelector('h3').innerText;
        const priceText = box.querySelector('.price').innerText;
        const price = parseFloat(priceText.replace('£', '').split(' ')[0]);

        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
          <span class="fas fa-times"></span>
          <img src="${box.querySelector('img').src}" alt="">
          <div class="content">
            <h3>${title}</h3>
            <div class="price">£${price.toFixed(2)}</div>
          </div>
        `;

        cartContainer.insertBefore(cartItem, cartContainer.querySelector('.cart-total'));

        total += price;
        itemCount++;
        cartTotalDisplay.innerText = total.toFixed(2);
        cartCountDisplay.innerText = itemCount;
        cartContainer.classList.add('active');

        // Remove item
        cartItem.querySelector('.fa-times').addEventListener('click', () => {
          cartItem.remove();
          total -= price;
          itemCount--;
          cartTotalDisplay.innerText = total.toFixed(2);
          cartCountDisplay.innerText = itemCount;
        });
      });
    });

    // Checkout functionality
    checkoutBtn.addEventListener('click', (e) => {
      e.preventDefault();

      const cartItems = cartContainer.querySelectorAll('.cart-item');
      cartItems.forEach(item => item.remove());

      total = 0;
      itemCount = 0;
      cartTotalDisplay.innerText = total.toFixed(2);
      cartCountDisplay.innerText = itemCount;

      alert("✅ Payment successful!\nYour product is on its way to you. Thank you for your purchase!");
    });
  });


   document.getElementById('discoverBtn').addEventListener('click', function(e) {
    e.preventDefault();

    const products = document.querySelectorAll('.box');
    if (products.length === 0) return;

    const randomIndex = Math.floor(Math.random() * products.length);
    const selectedProduct = products[randomIndex];
    selectedProduct.scrollIntoView({ behavior: 'smooth', block: 'center' });
    selectedProduct.classList.add('highlight');
    setTimeout(() => selectedProduct.classList.remove('highlight'), 2000);
  });
