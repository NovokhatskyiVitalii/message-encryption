import {encode as encodeMorse} from 'morse-decoder';
import {emojiMap} from './emojiMap';
import {decode as decodeMorse} from 'morse-decoder';
import emojiRegex from 'emoji-regex';

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

function handleText() {
  const isDecoding = state.selectedMethod?.startsWith('decoding-');
  encryptionButton.textContent = isDecoding ? 'Decoding' : 'Encryption';

  inputLabel.textContent = isDecoding ? 'Enter your message to decrypt' : 'Enter your message for encryption';
  outputLabel.textContent = isDecoding ? 'Your decrypted message' : 'Your encrypted message';
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
      const currentActive = menu.querySelector('.active');
      if (currentActive) {
        currentActive.classList.remove('active');
      }

      option.classList.add('active');

      const selectedText = option.textContent;
      const selectedValue = option.dataset.value;

      buttonText.textContent = selectedText;
      buttonText.classList.add('selected');
      menu.classList.remove('active');

      state.selectedMethod = selectedValue;

      handleText();
      updateButtonsState();
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

function decryptionWithMorse(input) {
  try {
    return decodeMorse(input);
  } catch {
    return 'Error: Invalid Morse code';
  }
}

function encryptionWithBase64(input) {
  try {
    const utf8input = unescape(encodeURIComponent(input));
    return btoa(utf8input);
  } catch {
    return 'Error: Invalid input for Base64';
  }
}

function decryptionWithBase64(input) {
  try {
    const decoded = atob(input);
    return decodeURIComponent(escape(decoded));
  } catch {
    return 'Error: Invalid Base64 string';
  }
}

function encryptionWithEmoji(input) {
  outputArea.style.textShadow = 'none';

  return input
    .split('')
    .map((char) => emojiMap[char.toLowerCase()] || char)
    .join('');
}

const reverseEmojiMap = Object.fromEntries(Object.entries(emojiMap).map(([char, emoji]) => [emoji, char]));

function decryptionWithEmoji(input) {
  const regex = emojiRegex();
  const emojiArray = input.match(regex);

  if (!emojiArray) {
    return 'No emojis found in the input.';
  }

  const decodedMessage = emojiArray
    .map((emojiChar) => {
      const decodedChar = reverseEmojiMap[emojiChar];
      if (!decodedChar) {
        return emojiChar;
      }
      return decodedChar;
    })
    .join('');
  return decodedMessage;
}

function getEncryptionMessage(method, input) {
  switch (method) {
    case 'morse':
      return encryptionWithMorse(input);

    case 'decoding-morse':
      return decryptionWithMorse(input);

    case 'base64':
      return encryptionWithBase64(input);

    case 'decoding-base64':
      return decryptionWithBase64(input);

    case 'emoji':
      return encryptionWithEmoji(input);

    case 'decoding-emoji':
      return decryptionWithEmoji(input);

    default:
      return 'Select method';
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
  handleDropdownSelection();
}

document.addEventListener('DOMContentLoaded', () => {
  initApp();
});
