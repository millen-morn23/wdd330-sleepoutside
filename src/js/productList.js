export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    const list = await this.dataSource.getData();

    // render all products in the category
    this.renderList(list);
  }

  renderList(list) {
    const htmlStrings = list.map((product) => productCardTemplate(product));
    this.listElement.innerHTML = htmlStrings.join("");
  }
}

function productCardTemplate(product) {

  // calculate discount if it exists
  let discount = 0;

  if (product.SuggestedRetailPrice && product.SuggestedRetailPrice > product.FinalPrice) {
    discount = Math.round(
      ((product.SuggestedRetailPrice - product.FinalPrice) /
        product.SuggestedRetailPrice) * 100
    );
  }

  return `
    <li class="product-card">
      <a href="/product_pages/product_detail.html?product=${product.Id}">
        <img src="${product.Image}" alt="${product.Name}" />

        <h3 class="card__brand">${product.Brand.Name}</h3>

        <h2 class="card__name">${product.Name}</h2>

        <p class="product-card__price">$${product.FinalPrice}</p>

        ${
          discount > 0
            ? `<p class="product-discount">${discount}% OFF</p>`
            : ""
        }

      </a>
    </li>
  `;
}