import board from './board';
import {Attacker, Defender} from './players';
import rules from './rules';

const gameSize = 540;
const boardLength = 9;
const blockSize = gameSize / boardLength;

board(gameSize, boardLength);

// set piece
const canvas = document.getElementById('players');
const ctx = canvas.getContext('2d');

const attacker = new Attacker;
attacker.genPiece(blockSize);


const defender = new Defender;
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




