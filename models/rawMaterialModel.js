class RawMaterial {
    constructor (name, sr, rmku, messure_unit,qty_in_meter,price_per_meter, id) {
       this.name = name;
       this.sr = sr;
       this.rmku = rmku;
       this.messure_unit = messure_unit;
       this.qty_in_meter = qty_in_meter;
       this.price_per_meter = price_per_meter
       this.id = id;
    }
}

module.exports = RawMaterial;