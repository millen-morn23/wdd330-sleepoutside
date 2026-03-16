import { loadHeaderFooter, updateCartCount, getLocalStorage } from "./utils.mjs";

async function init() {
  await loadHeaderFooter();
  updateCartCount();

  displayOrderSummary();

  const form = document.querySelector(".checkout-form");
  if (form) {
    form.addEventListener("submit", handleSubmit);
  }
}

function displayOrderSummary() {
  const cartItems = getLocalStorage("so-cart") || [];

  const summaryElement = document.querySelector(".checkout-summary");
  const totalElement = document.querySelector(".checkout-total");

  if (!summaryElement) return;

  const html = cartItems.map(
    (item) => `
    <li>
      <span>${item.Name} (x${item.quantity || 1})</span>
      <span>$${(item.FinalPrice * (item.quantity || 1)).toFixed(2)}</span>
    </li>
  `
  );

  summaryElement.innerHTML = html.join("");

  const total = cartItems.reduce((sum, item) => {
    const qty = item.quantity || 1;
    return sum + item.FinalPrice * qty;
  }, 0);

  totalElement.textContent = `Total: $${total.toFixed(2)}`;
}

function showMessage(text, type = "error") {
  const message = document.querySelector(".checkout-message");

  message.textContent = text;
  message.className = `checkout-message ${type}`;
}

function validateForm(data) {
  const zipPattern = /^\d{5}$/;
  const phonePattern = /^\d{10}$/;

  if (!data.fname || !data.lname || !data.address || !data.city || !data.state) {
    showMessage("Please fill out all required fields.");
    return false;
  }

  if (!zipPattern.test(data.zip)) {
    showMessage("Zip code must be 5 digits.");
    return false;
  }

  if (!phonePattern.test(data.phone)) {
    showMessage("Phone number must be 10 digits.");
    return false;
  }

  return true;
}

function handleSubmit(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());

  const cartItems = getLocalStorage("so-cart") || [];

  if (cartItems.length === 0) {
    showMessage("Your cart is empty.");
    return;
  }

  if (!validateForm(data)) return;

  const items = cartItems.map((item) => item.Id);

  const order = {
    fname: data.fname,
    lname: data.lname,
    street: data.address,
    city: data.city,
    state: data.state,
    zip: data.zip,
    phone: data.phone,
    items
  };

  console.log("Order ready:", order);

  showMessage("Order submitted successfully!", "success");

  localStorage.removeItem("so-cart");

  setTimeout(() => {
    window.location.href = "/index.html";
  }, 2000);
}

init();