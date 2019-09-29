/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/app.js":
/*!***********************!*\
  !*** ./src/js/app.js ***!
  \***********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _board__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./board */ "./src/js/board.js");
/* harmony import */ var _players__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./players */ "./src/js/players.js");



const gameSize = 540;
const boardLength = 9;

Object(_board__WEBPACK_IMPORTED_MODULE_0__["default"])(gameSize, boardLength);

Object(_players__WEBPACK_IMPORTED_MODULE_1__["default"])();






/***/ }),

/***/ "./src/js/board.js":
/*!*************************!*\
  !*** ./src/js/board.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// Game Board
/* harmony default export */ __webpack_exports__["default"] = ((gameSize, length) => {

   const canvas = document.getElementById('gameBoard');
   const ctx = canvas.getContext('2d');

   canvas.width = gameSize;
   canvas.height = gameSize;


   const block = gameSize / length;

   let posX = 0
   let posY = 0

   let colorSwitch = true;

   let boardLength = length;
   let boardCentre = Math.floor(boardLength/2)

   for (let y = 0; y < boardLength; y++) {

      for (let x = 0; x < boardLength; x++) {
         if (colorSwitch) {
            ctx.fillStyle = 'rgb(241, 241, 241)';
         }
         else {
            ctx.fillStyle = 'rgb(222, 222, 222)';
         }

         if (( x == 0 || x == boardLength - 1 ) && ( y == 0 || y == boardLength - 1 ) || ( x == boardCentre && y == boardCentre )) {
            ctx.fillStyle = 'rgb(100, 200, 100)';   
         } 

         ctx.fillRect(posX, posY, block, block);
         posX += block;
         colorSwitch = !colorSwitch
      }

      posX = 0;
      posY += block;
   }

});

// function gameLoop () {

//    requestAnimationFrame(gameLoop);
// }


/***/ }),

/***/ "./src/js/players.js":
/*!***************************!*\
  !*** ./src/js/players.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class Player {
   constructor () {
      this.piece = []
   }
   genPiece (ctx, nbr) {
      for (let i = 0; i < nbr; i++) {
         this.piece.push( new Solder() )
      }
   }
   static getMatrix (attacker, defender) {

   }
}

class Attacker extends Player {
   constructor () {
      super()
      this.color = 'rgb(45,45,45)';
   }
}

class Defender extends Player {
   constructor () {
      super()
      this.color = 'rgb(255,249,149)';
   }
}

class Solder {
   constructor (posX, posY, size) {
      this.posX = (posX * size)+ (size / 2);
      this.posY = (posY * size) + (size / 2);
      this.size = (size / 2) - 5
      this.isKing = false;
   }
   drow (ctx) {
      ctx.beginPath();
      // ctx.fillStyle = 'rgb(50,50,50)';
      ctx.arc(this.posX, this.posY, this.size, 0, 2 * Math.PI)
      ctx.fill();

      if (this.isKing) {
         ctx.lineWidth = 12;

         ctx.beginPath();
         ctx.strokeStyle = 'rgb(169,159,0)';
         ctx.moveTo(this.posX, this.posY - this.size + 8);
         ctx.lineTo(this.posX, this.posY + this.size - 8);
         ctx.moveTo(this.posX - this.size + 8, this.posY);
         ctx.lineTo(this.posX + this.size - 8, this.posY);
         ctx.stroke();
      }
   }
}

class King extends Solder {
   constructor (posX, posY, size) {
      super(posX, posY, size)
      this.isKing = true;
   }
}

/* harmony default export */ __webpack_exports__["default"] = (() => {

   const canvas = document.getElementById('players');
   const ctx = canvas.getContext('2d');
   const matrix = null;

   // ctx.beginPath();
   // ctx.fillStyle = 'rgb(55,55,55)';
   // ctx.arc(90, 30, 25, 0, 2 * Math.PI)
   // ctx.fill();

   const atk = new Solder (3, 0, 60)
   ctx.fillStyle = 'rgb(45,45,45)';
   atk.drow(ctx)


   const def = new Solder (2, 4, 60)
   ctx.fillStyle = 'rgb(255,240,110)';
   def.drow(ctx)

   const king = new King (4, 4, 60)
   ctx.fillStyle = 'rgb(255,240,110)';
   king.drow(ctx)


   

});





/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map