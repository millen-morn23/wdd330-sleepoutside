import { loadHeaderFooter, updateCartCount } from "./utils.mjs";

async function init() {
  // Load header and footer first
  await loadHeaderFooter();

  // Update the cart count after header loads
  updateCartCount();
}

init();