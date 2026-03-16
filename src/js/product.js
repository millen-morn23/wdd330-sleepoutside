import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

function addProductToCart(product) {
  // Get existing cart or initialize empty array
  let cart = getLocalStorage("so-cart");

  // If cart doesn't exist or isn't an array, make it an array
  if (!cart) {
    cart = [];
  } else if (!Array.isArray(cart)) {
    // Handle case where old data is a single object
    cart = [cart];
  }
  // Add new product to array
  cart.push(product);
  // Save array back to localStorage
  setLocalStorage("so-cart", cart);
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
