let inputDir={x:0,y:0}
let speed = 5;
let lastpaintTime=0;
let score = 0;
let snakearr=[{x:12, y:16}];
let food ={x:7,y:6}

function main(ctime) {
    window.requestAnimationFrame(main);
    console.log(ctime)
    // if((ctime - lastpaintTime)/1000 < 1/speed){
    //     return;
    // }
    // lastpaintTime = ctime;
    gameEngine();
}

function gameEngine(){







    board.innerHTML = "";
    snakearr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });

   foodElement = document.createElement('div');
   foodElement.style.gridRowStart = food.y;
   foodElement.style.gridColumnStart = food.x;
   foodElement.classList.add('food')
   board.appendChild(foodElement);
}

window.requestAnimationFrame(main);