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

const listPerson = new ListPerson();

getLocalStorage("student", "employee", "customer");

// if (storedStudents) {
//   // Data is available in local storage
//   renderListSV(storedStudents);
//   // renderListNV(storedEmployee);
//   // renderListKH(storedCustomer);
// } else {
//   // Data is not available in local storage
//   console.log("No data found in local storage.");
// }

// student
function layThongTinSinhVien() {
  var id = document.getElementById("idStudent").value;
  var name = document.getElementById("nameStudent").value;
  var address = document.getElementById("addressStudent").value;
  var email = document.getElementById("emailStudent").value;
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
  isValid &= kiemTraRong(
    address,
    "notiAddressStudent",
    "Vui lòng không bỏ trống"
  );
  // kiem tra email
  isValid &=
    kiemTraRong(email, "notiEmailStudent", "Vui lòng không bỏ trống") &&
    kiemTraEmail(email, "notiEmailStudent", "Email phải đúng định dạng");
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

    setLocalStorage("student", listPerson.listPersonArr);
  }
}

function renderListSV(data) {
  var content = "";
  for (let i = 0; i < data.length; i++) {
    var student = data[i];
    var student1 = new Student(
      student.id,
      student.name,
      student.address,
      student.email,
      student.math,
      student.phy,
      student.chem
    );

    content += `
        <tr>
            <td>${student1.id}</td>
            <td>${student1.name}</td>
            <td>${student1.email}</td>
            <td>${student1.address}</td>
            <td>${student1.math}</td>
            <td>${student1.phy}</td>
            <td>${student1.chem}</td>
            <td>${student1.calAverage()}</td>

            <td>
                <button class = "btn btn-info" data-toggle="modal" data-target="#myModalStudent" onclick = "suaSV('${
                  student1.id
                }')">Sửa</button>
                <button onclick = "xoaSV('${
                  student1.id
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

// xoa sinh vien
window.xoaSV = function xoaSV(id) {
  listPerson.removePersonById(id);

  renderListSV(listPerson.listPersonArr);

  setLocalStorage("student", listPerson.listPersonArr);
};

// sua cap nhat sinh vien
window.suaSV = function suaSV(id) {
  var student = listPerson.getInformationById(id);
  if (student) {
    getEle("idStudent").value = student.id;
    getEle("idStudent").disabled = true;

    getEle("nameStudent").value = student.name;
    getEle("addressStudent").value = student.address;
    getEle("emailStudent").value = student.email;
    getEle("scoreMath").value = student.math;
    getEle("scorePhy").value = student.phy;
    getEle("scoreChem").value = student.chem;
  }
};

document.getElementById("btnCapNhatSV").onclick = capNhatSV;

function capNhatSV() {
  var student = layThongTinSinhVien();
  if (student) {
    listPerson.updatePerson(student);

    renderListSV(listPerson.listPersonArr);

    setLocalStorage("student", listPerson.listPersonArr);
  }
}

// local storage
function setLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getLocalStorage(key) {
  const storedValue = localStorage.getItem(key);
  return storedValue ? JSON.parse(storedValue) : null;
}

// employee
function layThongTinNhanVien() {
  var id = document.getElementById("idEmployee").value;
  var name = document.getElementById("nameEmployee").value;
  var address = document.getElementById("addressEmployee").value;
  var email = document.getElementById("emailEmployee").value;
  var numberDay = document.getElementById("numberDay").value;
  var salary = document.getElementById("salary").value;

  var isValid = true;
  // kiem tra ma nhan vien
  isValid &=
    kiemTraRong(id, "notiIdEmployee", "Vui lòng không bỏ trống") &&
    kiemTraDoDaiKyTu(
      id,
      6,
      8,
      "notiIdEmployee",
      "Mã nhân viên tối đa 6-8 ký tự"
    );
  // kiem tra ten nhan vien
  isValid &=
    kiemTraRong(name, "notiNameEmployee", "Vui lòng không bỏ trống") &&
    kiemTraTen(name, "notiNameEmployee", "Tên nhân viên phải là chữ");
  // kiem tra email
  isValid &=
    kiemTraRong(email, "notiEmailEmployee", "Vui lòng không bỏ trống") &&
    kiemTraEmail(email, "notiEmailEmployee", "Email phải đúng định dạng");
  // kiem tra dia chi
  isValid &= kiemTraRong(
    address,
    "notiAddressEmployee",
    "Vui lòng không bỏ trống"
  );
  // kiem tra so ngay lam
  isValid &=
    kiemTraRong(numberDay, "notiNumberDay", "Vui lòng không bỏ trống") &&
    kiemTraSoNgayLam(
      numberDay,
      "notiNumberDay",
      "Số ngày làm phải là số và lớn hơn 0"
    );
  // kiem tra luong
  isValid &=
    kiemTraRong(salary, "notiSalary", "Vui lòng không bỏ trống") &&
    kiemTraLuong(
      salary,
      "notiSalary",
      "Số lương phải là số và trong khoảng 100k - 500k"
    );

  if (!isValid) {
    return null;
  }

  var employee = new Employee(id, name, address, email, numberDay, salary);
  employee.calSalary();
  return employee;
}

document.getElementById("btnThemNV2").onclick = themNhanVien;

function themNhanVien() {
  var employee = layThongTinNhanVien();

  if (employee) {
    listPerson.addPerson(employee);

    renderListNV(listPerson.listPersonArr);

    setLocalStorage("employee", listPerson.listPersonArr);
  }
}

function renderListNV(data) {
  var content = "";
  for (let i = 0; i < data.length; i++) {
    var employee = data[i];
    var employee1 = new Employee(
      employee.id,
      employee.name,
      employee.address,
      employee.email,
      employee.numberDay,
      employee.salary
    );

    content += `
        <tr>
            <td>${employee1.id}</td>
            <td>${employee1.name}</td>
            <td>${employee1.address}</td>
            <td>${employee1.email}</td>
            <td>${employee1.numberDay}</td>
            <td>${employee1.salary}</td>
            <td>${employee1.calSalary()}</td>
            <td>
                <button class = "btn btn-info" data-toggle="modal" data-target="#myModalEmployee" onclick = "suaNV('${
                  employee1.id
                }')">Sửa</button>
                <button onclick = "xoaNV('${
                  employee1.id
                }')" class = "btn btn-danger">Xóa</button>
            </td>
        <tr>
    `;
  }

  document.getElementById("tableDanhSachNV").innerHTML = content;
}

// xoa nhan vien
window.xoaNV = function xoaNV(id) {
  listPerson.removePersonById(id);

  renderListNV(listPerson.listPersonArr);

  setLocalStorage("employee", listPerson.listPersonArr);
};

// sua cap nhat nhan vien
window.suaNV = function suaNV(id) {
  var employee = listPerson.getInformationById(id);
  if (employee) {
    getEle("idEmployee").value = employee.id;
    getEle("idEmployee").disabled = true;

    getEle("nameEmployee").value = employee.name;
    getEle("addressEmployee").value = employee.address;
    getEle("emailEmployee").value = employee.email;
    getEle("numberDay").value = employee.numberDay;
    getEle("salary").value = employee.salary;
  }
};

document.getElementById("btnCapNhatNV").onclick = capNhatNV;

function capNhatNV() {
  var employee = layThongTinNhanVien();
  if (employee) {
    listPerson.updatePerson(employee);

    renderListNV(listPerson.listPersonArr);

    setLocalStorage("employee", listPerson.listPersonArr);
  }
}

// customer
function layThongTinKhachHang() {
  var id = document.getElementById("idCustomer").value;
  var name = document.getElementById("nameCustomer").value;
  var address = document.getElementById("addressCustomer").value;
  var email = document.getElementById("emailCustomer").value;
  var nameCompany = document.getElementById("nameCompany").value;
  var billValue = document.getElementById("billValue").value;
  var review = document.getElementById("review").value;

  var isValid = true;
  // kiem tra ma khach hang
  isValid &=
    kiemTraRong(id, "notiIdCustomer", "Vui lòng không bỏ trống") &&
    kiemTraDoDaiKyTu(
      id,
      6,
      8,
      "notiIdCustomer",
      "Mã khách hàng tối đa 6-8 ký tự"
    );
  // kiem tra ten khach hang
  isValid &=
    kiemTraRong(name, "notiNameCustomer", "Vui lòng không bỏ trống") &&
    kiemTraTen(name, "notiNameCustomer", "Tên khách hàng phải là chữ");
  // kiem tra email
  isValid &=
    kiemTraRong(email, "notiEmailCustomer", "Vui lòng không bỏ trống") &&
    kiemTraEmail(email, "notiEmailCustomer", "Email phải đúng định dạng");
  // kiem tra dia chi
  isValid &= kiemTraRong(
    address,
    "notiAddressCustomer",
    "Vui lòng không bỏ trống"
  );
  // kiem tra ten cong ty
  isValid &=
    kiemTraRong(nameCompany, "notiNameCompany", "Vui lòng không bỏ trống") &&
    kiemTraTen(nameCompany, "notiNameCompany", "Tên công ty phải là chữ");
  // kiem tra gia tri hoa don
  isValid &=
    kiemTraRong(billValue, "notiBillValue", "Vui lòng không bỏ trống") &&
    kiemTraSo(billValue, "notiBillValue", "Gía trị hóa đơn phải là số");
  // kiem tra danh gia
  isValid &= kiemTraRong(review, "notiReview", "Vui lòng không bỏ trống");

  if (!isValid) {
    return null;
  }

  var customer = new Customer(id, name, address, email, nameCompany, billValue, review);
  return customer;
}

document.getElementById("btnThemKH2").onclick = themKhachHang;

function themKhachHang() {
  var customer = layThongTinKhachHang();

  if (customer) {
    listPerson.addPerson(customer);

    renderListKH(listPerson.listPersonArr);

    setLocalStorage("customer", listPerson.listPersonArr);
  }
}

function renderListKH(data) {
  var content = "";
  for (let i = 0; i < data.length; i++) {
    var customer = data[i];
    var customer1 = new Customer(
      customer.id,
      customer.name,
      customer.address,
      customer.email,
      customer.nameCompany,
      customer.billValue,
      customer.review
    );

    content += `
        <tr>
            <td>${customer1.id}</td>
            <td>${customer1.name}</td>
            <td>${customer1.address}</td>
            <td>${customer1.email}</td>
            <td>${customer1.nameCompany}</td>
            <td>${customer1.billValue}</td>
            <td>${customer1.review}</td>

            <td>
                <button class = "btn btn-info" data-toggle="modal" data-target="#myModalCustomer" onclick = "suaKH('${
                  customer1.id
                }')">Sửa</button>
                <button onclick = "xoaKH('${
                  customer1.id
                }')" class = "btn btn-danger">Xóa</button>
            </td>
        <tr>
    `;
  }

  document.getElementById("tableDanhSachKH").innerHTML = content;
}

// xoa khach hang
window.xoaKH = function xoaKH(id) {
  listPerson.removePersonById(id);

  renderListKH(listPerson.listPersonArr);

  setLocalStorage("customer", listPerson.listPersonArr);
};

// sua cap nhat khach hang
window.suaKH = function suaKH(id) {
  var customer = listPerson.getInformationById(id);
  if (customer) {
    getEle("idCustomer").value = customer.id;
    getEle("idCustomer").disabled = true;

    getEle("nameCustomer").value = customer.name;
    getEle("addressCustomer").value = customer.address;
    getEle("emailCustomer").value = customer.email;
    getEle("nameCompany").value = customer.nameCompany;
    getEle("billValue").value = customer.billValue;
    getEle("review").value = customer.review;
  }
};

document.getElementById("btnCapNhatKH").onclick = capNhatKH;

function capNhatKH() {
  var customer = layThongTinKhachHang();
  if (customer) {
    listPerson.updatePerson(customer);

    renderListKH(listPerson.listPersonArr);

    setLocalStorage("customer", listPerson.listPersonArr);
  }
}