'use strict';
let canvas, canvasContext;
let ballX, ballY;
let ballSpeedX, ballSpeedY;
const PADDLE_WIDTH = 200;
const PADDLE_HEIGHT = 10;
const PADDLE_DIST_FROM_CANVAS = 60; // to draw the paddle a bit up then the bottom of canvas
let paddleX = 40;
let mouseX = 0;
let mouseY = 0;
let mouseBrickColNo;
let mouseBrickRowNo;

//brick details
const BRICK_H = 50;
const BRICK_W = 100;
const BRICK_COLS = 12;
const BRICK_ROWS = 4;
let brickGrid = new Array(new Array(BRICK_COLS * BRICK_ROWS));

function onload() {
    canvas = document.getElementById("gameCanvas");
    canvasContext = canvas.getContext("2d");
    ballX = ballY = 0;
    ballSpeedX = ballSpeedY = 5;
    setInterval(updateAll, 30);
    document.addEventListener('mousemove', handleBar);
    brickReset();
}
onload();

function brickReset() {
    for (let row = 0; row < BRICK_ROWS; row++) {
        brickGrid[row] = [];
        for (let col = 0; col < BRICK_COLS; col++) {
            brickGrid[row][col] = true;
        }
    }
    brickGrid[2][8] = false;

}

function handleBar(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    paddleX = mouseX - PADDLE_WIDTH / 2;
}

function updateAll() {
    drawAll();
    moveAll();
}

function drawAll() {
    colorRect(0, 0, canvas.width, canvas.height, 'black'); // used to clear screen
    drawCircle(ballX, ballY, 10, 'white'); // used to draw ball
    colorRect(paddleX, canvas.height - PADDLE_DIST_FROM_CANVAS, PADDLE_WIDTH, PADDLE_HEIGHT, 'white');
    drawBrick();
    console.log(ballX, ballY);

    mouseBrickColNo = Math.floor(ballX / BRICK_W);
    mouseBrickRowNo = Math.floor(ballY / BRICK_H);

    colorText(mouseBrickRowNo + "," + mouseBrickColNo, mouseX, mouseY, "yellow");
    //checking if the brick is defined;
    if (brickGrid[mouseBrickRowNo] && brickGrid[mouseBrickRowNo][mouseBrickColNo])
        brickGrid[mouseBrickRowNo][mouseBrickColNo] = false;
}

function moveAll() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;
    if (ballX >= canvas.width) ballSpeedX = -ballSpeedX; //ball trying to cross right side, 
    if (ballY >= canvas.height) resetGame(); //ball trying to cross down
    if (ballX < 0) ballSpeedX = -ballSpeedX; //ball trying to cross left side, 
    if (ballY < 0) ballSpeedY = -ballSpeedY; //ball trying to cross top
    //getting the paddle position so that we can bounce back the ball only from this position
    let paddleTopEdgeY = canvas.height - PADDLE_DIST_FROM_CANVAS;
    let paddleBottomEdgeY = paddleTopEdgeY + PADDLE_HEIGHT;
    let paddleLeftEdgeX = paddleX;
    let paddleRightEdgeX = paddleLeftEdgeX + PADDLE_WIDTH;
    //bounce back from paddle
    if (ballX > paddleLeftEdgeX &&
        ballX < paddleRightEdgeX &&
        ballY > paddleTopEdgeY &&
        ballY < paddleBottomEdgeY) {
        ballSpeedY = -ballSpeedY;
        //control the speed depending on where the ball hit on the paddle
        let centerOfPaddleX = paddleX + PADDLE_WIDTH / 2;
        let distOfBallFromPaddleCenterX = ballX - centerOfPaddleX;
        ballSpeedX = distOfBallFromPaddleCenterX * 0.2;
    }
}

function colorRect(topLeft, topRight, boxWidth, boxHeight, color) {
    canvasContext.fillStyle = color
    canvasContext.fillRect(topLeft, topRight, boxWidth, boxHeight);
}

function drawCircle(centerX, centerY, radius, color) {
    canvasContext.fillStyle = color;
    canvasContext.beginPath();
    canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
    canvasContext.fill();
}

function colorText(text, mouseX, mouseY, fillColor) {
    canvasContext.fillStyle = fillColor;
    canvasContext.fillText(text, mouseX, mouseY);
}

function drawBrick() {
    for (let eachRow = 0; eachRow < BRICK_ROWS; eachRow++) {
        for (let eachCol = 0; eachCol < BRICK_COLS; eachCol++) {
            if (brickGrid[eachRow][eachCol]) {
                colorRect(BRICK_W * eachCol, BRICK_H * eachRow, BRICK_W - 4, BRICK_H - 4, 'yellow');
            }
        }
    }
}

function resetGame() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
}














