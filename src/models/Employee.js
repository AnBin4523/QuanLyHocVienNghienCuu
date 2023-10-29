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

    xepLoaiNhanVien () {
        if (this.numberDay >= 30) {
            return this.loaiNhanVien = "Giỏi";
        } else if (this.numberDay >= 20 && this.numberDay < 30) {
            return this.loaiNhanVien = "Khá";
        } else {
            return this.loaiNhanVien = "Trung bình";
        }
    }
}