"use strict";
document.querySelectorAll(".preview").forEach(preview => {
  const resize = () => preview.style.setProperty("--scale", String(preview.clientWidth / 1200));
  resize();
  new ResizeObserver(resize).observe(preview);
});
const buttons = [...document.querySelectorAll("[data-project]")];
buttons.forEach(button => button.addEventListener("click", () => {
  buttons.forEach(item => {
    const selected = item === button;
    item.setAttribute("aria-pressed", String(selected));
    document.getElementById(item.getAttribute("aria-controls")).hidden = !selected;
  });
}));

