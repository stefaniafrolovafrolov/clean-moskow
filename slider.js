document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll(".gallery__photos-photo_slider"); // Получаем все картинки
  const leftButton = document.querySelector(".gallery__buttons_left");
  const rightButton = document.querySelector(".gallery__buttons_right");
  let currentIndex = 0; // Индекс текущего изображения
  let displayCount = 3; // Количество отображаемых изображений
  const mobileSize = 498;
  const tabletSize = 787;
  const maxScreenWidth = 900; // Максимальная ширина экрана для активации слайдера

  // Функция для обновления отображаемых изображений
  function updateSlider() {
    // Скрываем все изображения
    images.forEach((img) => {
      img.style.display = "none";
    });

    // Отображаем нужное количество изображений
    for (let i = 0; i < displayCount; i++) {
      const index = (currentIndex + i) % images.length; // Циклический индекс
      images[index].style.display = "block"; // Показываем изображение
    }
  }

  // Функция для обновления количества отображаемых изображений в зависимости от ширины экрана
  function updateDisplayCount() {
    const screenWidth = window.innerWidth;

    // Если ширина экрана больше максимальной, не показываем слайдер
    if (screenWidth > maxScreenWidth) {
      return; // Прерываем выполнение, если экран шире 900px
    }

    if (screenWidth <= mobileSize) {
      displayCount = 1; // 1 изображение для экранов до 475px
    } else if (screenWidth <= tabletSize) {
      displayCount = 2; // 2 изображения для экранов до 700px
    } else {
      displayCount = 3; // 3 изображения для экранов больше 700px
    }

    updateSlider(); // Обновляем слайдер после изменения количества отображаемых изображений
  }

  // Инициализация слайдера только если ширина экрана меньше или равна 900px
  if (window.innerWidth <= maxScreenWidth) {
    updateDisplayCount(); // Инициализируем слайдер
    window.addEventListener("resize", updateDisplayCount); // Обновляем при изменении размера окна

    // Обработчик кнопки "влево"
    leftButton.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + images.length) % images.length; // Уменьшаем индекс циклически
      updateSlider();
    });

    // Обработчик кнопки "вправо"
    rightButton.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % images.length; // Увеличиваем индекс циклически
      updateSlider();
    });
  }
});
document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll(".slider-1-row"); // Получаем все картинки
  const leftButton = document.querySelector(".service__buttons_1row-left");
  const rightButton = document.querySelector(".service__buttons_1row-right");
  let currentIndex = 0; // Индекс текущего изображения
  let displayCount = 3; // Количество отображаемых изображений
  const mobileSize = 619; // Ширина экрана для активации слайдера
  const tabletSize = 700;

  // Проверка, чтобы слайдер запускался только для экранов с шириной 619px и меньше
  if (window.innerWidth > mobileSize) {
    return; // Если экран шире 619px, выходим из функции и слайдер не работает
  }

  // Функция для обновления отображаемых изображений
  function updateSlider() {
    // Скрываем все изображения
    images.forEach((img) => {
      img.style.display = "none";
    });

    // Отображаем нужное количество изображений
    for (let i = 0; i < displayCount; i++) {
      const index = currentIndex + (i % images.length); // Циклический индекс
      images[index].style.display = "flex"; // Показываем изображение
    }
  }

  // Функция для обновления количества отображаемых изображений в зависимости от ширины экрана
  function updateDisplayCount() {
    const screenWidth = window.innerWidth;

    if (screenWidth <= mobileSize) {
      displayCount = 1; // 1 изображение для экранов до 619px
    } else if (screenWidth <= tabletSize) {
      displayCount = 2; // 2 изображения для экранов до 700px
    } else {
      displayCount = 3; // 3 изображения для экранов больше 700px
    }
    updateSlider(); // Обновляем слайдер после изменения количества отображаемых изображений
  }

  // Обработчик кнопки "влево"
  leftButton.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length; // Уменьшаем индекс циклически
    updateSlider();
  });

  // Обработчик кнопки "вправо"
  rightButton.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % images.length; // Увеличиваем индекс циклически
    updateSlider();
  });

  updateDisplayCount(); // Инициализируем количество отображаемых изображений
  window.addEventListener("resize", updateDisplayCount); // Обновляем при изменении размера окна
});
document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll(".slider-2-row"); // Получаем все картинки
  const leftButton = document.querySelector(".service__buttons_2row-left");
  const rightButton = document.querySelector(".service__buttons_2row-right");
  let currentIndex = 0; // Индекс текущего изображения
  let displayCount = 3; // Количество отображаемых изображений
  const mobileSize = 619; // Ширина экрана для активации слайдера
  const tabletSize = 700;

  // Проверка, чтобы слайдер запускался только для экранов с шириной 619px и меньше
  if (window.innerWidth > mobileSize) {
    return; // Если экран шире 619px, выходим из функции и слайдер не работает
  }

  // Функция для обновления отображаемых изображений
  function updateSlider() {
    // Скрываем все изображения
    images.forEach((img) => {
      img.style.display = "none";
    });

    // Отображаем нужное количество изображений
    for (let i = 0; i < displayCount; i++) {
      const index = currentIndex + (i % images.length); // Циклический индекс
      images[index].style.display = "flex"; // Показываем изображение
    }
  }

  // Функция для обновления количества отображаемых изображений в зависимости от ширины экрана
  function updateDisplayCount() {
    const screenWidth = window.innerWidth;

    if (screenWidth <= mobileSize) {
      displayCount = 1; // 1 изображение для экранов до 619px
    } else if (screenWidth <= tabletSize) {
      displayCount = 2; // 2 изображения для экранов до 700px
    } else {
      displayCount = 3; // 3 изображения для экранов больше 700px
    }
    updateSlider(); // Обновляем слайдер после изменения количества отображаемых изображений
  }

  // Обработчик кнопки "влево"
  leftButton.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length; // Уменьшаем индекс циклически
    updateSlider();
  });

  // Обработчик кнопки "вправо"
  rightButton.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % images.length; // Увеличиваем индекс циклически
    updateSlider();
  });

  updateDisplayCount(); // Инициализируем количество отображаемых изображений
  window.addEventListener("resize", updateDisplayCount); // Обновляем при изменении размера окна
});
document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll(".slider-3-row"); // Получаем все картинки
  const leftButton = document.querySelector(".service__buttons_3row-left");
  const rightButton = document.querySelector(".service__buttons_3row-right");
  let currentIndex = 0; // Индекс текущего изображения
  let displayCount = 3; // Количество отображаемых изображений
  const mobileSize = 619; // Ширина экрана для активации слайдера
  const tabletSize = 700;

  // Проверка, чтобы слайдер запускался только для экранов с шириной 619px и меньше
  if (window.innerWidth > mobileSize) {
    return; // Если экран шире 619px, выходим из функции и слайдер не работает
  }

  // Функция для обновления отображаемых изображений
  function updateSlider() {
    // Скрываем все изображения
    images.forEach((img) => {
      img.style.display = "none";
    });

    // Отображаем нужное количество изображений
    for (let i = 0; i < displayCount; i++) {
      const index = currentIndex + (i % images.length); // Циклический индекс
      images[index].style.display = "flex"; // Показываем изображение
    }
  }

  // Функция для обновления количества отображаемых изображений в зависимости от ширины экрана
  function updateDisplayCount() {
    const screenWidth = window.innerWidth;

    if (screenWidth <= mobileSize) {
      displayCount = 1; // 1 изображение для экранов до 619px
    } else if (screenWidth <= tabletSize) {
      displayCount = 2; // 2 изображения для экранов до 700px
    } else {
      displayCount = 3; // 3 изображения для экранов больше 700px
    }
    updateSlider(); // Обновляем слайдер после изменения количества отображаемых изображений
  }

  // Обработчик кнопки "влево"
  leftButton.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length; // Уменьшаем индекс циклически
    updateSlider();
  });

  // Обработчик кнопки "вправо"
  rightButton.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % images.length; // Увеличиваем индекс циклически
    updateSlider();
  });

  updateDisplayCount(); // Инициализируем количество отображаемых изображений
  window.addEventListener("resize", updateDisplayCount); // Обновляем при изменении размера окна
});
