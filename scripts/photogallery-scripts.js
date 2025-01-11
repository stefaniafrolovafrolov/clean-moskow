document.addEventListener("DOMContentLoaded", function () {
  const items = document.querySelectorAll(".w320-images__item");
  const button = document.querySelector(".w320-images__btn");
  let currentIndex = 0;
  const itemsToShow = 5;

  function showItems() {
    for (
      let i = currentIndex;
      i < currentIndex + itemsToShow && i < items.length;
      i++
    ) {
      items[i].classList.add("visible");
    }
    currentIndex += itemsToShow;

    if (currentIndex >= items.length) {
      button.style.display = "none";
    }
  }

  showItems();

  button.addEventListener("click", showItems);
});

document.addEventListener("DOMContentLoaded", function () {
  const itemsDesctop = document.querySelectorAll(".images__item");
  const buttonDesctop = document.querySelector(".images__btn");
  const itemsToShowDesctop = 9;
  let currentIndexDesctop = 0;

  function showItems() {
    const end = currentIndexDesctop + itemsToShowDesctop;
    for (let i = currentIndexDesctop; i < end && i < itemsDesctop.length; i++) {
      itemsDesctop[i].style.display = "block";
    }
    currentIndexDesctop += itemsToShowDesctop;

    if (currentIndexDesctop >= itemsDesctop.length) {
      buttonDesctop.style.display = "none";
    }
  }

  showItems();

  buttonDesctop.addEventListener("click", showItems);
});
