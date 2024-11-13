const list = document.querySelector('[header-list]');
const items = document.querySelectorAll('[header-list-item]');
const inputTextarea = document.querySelector('#area-input');
const inputLabel = document.querySelector('label[for="area-input"]');
const outputTextarea = document.querySelector('#area-output');
const outputLabel = document.querySelector('label[for="area-output"]');
const dropdown = document.querySelector('.main-content__list-dropdown');
const dropDownButton = dropdown.querySelector('.main-content__list-dropdown__button');
const menu = dropdown.querySelector('.main-content__list-dropdown__menu');
const buttonText = dropdown.querySelector('.main-content__list-dropdown__button span');
const options = menu.querySelectorAll('li');

const state = {
  currentIndex: 0,
  scrollDirection: 1,
};

function scrollItems() {
  let {currentIndex, scrollDirection} = state;
  list.style.transition = 'transform 0.6s ease-in';
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

function handleDropdownToggle() {
  dropDownButton.addEventListener('click', () => {
    menu.classList.toggle('active');
  });

  document.addEventListener('click', (e) => {
    if (!dropdown.contains(e.target)) {
      menu.classList.remove('active');
    }
  });
}

function handleDropdownSelection() {
  options.forEach((option) => {
    option.addEventListener('click', () => {
      const selectedText = option.textContent;
      buttonText.textContent = selectedText;

      buttonText.classList.add('selected');
      menu.classList.remove('active');
    });
  });
}

function handleTextareaFocusBlur(textarea, label) {
  textarea.addEventListener('focus', () => {
    label.classList.add('active');
  });

  textarea.addEventListener('blur', () => {
    if (textarea.value.trim() === '') {
      label.classList.remove('active');
    }
  });

  textarea.addEventListener('input', () => {
    if (textarea.value.trim() !== '') {
      label.classList.add('active');
    } else {
      label.classList.remove('active');
    }
  });
}

function initDropDownMenu() {
  handleDropdownToggle();
  handleDropdownSelection();
}
function initFocusTextArea() {
  handleTextareaFocusBlur(inputTextarea, inputLabel);
  handleTextareaFocusBlur(outputTextarea, outputLabel);
}

function initApp() {
  initDropDownMenu();
  initFocusTextArea();
  setInterval(scrollItems, 2500);
}

document.addEventListener('DOMContentLoaded', () => {
  initApp();
});
