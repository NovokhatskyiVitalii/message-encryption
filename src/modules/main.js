import {encode as encodeMorse} from 'morse-decoder';
import {emojiMap} from './emojiMap';
import SimpleScrollbar from 'simple-scrollbar';

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
const inputArea = document.getElementById('area-input');
const outputArea = document.getElementById('area-output');
const encryptionButton = document.querySelector('[encryption]');
const copyButton = document.querySelector('[copy]');
const clearButton = document.querySelector('[clear]');
const dropdownItems = document.querySelectorAll('.main-content__list-dropdown__menu li');

const state = {
  currentIndex: 0,
  scrollDirection: 1,
  selectedMethod: null,
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
  const updateLabelState = () => {
    if (textarea.value.trim() !== '' || document.activeElement === textarea) {
      label.classList.add('active');
    } else {
      label.classList.remove('active');
    }
  };

  textarea.addEventListener('focus', updateLabelState);
  textarea.addEventListener('blur', updateLabelState);
  textarea.addEventListener('input', updateLabelState);

  updateLabelState();
}

function updateButtonsState() {
  const isDisabled = !inputArea.value.trim();
  encryptionButton.disabled = isDisabled;
  copyButton.disabled = isDisabled || !outputArea.value.trim();
  clearButton.disabled = isDisabled && !outputArea.value.trim();
}

function updateLabelState(textarea, label) {
  if (textarea.value.trim() !== '') {
    label.classList.add('active');
  } else {
    label.classList.remove('active');
  }
}

function encryptionWithMorse(input) {
  return encodeMorse(input);
}

function encryptionWithBase64(input) {
  try {
    const utf8input = unescape(encodeURIComponent(input));
    return btoa(utf8input);
  } catch {
    return 'Error: Invalid input for Base64';
  }
}

function encryptionWithEmoji(input) {
  outputArea.style.textShadow = 'none';

  return input
    .split('')
    .map((char) => emojiMap[char.toLowerCase()] || char)
    .join('');
}

function getEncryptionMessage(method, input) {
  switch (method) {
    case 'morse':
      return encryptionWithMorse(input);

    case 'base64':
      return encryptionWithBase64(input);

    case 'emoji':
      return encryptionWithEmoji(input);

    default:
      return 'Select encryption method';
  }
}

function encryptionMessage() {
  const input = inputArea.value.trim();
  const method = state.selectedMethod;

  const encryptedMessage = getEncryptionMessage(method, input);
  outputArea.value = encryptedMessage;

  updateLabelState(outputArea, outputLabel);
  updateButtonsState();
}

function copyValue() {
  outputArea.select();
  document.execCommand('copy');
}

function clearArea() {
  inputArea.value = '';
  outputArea.value = '';
  updateButtonsState();
  updateLabelState(inputArea, inputLabel);
  updateLabelState(outputArea, outputLabel);
}

function initDropDownMenu() {
  handleDropdownToggle();
  handleDropdownSelection();
}
function initFocusTextArea() {
  handleTextareaFocusBlur(inputTextarea, inputLabel);
  handleTextareaFocusBlur(outputTextarea, outputLabel);
}

function initScrollItems() {
  setInterval(scrollItems, 2500);
}

function initEventListener() {
  copyButton.addEventListener('click', () => copyValue());
  clearButton.addEventListener('click', () => clearArea());
  encryptionButton.addEventListener('click', () => encryptionMessage());
  dropdownItems.forEach((item) => {
    item.addEventListener('click', () => {
      state.selectedMethod = item.dataset.value;
      updateButtonsState();
    });
  });
  inputArea.addEventListener('input', updateButtonsState);
}

function initApp() {
  initDropDownMenu();
  initFocusTextArea();
  initScrollItems();
  updateButtonsState();
  initEventListener();
}

document.addEventListener('DOMContentLoaded', () => {
  initApp();
});
