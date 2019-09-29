
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
      this.color = 'rgb(45,45,45)';
   }
   genPiece () {
      const len = this.matrix.length;
      for (let y = 0; y < len; y++) {
         for (let x = 0; x < len; x++) {
            if (this.matrix[y][x] === 1) {
               this.piece.push( new Solder(x, y, 60) )
            }
         }
      }
   }
}

class Defender extends Player {
   constructor () {
      super()
      this.color = 'rgb(255,249,149)';
   }
   genPiece () {
      const len = this.matrix.length;
      for (let y = 0; y < len; y++) {
         for (let x = 0; x < len; x++) {
            if (this.matrix[y][x] === 2) {
               this.piece.push( new Solder(x, y, 60) )
            }
            else if (this.matrix[y][x] === 3) {
               this.piece.push( new King(x, y, 60) )
            }
         }
      }
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

export default () => {

   const canvas = document.getElementById('players');
   const ctx = canvas.getContext('2d');

   // ctx.beginPath();
   // ctx.fillStyle = 'rgb(55,55,55)';
   // ctx.arc(90, 30, 25, 0, 2 * Math.PI)
   // ctx.fill();

   // const atk = new Solder (3, 0, 60)
   // ctx.fillStyle = 'rgb(45,45,45)';
   // atk.drow(ctx)


   // const def = new Solder (2, 4, 60)
   // ctx.fillStyle = 'rgb(255,240,110)';
   // def.drow(ctx)

   // const king = new King (4, 4, 60)
   // ctx.fillStyle = 'rgb(255,240,110)';
   // king.drow(ctx)

   const attacker = new Attacker;
   attacker.genPiece(ctx);
   ctx.fillStyle = attacker.color;
   attacker.piece.forEach(p => {
      p.drow(ctx)
   })

   const defender = new Defender;
   defender.genPiece(ctx);
   ctx.fillStyle = defender.color;
   defender.piece.forEach(p => {
      p.drow(ctx)
   })

}



