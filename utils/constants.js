const formContactRegProcedures = document.forms.contactForm;
//console.log(formContactRegProcedures);

if (!formContactRegProcedures) {
  //console.log("не нашли контактную форму для валидации");
} else {
  //  console.log("нашли контактную форму для валидации");
}

const buttonSubmitContactForm = formContactRegProcedures.querySelector(
  ".registration__formRegisterButton"
);

export { formContactRegProcedures, buttonSubmitContactForm };
