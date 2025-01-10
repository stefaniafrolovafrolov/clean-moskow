const formComments = document.forms.commentsForm;
//console.log(formComments);

/*if (!formComments) {
  console.log("не нашли форму коментариев для валидации");
} else {
  console.log("нашли форму коментариев для валидации");
}*/

const buttonSubmitComments = formComments.querySelector(
  ".comments__form-button"
);

export { formComments, buttonSubmitComments };
