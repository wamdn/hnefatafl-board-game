// Game Board
export default (gameSize, length) => {

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

}

