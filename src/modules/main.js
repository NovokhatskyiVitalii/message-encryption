const list = document.querySelector("[header-list]");
const items = document.querySelectorAll("[header-list-item]");

const state = {
  currentIndex: 0,
  scrollDirection: 1,
};

function scrollItems() {
  let { currentIndex, scrollDirection } = state;
  list.style.transition = "transform 0.6s ease-in";
  list.style.transform = `translateY(-${currentIndex * 40}px)`;

  currentIndex += scrollDirection;

  if (currentIndex >= items.length) {
    scrollDirection = -1;
    currentIndex = items.length - 2;
  } else if (currentIndex < 0) {
    scrollDirection = 1;
    currentIndex = 1;
  }
  state.currentIndex = currentIndex;
  state.scrollDirection = scrollDirection;
}

function initApp() {
  setInterval(scrollItems, 2500);
}

document.addEventListener("DOMContentLoaded", () => {
  initApp();
});
