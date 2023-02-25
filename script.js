const playBoard = document.querySelector(".play-board")
const scoreIndicator = document.querySelector(".score")
const highScoreIndicator = document.querySelector(".high-score")
const controls = document.querySelectorAll(".controls i");

let gameOver = false;
let intervalId
let foodX = 13;
let foodY = 10;
let velocityX = 0;
let velocityY = 0;
let snakeX = 5;
let snakeY = 5;
let snakeBody = [];
let score = 0;

let highScore = localStorage.getItem("high-score") || 0;
highScoreIndicator.innerText = `High Score: ${highScore}`;

const changeFoodPosition = () => {
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
}

const handleGameOver = () => {
    clearInterval(intervalId)
    alert("Game Over! Press OK to replay...")
    location.reload()
}

const changeDirection = (e) => {
    if(e.key === "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    } else if(e.key === "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    } else if(e.key === "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    } else if(e.key === "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }

    initGame()
}

controls.forEach(button => button.addEventListener("click", () => changeDirection({ key: button.dataset.key })));

const initGame = () => {

    if(gameOver) return handleGameOver()

    let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`

    if(snakeX === foodX && snakeY === foodY){
        changeFoodPosition()
        snakeBody.push([foodY, foodX])
        score++
        scoreIndicator.innerText = `Score: ${score}`

        highScore = score >= highScore ? score : highScore;
        localStorage.setItem("high-score", highScore)

        highScoreIndicator.innerText = `High Score: ${highScore}`
    }

    for (let index = snakeBody.length - 1; index > 0; index--) {
        snakeBody[index] = snakeBody[index - 1]
    }

    snakeBody[0] = [snakeX , snakeY]

    snakeX += velocityX
    snakeY += velocityY

    if(snakeX <= 0 || snakeY <= 0 || snakeX > 30 || snakeY > 30){
        gameOver = true
    }

    for (let index = 0; index < snakeBody.length; index++) {
        htmlMarkup += `<div class="head" style="grid-area: ${snakeBody[index][1]} / ${snakeBody[index][0]}"></div>`
        if(index !== 0 && snakeBody[0][1] === snakeBody[index][1] && snakeBody[0][0] === snakeBody[index][0]){
            gameOver = true
        }
    }

    playBoard.innerHTML = htmlMarkup
}

changeFoodPosition()
intervalId = setInterval(initGame, 125)

document.addEventListener("keydown", changeDirection)