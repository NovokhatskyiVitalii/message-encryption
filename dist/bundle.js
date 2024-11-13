/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scss/style.scss":
/*!*****************************!*\
  !*** ./src/scss/style.scss ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://dashboard/./src/scss/style.scss?");

/***/ }),

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _scss_style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scss/style.scss */ \"./src/scss/style.scss\");\n/* harmony import */ var _modules_main__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/main */ \"./src/modules/main.js\");\n/* harmony import */ var _modules_main__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_modules_main__WEBPACK_IMPORTED_MODULE_1__);\n\r\n\r\n\r\n\n\n//# sourceURL=webpack://dashboard/./src/app.js?");

/***/ }),

/***/ "./src/modules/main.js":
/*!*****************************!*\
  !*** ./src/modules/main.js ***!
  \*****************************/
/***/ (() => {

eval("const list = document.querySelector('[header-list]');\r\nconst items = document.querySelectorAll('[header-list-item]');\r\nconst inputTextarea = document.querySelector('#area-input');\r\nconst inputLabel = document.querySelector('label[for=\"area-input\"]');\r\nconst outputTextarea = document.querySelector('#area-output');\r\nconst outputLabel = document.querySelector('label[for=\"area-output\"]');\r\nconst dropdown = document.querySelector('.main-content__list-dropdown');\r\nconst dropDownButton = dropdown.querySelector('.main-content__list-dropdown__button');\r\nconst menu = dropdown.querySelector('.main-content__list-dropdown__menu');\r\nconst buttonText = dropdown.querySelector('.main-content__list-dropdown__button span');\r\nconst options = menu.querySelectorAll('li');\r\n\r\nconst state = {\r\n  currentIndex: 0,\r\n  scrollDirection: 1,\r\n};\r\n\r\nfunction scrollItems() {\r\n  let {currentIndex, scrollDirection} = state;\r\n  list.style.transition = 'transform 0.6s ease-in';\r\n  list.style.transform = `translateY(-${currentIndex * 40}px)`;\r\n\r\n  currentIndex += scrollDirection;\r\n\r\n  if (currentIndex >= items.length) {\r\n    scrollDirection = -1;\r\n    currentIndex = items.length - 2;\r\n  } else if (currentIndex < 0) {\r\n    scrollDirection = 1;\r\n    currentIndex = 1;\r\n  }\r\n  state.currentIndex = currentIndex;\r\n  state.scrollDirection = scrollDirection;\r\n}\r\n\r\nfunction handleDropdownToggle() {\r\n  dropDownButton.addEventListener('click', () => {\r\n    menu.classList.toggle('active');\r\n  });\r\n\r\n  document.addEventListener('click', (e) => {\r\n    if (!dropdown.contains(e.target)) {\r\n      menu.classList.remove('active');\r\n    }\r\n  });\r\n}\r\n\r\nfunction handleDropdownSelection() {\r\n  options.forEach((option) => {\r\n    option.addEventListener('click', () => {\r\n      const selectedText = option.textContent;\r\n      buttonText.textContent = selectedText;\r\n\r\n      buttonText.classList.add('selected');\r\n      menu.classList.remove('active');\r\n    });\r\n  });\r\n}\r\n\r\nfunction handleTextareaFocusBlur(textarea, label) {\r\n  textarea.addEventListener('focus', () => {\r\n    label.classList.add('active');\r\n  });\r\n\r\n  textarea.addEventListener('blur', () => {\r\n    if (textarea.value.trim() === '') {\r\n      label.classList.remove('active');\r\n    }\r\n  });\r\n\r\n  textarea.addEventListener('input', () => {\r\n    if (textarea.value.trim() !== '') {\r\n      label.classList.add('active');\r\n    } else {\r\n      label.classList.remove('active');\r\n    }\r\n  });\r\n}\r\n\r\nfunction initDropDownMenu() {\r\n  handleDropdownToggle();\r\n  handleDropdownSelection();\r\n}\r\nfunction initFocusTextArea() {\r\n  handleTextareaFocusBlur(inputTextarea, inputLabel);\r\n  handleTextareaFocusBlur(outputTextarea, outputLabel);\r\n}\r\n\r\nfunction initApp() {\r\n  initDropDownMenu();\r\n  initFocusTextArea();\r\n  setInterval(scrollItems, 2500);\r\n}\r\n\r\ndocument.addEventListener('DOMContentLoaded', () => {\r\n  initApp();\r\n});\r\n\n\n//# sourceURL=webpack://dashboard/./src/modules/main.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/app.js");
/******/ 	
/******/ })()
;