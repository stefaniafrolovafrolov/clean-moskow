async function loadHTML(id, file) {
  const container = document.getElementById(id);
  if (container) {
    try {
      const response = await fetch(file);
      if (response.ok) {
        const html = await response.text();
        container.insertAdjacentHTML("beforeend", html);
      } else {
        console.error(`Ошибка загрузки файла: ${file}`);
      }
    } catch (error) {
      console.error(`Не удалось загрузить файл: ${file}`, error);
    }
  }
}

async function loadAllContent() {
  /* await loadHTML('content', './html/banner.html');
    await loadHTML('content', './html/side-banners.html');
    await loadHTML('side-banners__content', './html/advantages.html');
    await loadHTML('side-banners__content', './html/socials.html');
    await loadHTML('side-banners__content', './html/video.html');
    await loadHTML('side-banners__content', './html/gallery.html');
    await loadHTML('side-banners__content', './html/services.html');
    await loadHTML('side-banners__content', './html/socials-banner.html');
    await loadHTML('side-banners__content', './html/form.html'); */
}
loadAllContent();
