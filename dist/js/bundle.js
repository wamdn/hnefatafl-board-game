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
/* harmony import */ var _rules__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./rules */ "./src/js/rules.js");
/* harmony import */ var _rules__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_rules__WEBPACK_IMPORTED_MODULE_2__);




const gameSize = 540;
const boardLength = 9;
const blockSize = gameSize / boardLength;

Object(_board__WEBPACK_IMPORTED_MODULE_0__["default"])(gameSize, boardLength);

// set piece
const canvas = document.getElementById('players');
const ctx = canvas.getContext('2d');

const attacker = new _players__WEBPACK_IMPORTED_MODULE_1__["Attacker"];
attacker.genPiece(blockSize);


const defender = new _players__WEBPACK_IMPORTED_MODULE_1__["Defender"];
defender.genPiece(blockSize);


function drowAll () {
   ctx.clearRect(0, 0, gameSize, gameSize);

   ctx.fillStyle = attacker.color;
   attacker.piece.forEach(p => {
      p.drow(ctx)
   })

   ctx.fillStyle = defender.color;
   defender.piece.forEach(p => {
      p.drow(ctx)
   })
}

drowAll ()

// postion relative to canvas
let selected = null;

canvas.onclick = (e) => {
   const offset = canvas.getBoundingClientRect();
   const x = Math.floor((e.x - offset.left) / blockSize)
   const y = Math.floor((e.y - offset.top) / blockSize) 

   function getPiece (player) {
      player.piece.forEach(p => {        
         if (p.posX == x && p.posY == y) {
            selected = p
            selected.selection(ctx)
         }
      })
   }

   function movePiece (x, y) {
      selected.newPos(x, y) 
      drowAll()
      selected = null;
   }

   if (!selected) getPiece(attacker)
   else movePiece(x, y)
   
}






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
            ctx.fillStyle = 'rgb(241,241,241)'
         }
         else {
            ctx.fillStyle = 'rgb(222,222,222)'
         }

         if (( x == 0 || x == boardLength - 1 ) && ( y == 0 || y == boardLength - 1 )) {
            ctx.fillStyle = 'rgb(100,200,100)' 
         }
         else if (x == boardCentre && y == boardCentre) {
            ctx.fillStyle = 'rgb(115,158,147)'
         }

         ctx.fillRect(posX, posY, block, block);
         posX += block;
         colorSwitch = !colorSwitch
      }

      posX = 0;
      posY += block;
   }

});



/***/ }),

/***/ "./src/js/players.js":
/*!***************************!*\
  !*** ./src/js/players.js ***!
  \***************************/
/*! exports provided: Attacker, Defender */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Attacker", function() { return Attacker; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Defender", function() { return Defender; });

class Player {
   constructor () {
      this.piece = []
      this.matrix = [
         [0,0,0,1,1,1,0,0,0],
         [0,0,0,0,1,0,0,0,0],
         [0,0,0,0,2,0,0,0,0],
         [1,0,0,0,2,0,0,0,1],
         [1,1,2,2,3,2,2,1,1],
         [1,0,0,0,2,0,0,0,1],
         [0,0,0,0,2,0,0,0,0],
         [0,0,0,0,1,0,0,0,0],
         [0,0,0,1,1,1,0,0,0]
      ]
   }
   static getNewMatrix (attacker, defender) {

   }
}

class Attacker extends Player {
   constructor () {
      super()
      this.color = 'rgb(55,55,55)';
   }
   genPiece (blockSize) {
      const len = this.matrix.length;
      for (let y = 0; y < len; y++) {
         for (let x = 0; x < len; x++) {
            if (this.matrix[y][x] === 1) {
               this.piece.push( new Solder(x, y, blockSize) )
            }
         }
      }
   }
}

class Defender extends Player {
   constructor () {
      super()
      this.color = 'rgb(245,245,15)';
   }
   genPiece (blockSize) {
      const len = this.matrix.length;
      for (let y = 0; y < len; y++) {
         for (let x = 0; x < len; x++) {
            if (this.matrix[y][x] === 2) {
               this.piece.push( new Solder(x, y, blockSize) )
            }
            else if (this.matrix[y][x] === 3) {
               this.piece.push( new King(x, y, 60) )
            }
         }
      }
   }
}

// Piece
class Solder {
   constructor (posX, posY, size) {
      this.posX = posX;
      this.posY = posY;
      this.pxlPosX = null;
      this.pxlPosY = null;
      this.size = size;
      this.radius = (size / 2) - 5
      this.isKing = false;
   }
   newPos (newPosX, newPosY) {
      this.posX = newPosX
      this.posY = newPosY
   }
   selection (ctx) {
      const x = this.posX * this.size
      const y = this.posY * this.size
      const lineSize = this.radius - 8
      ctx.beginPath();
      ctx.moveTo(x, y + lineSize)
      ctx.lineTo(x, y)
      ctx.lineTo(x + lineSize, y)
      ctx.moveTo(x + this.size - lineSize, y)
      ctx.lineTo(x + this.size, y)
      ctx.lineTo(x + this.size, y + lineSize)
      ctx.moveTo(x + this.size, y + this.size - lineSize)
      ctx.lineTo(x + this.size, y + this.size)
      ctx.lineTo(x + this.size - lineSize, y + this.size)
      ctx.moveTo(x + lineSize, y + this.size)
      ctx.lineTo(x, y + this.size)
      ctx.lineTo(x, y + this.size - lineSize)
      ctx.strokeStyle = 'rgb(107,182,250)';
      ctx.lineWidth = 8
      ctx.stroke()
   }
   drow (ctx) {
      this.pxlPosX = (this.posX * this.size) + (this.size / 2);
      this.pxlPosY = (this.posY * this.size) + (this.size / 2);

      ctx.beginPath();
      ctx.arc(this.pxlPosX, this.pxlPosY, this.radius, 0, 2 * Math.PI)
      ctx.fill();

      if (this.isKing) {
         ctx.lineWidth = 12;

         ctx.beginPath();
         ctx.moveTo(this.pxlPosX, this.pxlPosY - this.radius + 8);
         ctx.lineTo(this.pxlPosX, this.pxlPosY + this.radius - 8);
         ctx.moveTo(this.pxlPosX - this.radius + 8, this.pxlPosY);
         ctx.lineTo(this.pxlPosX + this.radius - 8, this.pxlPosY);
         ctx.strokeStyle = 'rgb(169,159,0)';
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






/***/ }),

/***/ "./src/js/rules.js":
/*!*************************!*\
  !*** ./src/js/rules.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map