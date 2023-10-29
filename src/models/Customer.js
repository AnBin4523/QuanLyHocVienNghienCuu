import Person from "./Person.js";
export default class Customer extends Person {
    constructor (id, name, address, email, nameCompany, billValue, review) {
        super(id, name, address, email);
        this.nameCompany = nameCompany;
        this.billValue = billValue;
        this.review = review;
    }
}