class Product {
  constructor(name, raw, sr, sku, category, used_qty_in_meter, id) {
    this.name = name;
    this.raw = raw;
    this.sr = sr;
    this.sku = sku;
    this.category = category;
    this.used_qty_in_meter = used_qty_in_meter;
    this.id = id;
  }
}

module.exports = Product;
