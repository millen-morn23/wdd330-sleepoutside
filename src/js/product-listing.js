import ProductList from "./productList.js";
import ProductData from "./ProductData.js";
import { loadHeaderFooter, updateCartCount } from "./utils.mjs";

async function init() {
  // load header and footer
  await loadHeaderFooter();

  // update cart icon
  updateCartCount();

  // read category from URL
  const params = new URLSearchParams(window.location.search);
  const category = params.get("category");

  // update page title
  document.querySelector(".title").textContent =
    category.charAt(0).toUpperCase() + category.slice(1);

  // create data source
  const dataSource = new ProductData(category);

  // get product list container
  const listElement = document.querySelector(".product-list");

  // create product list
  const productList = new ProductList(category, dataSource, listElement);

  // load products
  productList.init();
}

init();