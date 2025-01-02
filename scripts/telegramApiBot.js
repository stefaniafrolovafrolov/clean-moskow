const form = document.getElementById("contactForm");
const errorMessage = document.getElementById("procedures-error"); // Сообщение об ошибке
const submitButton = document.getElementById("submitButton"); // Кнопка отправки
const serverErrorMessage = document.getElementById("server-error-message"); // Сообщение об ошибке сервера

// Устанавливаем изначальный класс кнопки
submitButton.classList.add("registration__formRegisterButton_disabled");

// Функция для проверки заполненности полей
function areFieldsValid() {
  const formData = new FormData(form);
  const nameValue = formData.get("text");
  const phoneValue = formData.get("phone");

  const isNameValid = nameValue && nameValue.length >= 2; // Проверка имени
  const isPhoneValid = phoneValue && phoneValue.length === 11; // Проверка телефона на 11 символов

  return isNameValid && isPhoneValid;
}

form.addEventListener("input", function () {
  if (areFieldsValid()) {
    submitButton.classList.remove("registration__formRegisterButton_disabled");
    submitButton.classList.add("registration__formRegisterButton_valid");
  } else {
    submitButton.classList.add("registration__formRegisterButton_disabled");
    submitButton.classList.remove("registration__formRegisterButton_valid");
  }
});

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = new FormData(form);

  // Соберите данные для отправки
  const data = {
    name: formData.get("text"),
    phone: formData.get("phone"),
  };

  // Проверяем заполнены ли все поля
  if (!areFieldsValid()) {
    console.error("Заполните все поля!");
    return; // Возвращаемся, если хотя бы одно поле не заполнено
  }

  console.log(data); // Логи для дебага перед отправкой запроса

  // Дизаблим кнопку и меняем класс перед отправкой
  submitButton.disabled = true;
  submitButton.textContent = "Отправка...";
  submitButton.classList.add("registration__formRegisterButton_disabled");
  serverErrorMessage.style.display = "none";

  fetch("http://localhost:3005/backend/submit-form", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Ошибка сети");
      }
      return response.json();
    })
    .then((data) => {
      //console.log(data);
      const successMessage = document.querySelector(".success-message");
      successMessage.style.display = "block"; // Показываем сообщение об успешной отправке
      form.reset(); // Очищаем форму

      setTimeout(() => {
        successMessage.style.display = "none"; // Скрываем сообщение
      }, 6000);
    })
    .catch((error) => {
      console.error("Ошибка:", error);
      // Показать сообщение об ошибке сервера
      serverErrorMessage.style.display = "block"; // Показываем сообщение об ошибке сервера
      serverErrorMessage.textContent =
        "Ошибка сервера. Пожалуйста, попробуйте позже."; // Текст сообщения
    })
    .finally(() => {
      // Изменяем класс кнопки на disabled после завершения
      submitButton.classList.add("registration__formRegisterButton_disabled");
      submitButton.classList.remove("registration__formRegisterButton_valid");
      submitButton.textContent = "Оставить заявку";
      submitButton.disabled = false; // Активируем кнопку
    });
});
