import Person from "./src/models/Person.js";
import Student from "./src/models/Student.js";
import Employee from "./src/models/Employee.js";
import Customer from "./src/models/Customer.js";
import ListPerson from "./src/models/ListPerson.js";

var listPerson = new ListPerson();

function layThongTinSinhVien() {
  var id = document.getElementById("idStudent").value;
  var name = document.getElementById("nameStudent").value;
  var address = document.getElementById("addressStudent").value;
  var email = document.getElementById("email").value;
  var math = document.getElementById("scoreMath").value;
  var phy = document.getElementById("scorePhy").value;
  var chem = document.getElementById("scoreChem").value;

  var student = new Student(id, name, address, email, math, phy, chem);
  student.calAverage();
  student.xepLoaiSinhVien();
  return student;
}

document.getElementById("btnThemSV2").onclick = themSinhVien;

function themSinhVien() {
  var student = layThongTinSinhVien();

  if (student) {
    listPerson.addPerson(student);

    renderListSV(listPerson.listPersonArr);
  }
}

function renderListSV(data) {
  var content = "";
  for (let i = 0; i < data.length; i++) {
    var student = data[i];

    content += `
        <tr>
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.email}</td>
            <td>${student.address}</td>
            <td>${student.math}</td>
            <td>${student.phy}</td>
            <td>${student.chem}</td>
            <td>${student.calAverage()}</td>
            <td>${student.xepLoaiSinhVien()}</td>
            <td>
                <button class = "btn btn-info" data-toggle="modal" data-target="#myModalStudent" onclick = "suaSV('${
                  student.id
                }')">Sửa</button>
                <button onclick = "xoaSV('${
                  student.id
                }')" class = "btn btn-danger">Xóa</button>
            </td>
        <tr>
    `;
  }

  document.getElementById("tableDanhSachSV").innerHTML = content;
}
