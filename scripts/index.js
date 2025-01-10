import { formValidator } from "./formValidator.js";
import { validationConfig } from "../utils/validationConfig.js";

import {
  formContactRegProcedures,
  buttonSubmitContactForm,
} from "../utils/constants.js";

const formContactProceduresValidator = new formValidator(
  validationConfig,
  formContactRegProcedures
);

formContactProceduresValidator.enableValidation();
