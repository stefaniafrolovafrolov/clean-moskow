document.addEventListener("DOMContentLoaded", () => {
  function handleResize() {
    if (window.innerWidth > 625) {
      const itemClasses = [
        "car__item",
        "coach__item",
        "corner-coach__item",
        "armchair__item",
        "pillow__item",
        "mattress__item",
        "curtain__item",
        "carpet__item",
      ];

      itemClasses.forEach((itemClass) => {
        const items = document.querySelectorAll(`.${itemClass}`);

        items.forEach((item) => {
          item.style.display = "block";
        });
      });
    } else {
      const itemClasses = [
        "car__item",
        "coach__item",
        "corner-coach__item",
        "armchair__item",
        "pillow__item",
        "mattress__item",
        "curtain__item",
        "carpet__item",
      ];
      let currentIndex = 0;
      let displayCount = 1;

      itemClasses.forEach((itemClass) => {
        const items = document.querySelectorAll(`.${itemClass}`);

        function updateSlider() {
          items.forEach((item) => {
            item.style.display = "none";
          });

          for (let i = 0; i < displayCount; i++) {
            const index = (currentIndex + i) % items.length;
            items[index].style.display = "block";
          }
        }

        const parentElement = items[0].closest("section");
        const leftButton = parentElement.querySelector(
          ".carousel__button.left"
        );
        const rightButton = parentElement.querySelector(
          ".carousel__button.right"
        );

        leftButton.addEventListener("click", () => {
          currentIndex = (currentIndex + items.length - 1) % items.length;
          updateSlider();
        });

        rightButton.addEventListener("click", () => {
          currentIndex = (currentIndex + 1) % items.length;
          updateSlider();
        });

        updateSlider();
      });
    }
  }

  handleResize();
  window.addEventListener("resize", handleResize);
});
