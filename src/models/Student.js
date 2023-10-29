import Person from "./Person.js";
export default class Student extends Person {
    constructor (id, name, address, email, math, phy, chem) {
        super(id, name, address, email);
        this.math = math;
        this.phy = phy;
        this.chem = chem;
        this.diemTB = 0;
        this.loaiSinhVien = "";
    }

    calAverage () {
        return this.diemTB = (Number(this.math) + Number(this.phy) + Number(this.chem)) / 3;
    }

    xepLoaiSinhVien () {
        if (this.diemTB >= 8) {
            return this.loaiSinhVien = "Giỏi";
        } else if (this.diemTB < 8 && this.diemTB > 6) {
            return this.loaiSinhVien = "Khá";
        } else {
            return this.loaiSinhVien = "Trung bình";
        }
    }
}