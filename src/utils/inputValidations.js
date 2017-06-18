// EMAIL VALIDATION RULES
// * exclude anything except letters, numbers, and ( . - ) before the @
// * allow pretty much anything except spaces between the @ and the . (for .com, etc.)
// * length after the . (as in .com) needs to be 2 chars. no numbers, or symbols

export function validateDOB(dateOfBirth) {
  var now = new Date();
  var dob = new Date(dateOfBirth);
  dob.setHours(0);
  now.setHours(0);
  if (dob < now) {
    return true;
  }
  return false;
}
// It's important to note that this probably WON'T catch everything,
// but it should catch most bad addresses.
export function validateEmail(value) {
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(value);
}

export function validateInitial(middleName) {
  const nameRegex = /^[A-z]+$/;
  return middleName.length === 1 && nameRegex.test(middleName);
}

export function validateNames(name) {
  const nameRegex = /^[A-z]+$/;
  return nameRegex.test(name);
}

export function validatePhone(phoneNumber) {
  var phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
  return phoneRegex.test(phoneNumber);
}

export function validateSSN(lastSSN) {
  var ssnRegex = /([0-9]{4})$/;
  return ssnRegex.test(lastSSN);
}

export function validateZip(zipCode) {
  var zipRegex = /([0-9]{5})$/;
  return zipRegex.test(zipCode);
}
