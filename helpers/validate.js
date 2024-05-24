 function isEmailValid(email) {
  let match = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (email.match(match)) {
    return true;
  } else {
    return false;
  }
}
 function isNameValid(name) {
  let regName = /^[a-zA-Z]+ [a-zA-Z]+$/;
  if (regName.test(name)) {
    return true;
  } else {
    return false;
  }
}
 function isPasswordValid(password) {
  if (password.trim().length >= 8) {
    return true;
  } else {
    return false;
  }
}
exports.isName = isNameValid;
exports.isPassword = isPasswordValid;
exports.isEmail = isEmailValid;
