class Product {
  constructor(name, raw, sr, sku, category, id) {
    this.name = name;
    this.raw=  raw;
    // this.rm = rm;
    // this.qty = qty;
    this.sr = sr;
    this.sku = sku;
    
   
   
    this.category = category;
    this.id = id;
  }
}

module.exports = Product;
