class User{

    constructor(firstName, lastName, dateOfBirth, address, mail, password, idUser) {
        this._firstName = firstName;
        this._lastName = lastName;
        this._dateOfBirth = dateOfBirth;
        this._address = address;
        this._mail = mail;
        this._password = password;
        this._idUser = idUser;
    }

    get firstName() {
        return this._firstName;
    }
    set firstName(value) {
        this._firstName = value;
    }

    get lastName() {
        return this._lastName;
    }
    set lastName(value) {
        this._lastName = value;
    }

    get dateOfBirth() {
        return this._dateOfBirth;
    }
    set dateOfBirth(value) {
        this._dateOfBirth = value;
    }

    get address() {
        return this._address;
    }
    set address(value) {
        this._address = value;
    }

    get mail() {
        return this._mail;
    }
    set mail(value) {
        this._mail = value;
    }

    get password() {
        return this._password;
    }
    set password(value) {
        this._password = value;
    }
    
    get idUser() {
        return this._idUser;
    }
    set idUser(value) {
        this._idUser = value;
    }

    toString() {
        return `User{firstName: ${this._firstName}, lastName: ${this._lastName}, dateOfBirth: ${this._dateOfBirth}, address: ${this._address}, mail: ${this._mail}, password: ${this._password}}`;
    }
}
let user = new User("ethan", "riahi", "24 juin 1999", "6 rue de la miage", "user@budgetboss.com", "123");
console.log(user.toString());
