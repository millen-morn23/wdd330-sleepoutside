export default class ProductData {
  constructor(category) {
    this.category = category;
    this.path = `/json/${category}.json`;
  }

  async getData() {
    const response = await fetch(this.path);
    const data = await response.json();
    return data;
  }

  async findById(id) {
    const data = await this.getData();
    return data.find((product) => product.Id === id);
  }
}