class ProductToManufacturing {
    constructor (contractor, product, labour_cost_per_pcs, cur_date, raw_id,id) {
       
        this.contractor = contractor;
        this.product = product;
        this.labour_cost_per_pcs = labour_cost_per_pcs;
        this.cur_date=cur_date;
        this.raw_id = raw_id;
        this.id = id
    }
}

module.exports = ProductToManufacturing;