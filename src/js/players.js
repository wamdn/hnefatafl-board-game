
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

export class Attacker extends Player {
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

export class Defender extends Player {
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




