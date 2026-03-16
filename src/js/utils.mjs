// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export async function loadTemplate(path) {
  const response = await fetch(path);
  const html = await response.text();
  return html;
}

export async function loadHeaderFooter() {
  const header = await loadTemplate("/partials/header.html");
  const footer = await loadTemplate("/partials/footer.html");

  document.querySelector("header").innerHTML = header;
  document.querySelector("footer").innerHTML = footer;
}

// UPDATED CART COUNT FUNCTION
export function updateCartCount() {
  const cartItems = getLocalStorage("so-cart") || [];
  const countElement = document.querySelector(".cart-count");

  // calculate total quantity of items in cart
  const totalItems = cartItems.reduce((sum, item) => {
    return sum + (item.quantity || 1);
  }, 0);

  if (countElement) {
    countElement.textContent = totalItems;
  }
}

export async function sendOrder(order) {
  const url = "https://wdd330-sleepoutside-api.herokuapp.com/orders";

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(order)
  });

  const data = await response.json();
  return data;
}