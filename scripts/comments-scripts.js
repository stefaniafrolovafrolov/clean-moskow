document.getElementById("toggle").addEventListener("click", function () {
  const textshidden = document.querySelector(".comments__item-texts");
  const button = document.getElementById("button-text");
  const arrow = document.getElementById("arrow");

  if (textshidden.classList.contains("hidden")) {
    textshidden.classList.remove("hidden");
    textshidden.classList.add("expanded"); // Класс для развёртывания
    button.textContent = "Свернуть";
    arrow.style.transform = "rotate(180deg)";
  } else {
    textshidden.classList.remove("expanded");
    textshidden.classList.add("hidden");
    button.textContent = "Развернуть";
    arrow.style.transform = "rotate(0deg)";
  }
});
