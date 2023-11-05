export function getEle(id) {
    return document.getElementById(id);
}

export function kiemTraRong(value, idCanhBao, mess) {
  var domTheSpan = getEle(idCanhBao);

  if (!value) {
    domTheSpan.style.display = "block";
    domTheSpan.innerHTML = mess;
    return false;
  } else {
    domTheSpan.innerHTML = "";
    return true;
  }
}

export function kiemTraDoDaiKyTu(value, min, max, idCanhBao, mess) {
  var domTheSpan = getEle(idCanhBao);

  if (value.length < min || value.length > max) {
    domTheSpan.style.display = "block";
    domTheSpan.innerHTML = mess;
    return false;
  } else {
    domTheSpan.innerHTML = "";
    return true;
  }
}

export function kiemTraTen(hoTen, idCanhBao, mess) {
  var domTheSpan = getEle(idCanhBao);

  var regexName = /^[a-zA-Z]+$/;
  var isValid = regexName.test(hoTen);

  if (isValid) {
    domTheSpan.innerHTML = "";
    return true;
  } else {
    domTheSpan.style.display = "block";
    domTheSpan.innerHTML = mess;
    return false;
  }
}

export function kiemTraEmail(email, idCanhBao, mess) {
  var domTheSpan = getEle(idCanhBao);

  var regexEmail =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  var isValid = regexEmail.test(email);

  if (isValid) {
    domTheSpan.innerHTML = "";
    return true;
  } else {
    domTheSpan.style.display = "block";
    domTheSpan.innerHTML = mess;
    return false;
  }
}

export function kiemTraSo(value, idCanhBao, mess) {
  var domTheSpan = document.getElementById(idCanhBao);

  var regexNumber = /^\d+$/;
  var isValid = regexNumber.test(value);
  if (!isNaN(value)) {
      domTheSpan.innerHTML = "";
      return true;
  } else {
      domTheSpan.innerHTML = mess;
      return false;
  }
}

export function kiemTraSoNgayLam(days, idCanhBao, mess) {
  var domTheSpan = getEle(idCanhBao);

  if (isNaN(days) || days < 0 || days == 0) {
    domTheSpan.style.display = "block";
    domTheSpan.innerHTML = mess;
    return false;
  } else {
    domTheSpan.innerHTML = "";
    return true;
  }
}

export function kiemTraLuong(salary, idCanhBao, mess) {
  var domTheSpan = getEle(idCanhBao);

  if (isNaN(salary) || salary < 100000 || salary > 500000) {
    domTheSpan.style.display = "block";
    domTheSpan.innerHTML = mess;
    return false;
  } else {
    domTheSpan.innerHTML = "";
    return true;
  }
}

export function kiemTraGiaTriHoaDon(valueProduct, idCanhBao, mess) {
  var domTheSpan = getEle(idCanhBao);

  if (isNaN(valueProduct) || valueProduct < 0 || valueProduct == 0) {
    domTheSpan.style.display = "block";
    domTheSpan.innerHTML = mess;
    return false;
  } else {
    domTheSpan.innerHTML = "";
    return true;
  }
}
