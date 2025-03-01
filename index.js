let inputDir={x:0,y:0}
let speed = 4;
let lastpaintTime=0;
let score = 0;
let snakearr=[{x:12, y:16}];
let food ={x:7,y:6}
let gameover=false

let highscore = localStorage.getItem("highscore");
let highequal = highscore ? JSON.parse(highscore) : 0;
highscoreBox.innerHTML = "Highscore: " + highequal;

  function main(ctime) {
    // window.requestAnimationFrame(main);
   // console.log(ctime)
   ctime = Date.now() 
       if((ctime - lastpaintTime)/1000 < 1/speed){
        setTimeout(main, 1000 / speed);
        return;
    }
    lastpaintTime = ctime;
   if(!gameover) gameEngine();
}

function isCollid(){

    for(let i = 1 ; i < snakearr.length; i++){
        if(snakearr[i].x===snakearr[0].x && snakearr[i].y=== snakearr[0].y){
            return true;
        }
    }

    if(snakearr[0].x>=18 || snakearr[0].x <= 0 || snakearr[0].y>=18  || snakearr[0].y<=0){
        return true;
    }

    return false;
}


function gameEngine(){
    if(isCollid(snakearr)){
        gameover = true;
       speed = 4;
        inputDir={x:0,y:0};
        snakearr=[{x:12,y:16}];
         
        end.innerHTML='Game Over';

        return;
       
    }
   

    if(snakearr[0].y === food.y && snakearr[0].x ===food.x ){
        score +=1;
        
        speed = speed+0.2;

        // scoreBox.innerHTML = "Score : " + score;
        if(highequal<score){
            highequal=score
            localStorage.setItem("highscore",JSON.stringify(highequal));
            highscoreBox.innerHTML  ="Highscore :"+highequal;

        }
        snakearr.unshift({x: snakearr[0].x + inputDir.x, y: snakearr[0].y + inputDir.y});
        let a=2;
        let b =16;
        food = {x: Math.floor(a + (b-a)* Math.random()), y: Math.floor(a + (b-a)* Math.random())}
        console.log('food position',food)
    }


    for (let i = snakearr.length - 1 ; i > 0; i--) { 
        snakearr[i] = {...snakearr[ i - 1 ]};
    }

    snakearr[0].x += inputDir.x;
    snakearr[0].y += inputDir.y;
    //snake position strating or displaying the snake and food element
    
    board.innerHTML="";
    snakearr.forEach((e, index)=>{
        snakeElement=document.createElement('div');
        snakeElement.style.gridRowStart= e.y;
        snakeElement.style.gridColumnStart= e.x;
        if(index === 0){
            snakeElement.classList.add('head')
        }else{
            snakeElement.classList.add('tail')
        }
        board.appendChild(snakeElement);
    })

    foodElement = document.createElement('div');
    foodElement.style.gridRowStart =food.y;
    foodElement.style.gridColumnStart=food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement)


    scoreBox.innerHTML = "Score : " + score;

    setTimeout(main, 1000 / speed);

}



window.addEventListener('keydown',e=>{
   
    if(gameover){       
        gameover=false;
        score=0;
        inputDir = { x: 0, y: 1 };
        end.innerHTML = "";
        setTimeout(main, 1000 / speed);
    }
    switch (e.key) {
        case 'ArrowUp':
            console.log("arrowup");
            inputDir.x=0;
            inputDir.y=-1;
            break;

        case 'ArrowDown':
        console.log("arrowdown");
        inputDir.x=0;
        inputDir.y=1;
           break;

        case 'ArrowRight':
            console.log("arrowright");
            inputDir.x=1
            inputDir.y=0
            break;
        case 'ArrowLeft':
            console.log("arrowleft");
            inputDir.x=-1;
            inputDir.y=0;
            break;    
        default:
            break;
    }
})

setTimeout(main,1000/speed);