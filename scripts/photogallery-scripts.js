document.addEventListener("DOMContentLoaded", function () {
  const items = document.querySelectorAll(".w320-images__item");
  const button = document.querySelector(".w320-images__btn");
  let currentIndex = 0;
  const itemsToShow = 5;

  // Функция для отображения фотографий
  function showItems() {
    for (
      let i = currentIndex;
      i < currentIndex + itemsToShow && i < items.length;
      i++
    ) {
      items[i].classList.add("visible");
    }
    currentIndex += itemsToShow;

    // Скрыть кнопку, если все фотографии отображены
    if (currentIndex >= items.length) {
      button.style.display = "none";
    }
  }

  // Изначальное отображение первых 5 фотографий
  showItems();

  // Обработчик клика по кнопке
  button.addEventListener("click", showItems);
});
