export const Validation = (name, surname, username, email, password, repeatPassword, role) => {
  return {
    validName: name !== null && String(name).length > 0,
    validSurname: surname !== null && String(surname).length > 0,
    validEmail: String(email).toLowerCase().match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ) !== null,
    validPassword:
      String(password).length >= 8 && String(password).length < 16,
    validRepeatPassword: repeatPassword === password,
    validUsername:
      String(username).length > 5 && String(username).length < 16,
    validRole: role !== null,
  };
};
