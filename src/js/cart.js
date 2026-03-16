import { getLocalStorage } from "./utils.mjs";
import { updateCartCount } from "./utils.mjs";

updateCartCount();

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const listElement = document.querySelector(".product-list");

  if (cartItems.length === 0) {
    listElement.innerHTML = "<p>Your cart is empty.</p>";

    const totalElement = document.querySelector(".cart-total");
    if (totalElement) {
      totalElement.textContent = "Total: $0";
    }
    return;
  }

  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  listElement.innerHTML = htmlItems.join("");

  calculateTotal(cartItems);

  // remove buttons
  document.querySelectorAll(".remove-item").forEach((button) => {
    button.addEventListener("click", (event) => {
      const id = event.target.closest(".cart-card").dataset.id;
      removeItemFromCart(id);
    });
  });

  // quantity increase
  document.querySelectorAll(".qty-plus").forEach((button) => {
    button.addEventListener("click", (event) => {
      const id = event.target.closest(".cart-card").dataset.id;
      updateQuantity(id, 1);
    });
  });

  // quantity decrease
  document.querySelectorAll(".qty-minus").forEach((button) => {
    button.addEventListener("click", (event) => {
      const id = event.target.closest(".cart-card").dataset.id;
      updateQuantity(id, -1);
    });
  });
}

function cartItemTemplate(item) {
  const newItem = `
  <li class="cart-card divider" data-id="${item.Id}">
    <a href="#" class="cart-card__image">
      <img src="${item.Image}" alt="${item.Name}" />
    </a>

    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>

    <p class="cart-card__color">${item.Colors[0].ColorName}</p>

    <div class="cart-card__quantity">
      <button class="qty-minus">−</button>
      <span class="qty">${item.quantity || 1}</span>
      <button class="qty-plus">+</button>
    </div>

    <p class="cart-card__price">$${item.FinalPrice}</p>

    <button class="remove-item">Remove</button>
  </li>
  `;
  return newItem;
}

function calculateTotal(cartItems) {
  const totalElement = document.querySelector(".cart-total");

  const total = cartItems.reduce((sum, item) => {
    const qty = item.quantity || 1;
    return sum + item.FinalPrice * qty;
  }, 0);

  if (totalElement) {
    totalElement.textContent = `Total: $${total.toFixed(2)}`;
  }
}

function removeItemFromCart(id) {
  let cartItems = getLocalStorage("so-cart") || [];

  cartItems = cartItems.filter((item) => item.Id !== id);

  localStorage.setItem("so-cart", JSON.stringify(cartItems));

  updateCartCount();
  renderCartContents();
}

function updateQuantity(id, change) {
  let cartItems = getLocalStorage("so-cart") || [];

  cartItems = cartItems.map((item) => {
    if (item.Id === id) {
      item.quantity = (item.quantity || 1) + change;

      if (item.quantity < 1) {
        item.quantity = 1;
      }
    }
    return item;
  });

  localStorage.setItem("so-cart", JSON.stringify(cartItems));

  renderCartContents();
}

renderCartContents();