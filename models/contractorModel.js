class Contractor {
    constructor (name, password, email, phone, personal_note , is_authorised, id) {
    
       this.name = name;
       this.password = password
       this.email = email;
       this.phone = phone;
       this.personal_note = personal_note;
       this.is_authorised = is_authorised;
       this.id = id
    }
}

module.exports = Contractor;