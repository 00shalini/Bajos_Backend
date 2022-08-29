class Login {
    constructor (phone_number, password, is_authorised, id) {
       this.phone_number = phone_number;
       this.password = password;
       this.is_authorised= is_authorised;
       this.id =id
    }
}

module.exports  = Login;