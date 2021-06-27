// Game Constants & Variable

let InputDir = {x: 0, y: 0};
const gameOverSound = new Audio('gameOverSound.mp3');
const foodSound = new Audio('food.mp3');
const moveSound = new Audio('moveSound.mp3');
const musicSound = new Audio('music.mp3');

let score = 0;
let speed = 7;
let lastPaintTime = 0;
let snakeArr = [
    {x: 13, y: 15}
]

food = {x: 6, y: 7}


// Game Functions
function main(current_time){
    window.requestAnimationFrame(main);
   // console.log(current_time)
    if((current_time - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = current_time;
    
    gameEngine();

}

function isCollide(snake){
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    //wall
    if(snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0){
        return true;
    }
}

function gameEngine(){
    //part 1: Updating the snake array
    
    //if snake collide
    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        InputDir = {x: 0, y: 0};
        alert("Game Over Press Any Key To Play Again..!");
        snakeArr = [{x: 13, y: 15}];
        musicSound.play();
        score = 0;
    }
    //regenerate food and increase the score
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x ){
        foodSound.play()
        score += 1;
        scoreBox.innerHTML = "Score: " + score;
        snakeArr.unshift({x: snakeArr[0].x + InputDir.x, y: snakeArr[0].y + InputDir.y})
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b-a)*Math.random()), y: Math.round(a + (b-a)*Math.random())}
    }

    //moving the snake
    for (let i = snakeArr.length-2; i >= 0; i--) {
        snakeArr[i+1] = {...snakeArr[i]};
    }

    snakeArr[0].x += InputDir.x;
    snakeArr[0].y += InputDir.y;


    //part 2: Display the snake and food
    
    
    //Display the Snake
    board.innerHTML = "";
    snakeArr.forEach((e, index)=>{
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
    })
    
    
    //Display the Food
        foodElement = document.createElement('div');
        foodElement.style.gridRowStart = food.y;
        foodElement.style.gridColumnStart = food.x;
        foodElement.classList.add('food')
        board.appendChild(foodElement);
}






//main logics starts here
window.requestAnimationFrame(main);
window.addEventListener('keydown', e =>{
    InputDir = {x: 0, y: 1}  //start game on press of any key in y direction
    moveSound.play()
    switch(e.key){
        case "ArrowUp":
            console.log("ArrowUp");
            InputDir.x = 0;
            InputDir.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            InputDir.x = 0;
            InputDir.y = 1;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            InputDir.x = 1;
            InputDir.y = 0;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            InputDir.x = -1;
            InputDir.y = 0;
            break;
               
        default:
            break;
    }

})