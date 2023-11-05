import Person from "./src/models/Person.js";
import Student from "./src/models/Student.js";
import Employee from "./src/models/Employee.js";
import Customer from "./src/models/Customer.js";
import ListPerson from "./src/models/ListPerson.js";
import {
  getEle,
  kiemTraRong,
  kiemTraDoDaiKyTu,
  kiemTraTen,
  kiemTraEmail,
  kiemTraSo,
  kiemTraSoNgayLam,
  kiemTraLuong,
  kiemTraGiaTriHoaDon,
} from "./src/controller/validation.js";

var listPerson = new ListPerson();

function layThongTinSinhVien() {
  var id = document.getElementById("idStudent").value;
  var name = document.getElementById("nameStudent").value;
  var address = document.getElementById("addressStudent").value;
  var email = document.getElementById("email").value;
  var math = document.getElementById("scoreMath").value;
  var phy = document.getElementById("scorePhy").value;
  var chem = document.getElementById("scoreChem").value;

  var isValid = true;
  // kiem tra ma hoc vien
  isValid &=
    kiemTraRong(id, "notiIdStudent", "Vui lòng không bỏ trống") &&
    kiemTraDoDaiKyTu(id, 6, 8, "notiIdStudent", "Mã học viên tối đa 6-8 ký tự");
  // kiem tra ten 
  isValid &=
    kiemTraRong(name, "notiNameStudent", "Vui lòng không bỏ trống") &&
    kiemTraTen(name, "notiNameStudent", "Tên học viên phải là chữ");
  // kiem tra dia chi
  isValid &= 
    kiemTraRong(address, "notiAddressStudent", "Vui lòng không bỏ trống");
  // kiem tra email
  isValid &=
    kiemTraRong(email, "notiEmail", "Vui lòng không bỏ trống") &&
    kiemTraEmail(email, "notiEmail", "Email phải đúng định dạng");
  // kiem tra diem
  isValid &=
    kiemTraRong(math, "notiScoreMath", "Vui lòng không bỏ trống") &&
    kiemTraSo(math, "notiScoreMath", "Vui lòng nhập đúng số");
  
  isValid &=
    kiemTraRong(phy, "notiScorePhy", "Vui lòng không bỏ trống") &&
    kiemTraSo(phy, "notiScorePhy", "Vui lòng nhập đúng số");

  isValid &=
    kiemTraRong(chem, "notiScoreChem", "Vui lòng không bỏ trống") &&
    kiemTraSo(chem, "notiScoreChem", "Vui lòng nhập đúng số");

  if (!isValid) {
    return null;
  }

  var student = new Student(id, name, address, email, math, phy, chem);
  student.calAverage();
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

// filter table
document.addEventListener("DOMContentLoaded", function () {
  const tableDropdown = document.querySelector(".dropdown-menu");
  const tableNameButtons = tableDropdown.querySelectorAll(".tableName");
  const tableContainers = document.querySelectorAll(".container");
  const rootContainer = document.querySelector("#root");

  tableNameButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const selectedTable = button.value;
      tableContainers.forEach(function (container) {
        container.style.display = "none";
        rootContainer.style.display = "block";
      });

      const selectedTableContainer = document.querySelector(
        `.${selectedTable}`
      );
      if (selectedTableContainer) {
        selectedTableContainer.style.display = "block";
      }
    });
  });
});

