const gameArea = document.getElementById('gameArea');
const paddle = document.getElementById('paddle');
const ball = document.getElementById('ball');
const scoreDisplay = document.getElementById('score');

let paddlePositionX = gameArea.clientWidth / 2 - paddle.clientWidth / 2;
let ballPositionX = gameArea.clientWidth / 2 - ball.clientWidth / 2;
let ballPositionY = 0;
let ballSpeedY = 3;
let ballSpeedX = 2;
let score = 0;

// Update the paddle position
function updatePaddlePosition() {
    paddle.style.left = `${paddlePositionX}px`;
}

// Move the ball
function moveBall() {
    ballPositionX += ballSpeedX;
    ballPositionY += ballSpeedY;

    // Ball collision with walls
    if (ballPositionX <= 0 || ballPositionX >= gameArea.clientWidth - ball.clientWidth) {
        ballSpeedX *= -1;  // Bounce the ball
    }

    // Ball falling off screen
    if (ballPositionY >= gameArea.clientHeight) {
        resetBall();
    }

    // Ball collision with paddle
    if (ballPositionY + ball.clientHeight >= gameArea.clientHeight - paddle.clientHeight &&
        ballPositionX + ball.clientWidth >= paddlePositionX &&
        ballPositionX <= paddlePositionX + paddle.clientWidth) {
        ballSpeedY *= -1;  // Bounce the ball back up
        score++;
        updateScore();
    }

    // Update ball position on screen
    ball.style.top = `${ballPositionY}px`;
    ball.style.left = `${ballPositionX}px`;
}

// Reset the ball position
function resetBall() {
    ballPositionX = gameArea.clientWidth / 2 - ball.clientWidth / 2;
    ballPositionY = 0;
}

// Update the score
function updateScore() {
    scoreDisplay.textContent = `Score: ${score}`;
}

// Move the paddle with arrow keys
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' && paddlePositionX > 0) {
        paddlePositionX -= 20;
    } else if (event.key === 'ArrowRight' && paddlePositionX < gameArea.clientWidth - paddle.clientWidth) {
        paddlePositionX += 20;
    }
    updatePaddlePosition();
});

// Game loop to animate the game
function gameLoop() {
    moveBall();
    requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();
