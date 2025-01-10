const baseURL4API = "http://cleanhost:3000/backend";
const commentsRateImages = [
  "/images/stars/starun.svg",
  "/images/stars/star00.svg",
  "/images/stars/star05.svg",
  "/images/stars/star10.svg",
  "/images/stars/star15.svg",
  "/images/stars/star20.svg",
  "/images/stars/star25.svg",
  "/images/stars/star30.svg",
  "/images/stars/star35.svg",
  "/images/stars/star40.svg",
  "/images/stars/star45.svg",
  "/images/stars/star50.svg",
];

function getPagesSpan(cls, val) {
  return `<SPAN class="${cls}">${val}</SPAN>`;
}
function getPagesHref(cls, val, act = "") {
  return `<A class="${cls}" href="${act}${val}" onclick="event.preventDefault(); reloadCommentFunction.exec(${val});">${val}</A>`;
}
function getPages(num = 1, sel = 1, arg = "page", cls = "page-console-button") {
  const url = new URL(window.location.href);
  if (url.searchParams.has(arg)) url.searchParams.delete(arg);
  url.searchParams.set(arg, "");
  const fnc = url.href;
  const int = Number(sel);
  const pages =
    (int === 1
      ? getPagesSpan(`${cls} ${cls}-first`, "1")
      : getPagesHref(cls, "1", fnc)) +
    (int > 4
      ? getPagesSpan(`${cls} ${cls}-wrap ${cls}-wrap-first`, "...")
      : "") +
    (int > 3 ? getPagesHref(`${cls} ${cls}-prev-prev`, int - 2, fnc) : "") +
    (int > 2 ? getPagesHref(`${cls} ${cls}-prev`, int - 1, fnc) : "") +
    (int > 1 && int < num ? getPagesSpan(`${cls} ${cls}-current`, int) : "") +
    (int < num - 1 ? getPagesHref(`${cls} ${cls}-next`, int + 1, fnc) : "") +
    (int < num - 2
      ? getPagesHref(`${cls} ${cls}-next-next`, int + 2, fnc)
      : "") +
    (int < num - 3
      ? getPagesSpan(`${cls} ${cls}-wrap ${cls}-wrap-last`, "...")
      : "") +
    (int === num && num > 1
      ? getPagesSpan(`${cls} ${cls}-last`, num)
      : num > 1
      ? getPagesHref(`${cls} ${cls}-last`, num, fnc)
      : "");
  return `<DIV class="container-${cls}">${pages}</DIV>`;
}

