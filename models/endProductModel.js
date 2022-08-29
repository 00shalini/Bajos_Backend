class EndProduct {
    constructor(expected_product, expected_raw_material,giving_date,recieved_product_date,raw_id) {
        this.expected_product = expected_product;
       this.expected_raw_material = expected_raw_material;
        this.giving_date = giving_date;
        this.recieved_product_date = recieved_product_date
        this.raw_id = raw_id;
    }
  }
  
  module.exports = EndProduct;
  