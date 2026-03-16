import ProductData from "./ProductData.js";

const params = new URLSearchParams(window.location.search);
const productId = params.get("product");

const dataSource = new ProductData("tents");

async function init() {

  if (!productId) {
    document.querySelector("#product-detail").innerHTML =
      "<p>No product selected.</p>";
    return;
  }

  const product = await dataSource.findById(productId);

  if (!product) {
    document.querySelector("#product-detail").innerHTML =
      "<p>Product not found.</p>";
    return;
  }

  renderProduct(product);
}

function renderProduct(product) {
  const container = document.querySelector("#product-detail");

  // calculate discount if it exists
  let discount = 0;

  if (product.SuggestedRetailPrice && product.SuggestedRetailPrice > product.FinalPrice) {
    discount = Math.round(
      ((product.SuggestedRetailPrice - product.FinalPrice) /
        product.SuggestedRetailPrice) * 100
    );
  }

  container.innerHTML = `
    <h2>${product.Name}</h2>

    <img src="${product.Image}" alt="${product.Name}">

    <p>${product.Description}</p>

    <p class="price">
      <strong>Price:</strong> $${product.FinalPrice}
      ${
        discount > 0
          ? `<span class="old-price">$${product.SuggestedRetailPrice}</span>
             <span class="discount">${discount}% OFF</span>`
          : ""
      }
    </p>

    <button id="addToCart">Add to Cart</button>
  `;

  document
    .getElementById("addToCart")
    .addEventListener("click", () => {

      const cartItem = {
        Id: product.Id,
        Name: product.Name,
        Image: product.Image,
        Colors: product.Colors,
        FinalPrice: product.FinalPrice,
        quantity: 1
      };

      let cart = JSON.parse(localStorage.getItem("so-cart")) || [];

      cart.push(cartItem);

      localStorage.setItem("so-cart", JSON.stringify(cart));

      alert("Product added to cart!");
    });
}

init();