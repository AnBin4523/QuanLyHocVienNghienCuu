import Person from "./Person.js";
export default class Employee extends Person {
    constructor (id, name, address, email, numberDay, salary) {
        super(id, name, address, email);
        this.numberDay = numberDay;
        this.salary = salary;
        this.loaiNhanVien = "";
    }

    calSalary () {
        return this.numberDay * this.salary;
    }
}