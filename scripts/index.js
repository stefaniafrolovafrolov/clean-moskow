/*import { PopupWithForm } from "./PopupWithForm.js";*/
import { formValidator } from "./formValidator.js";
import { validationConfig } from "../utils/validationConfig.js";
import {
  formContactRegProcedures,
  buttonSubmitContactForm,
} from "../utils/constants.js";

//валидация формы "Записаться на процедуру"
const formContactProceduresValidator = new formValidator(
  validationConfig,
  formContactRegProcedures
);

formContactProceduresValidator.enableValidation();