function fetchBackend(api = "getMe", body = {}, useGet = true) {
  const fetchAPI = async function () {
    if (useGet) {
      return await fetch(baseURL4API + "/" + api, {
        method: "GET",
      });
    } else {
      return await fetch(baseURL4API + "/" + api, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
    }
  };
  return fetchAPI()
    .then(async (res) => {
      if (res.ok) return await res.json();
      const body = document.querySelector(".container-body");
      body.innerHTML = `<H1>HTTP ${res.status || "500"}: ${
        res.message
      }</H1><BR><SPAN>Ошибка на сервере</SPAN>`;
      return Promise.reject(`Server error: ${res.message}`);
    })
    .catch((res) => {
      const body = document.querySelector(".container-body");
      body.innerHTML = `<H1>HTTP ${res.status || "500"}: ${
        res.message
      }</H1><BR><SPAN>Ошибка запроса</SPAN>`;
      return Promise.reject(`Request error: ${res.message}`);
    });
}

function makeComment(comment, admin = false) {
  const commentDate = new Date(comment.date);
  const localDate = new Intl.DateTimeFormat("ru-RU", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(commentDate);
  const commentHtml = `
<li class="comments__item">
                <img
                  src="./images/avatar.svg"
                  class="comments__avatar"
                  alt="аватар"
                />
                <div class="comments__item-box">
                  <div class="comments__item-block">
                    <div class="comments__item-wrapper">
                      <p class="comments__item-name"> ${comment.name} </p>
                      <p class="comments__item-date">${localDate}</p>
                    </div>
                    <img
                      src="./images/stars-icon.svg"
                      class="comments__item-stars"
                      alt="рейтинг"
                    />
                  </div>
                  <!-- <div class="comments__item-wrapper1"> -->
                  <div class="comments__item-texts hidden">
                    <p class="comments__item-text">
                    ${comment.text}
                    </p>
                  </div>
                  <button class="comments__item-button" id="toggle">
                    <span class="comments__item-button-text" id="button-text"
                      >Развернуть</span
                    >
                    <img
                      src="./images/arrow.svg"
                      id="arrow"
                      class="comments__item-arrow"
                      alt="стрелка"
                    />
                  </button>
                  <!--   </div> -->
                </div>
              </li>`;

  return `<div class="comments-container-item">${commentHtml}${
    admin
      ? `<br>${
          comment.local
            ? `<a class="comments-manage-buttons comments-manage-button-visible"
                      onclick="moveCommentToVisible(${comment.id})" 
                      >Одобрено</a>
                      <code></code>
                      <a class="comments-manage-buttons comments-manage-button-delete"
                      onclick="moveCommentToTrash(${comment.id})">Удалить</a>`
            : `<a class="comments-manage-buttons comments-manage-button-delete"
                      onclick="removeCommentToTrash(${comment.id})">Удалить</a>`
        }`
      : ``
  }</div>`;
}

function reloadComments(page) {
  const comments = document.querySelector(".container-comments-area");
  const arr = JSON.parse(localStorage.getItem("comments"));
  const validate = [];
  arr.forEach((item) => validate.push(item.id));
  const items = fetchBackend(
    "list?page=" + page,
    { validate: validate },
    false
  );
  items.then((item) => {
    if (item.comments.length === 0 && item.selected != 1)
      return reloadCommentFunction.exec(1);
    const url = new URL(window.location.href);
    url.searchParams.set("page", item.selected);
    window.history.replaceState(null, "", url.href);
    const pages = getPages(item.pages, item.selected);
    const localArr = JSON.parse(localStorage.getItem("comments")).filter(
      (value) => !item.invalid.includes(value.id)
    );
    localStorage.setItem("comments", JSON.stringify(localArr));
    const list = [];
    item.comments.forEach((comment) => {
      if (comment.local) {
        const loc = localArr.filter((item) => item.id === comment.id);
        if (loc.length > 0) {
          list.push(makeComment(loc[0], false));
        } else {
          list.push(`<DIV class="comments-container-item">
  Ошибка: комментарий не доступен до прохождения модерации
</DIV>`);
        }
      } else {
        list.push(makeComment(comment, false));
      }
    });
    comments.innerHTML = `${pages}<DIV class="comments__list">${list.join(
      ""
    )}</DIV>${pages}`;
  });
}
const reloadCommentFunction = {
  exec: reloadComments,
};
function getPageData() {
  const url = new URL(window.location.href);
  commentsRateImages.forEach(
    (item, index) => (commentsRateImages[index] = url.origin + item)
  );

  if (!localStorage.getItem("comments")) {
    localStorage.setItem("comments", JSON.stringify([]));
  }
  const commentsForm = document.querySelector(".comments__form");
  if (commentsForm) {
    const commentsFormRating = document.querySelector(".comments-form-rating");
    if (commentsFormRating) {
      commentsFormRating.addEventListener("click", (event) => {
        event.preventDefault();
        const rect = commentsFormRating.getBoundingClientRect();
        commentsForm.rate.value = computeIndex(
          (event.clientX - rect.left) / event.target.offsetWidth
        );
      });
      commentsFormRating.addEventListener("mouseout", (event) => {
        event.preventDefault();

        url.href = window.location.href;
        const index = Number(commentsForm.rate.value);
        if (Number(commentsForm.rate.value) === 0) {
          resetRate();
        } else {
          setRating(index);
        }
      });
      commentsFormRating.addEventListener("mousemove", (event) => {
        event.preventDefault();

        url.href = window.location.href;
        const rect = commentsFormRating.getBoundingClientRect();
        commentsFormRating.innerHTML = "";
        setRating(
          computeIndex((event.clientX - rect.left) / event.target.offsetWidth)
        );
      });
    }
  }

  url.href = window.location.href;
  reloadCommentFunction.exec(url.searchParams.get("page") || 1);
}
function truncateName(name = "") {
  const words = name.split(" ");
  switch (words.length) {
    case 1:
      return name;
    case 2:
      return `${words[0]} ${words[1].substring(0, 1).toLocaleUpperCase()}.`;
    default:
      return `${words[0]} ${words[1]
        .substring(0, 1)
        .toLocaleUpperCase()}. ${words[2]
        .substring(0, 1)
        .toLocaleUpperCase()}.`;
  }
}

function submitComment() {
  const form = document.querySelector(".comments__form");
  const thanks = document.querySelector(".comments-form-warning");

  const errorMessage = document.getElementById("server-error-message");

  const show = document.querySelector(".comments-form-timeout");
  const submitButton = form.send;

  submitButton.disabled = true;
  submitButton.classList.remove("comments__form-button_valid");
  submitButton.classList.add("comments__form-button_disabled");
  thanks.style.display = "block";

  errorMessage.textContent = "";

  const counter = [60];

  let isTimerActive = false;
  show.innerHTML = `${counter[0]}`;

  const toProc = () => {
    counter[0] -= 1;
    if (counter[0] == 0) {
      submitButton.disabled = true;
      submitButton.classList.remove("comments__form-button_valid");

      submitButton.classList.add("comments__form-button_disabled");
      thanks.style.display = "none";

      isTimerActive = false;
      form.reset();
    } else {
      show.innerHTML = `${counter[0]}`;
      setTimeout(toProc, 1000);
    }
  };

  isTimerActive = true;
  setTimeout(toProc, 1000);

  const nameText = truncateName(form.name.value);
  const commentText = form.text.value.trim();

  const checkFormValidity = () => {
    const nameText = truncateName(form.name.value.trim());
    const commentText = form.text.value.trim();

    if (nameText && commentText.length >= 2) {
      submitButton.disabled = false;
      submitButton.classList.remove("comments__form-button_disabled");
      submitButton.classList.add("comments__form-button_valid");
    } else {
      submitButton.disabled = true;
      submitButton.classList.remove("comments__form-button_valid");
      submitButton.classList.add("comments__form-button_disabled");
    }
  };

  form.addEventListener("input", () => {
    if (isTimerActive) {
      submitButton.disabled = true; // Блокируем кнопку, если таймер активен
      submitButton.classList.remove("comments__form-button_valid");
      submitButton.classList.add("comments__form-button_disabled");
    } else {
      submitButton.disabled = false;
      submitButton.classList.remove("comments__form-button_disabled");
      submitButton.classList.add("comments__form-button_valid");

      checkFormValidity();
    }
  });

  const prepare = {
    name: nameText,
    phone: form.phone.value,
    text: commentText,
  };

  const data = fetchBackend("add", prepare, false);

  form.reset();

  data
    .then((item) => {
      prepare.id = item.id;
      prepare.date = item.date;

      const arr = JSON.parse(localStorage.getItem("comments")) || [];
      arr.push(prepare);
      localStorage.setItem("comments", JSON.stringify(arr));
      const url = new URL(window.location.href);
      reloadCommentFunction.exec(url.searchParams.get("page") || 1);
    })
    .catch((error) => {
      console.error("Ошибка при отправке комментария:", error);
      errorMessage.textContent =
        "Ошибка на сервере! Пожалуйста, попробуйте еще раз.";
      errorMessage.style.display = "block";
      thanks.style.display = "none";
      submitButton.disabled = true;
      submitButton.classList.add("comments__form-button_disabled");
      submitButton.classList.remove("comments__form-button_valid");
    });
}

document.addEventListener("click", function (event) {
  if (event.target.closest("#toggle")) {
    const toggleButton = event.target.closest("#toggle");
    const textshidden = toggleButton.parentElement.querySelector(
      ".comments__item-texts"
    );
    const button = toggleButton.querySelector("#button-text");
    const arrow = toggleButton.querySelector("#arrow");

    if (textshidden.classList.contains("hidden")) {
      textshidden.classList.remove("hidden");
      textshidden.classList.add("expanded");
      button.textContent = "Свернуть";
      arrow.style.transform = "rotate(180deg)";
    } else {
      textshidden.classList.remove("expanded");
      textshidden.classList.add("hidden");
      button.textContent = "Развернуть";
      arrow.style.transform = "rotate(0deg)";
    }
  }
});
