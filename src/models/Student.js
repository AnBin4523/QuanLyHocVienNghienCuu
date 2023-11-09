import Person from "./Person.js";
export default class Student extends Person {
    constructor (id, name, address, email, math, phy, chem) {
        super(id, name, address, email);
        this.math = math;
        this.phy = phy;
        this.chem = chem;
        this.diemTB = 0;
    }

    calAverage () {
        return this.diemTB = (Number(this.math) + Number(this.phy) + Number(this.chem)) / 3;
    }
}