const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const box = 20;
const canvasSize = 400;

let snake = [{ x: 200, y: 200 }];
let direction = "RIGHT";
let food = randomFood();
let score = 0;

// Highscore laden
let highscore = localStorage.getItem("snakeHighscore") || 0;
document.getElementById("highscore").innerText = highscore;

document.addEventListener("keydown", changeDirection);

function randomFood() {
    return {
        x: Math.floor(Math.random() * (canvasSize / box)) * box,
        y: Math.floor(Math.random() * (canvasSize / box)) * box
    };
}

function changeDirection(event) {
    if (event.key === "a" && direction !== "RIGHT") direction = "LEFT";
    if (event.key === "w" && direction !== "DOWN") direction = "UP";
    if (event.key === "d" && direction !== "LEFT") direction = "RIGHT";
    if (event.key === "s" && direction !== "UP") direction = "DOWN";
}

function collision(head, body) {
    return body.some(segment => segment.x === head.x && segment.y === head.y);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Snake
    snake.forEach((segment, index) => {
        ctx.fillStyle = index === 0 ? "#4caf50" : "#81c784";
        ctx.fillRect(segment.x, segment.y, box, box);
    });

    // Food
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);

    let headX = snake[0].x;
    let headY = snake[0].y;

    if (direction === "LEFT") headX -= box;
    if (direction === "UP") headY -= box;
    if (direction === "RIGHT") headX += box;
    if (direction === "DOWN") headY += box;

    // Game Over
    if (
        headX < 0 || headY < 0 ||
        headX >= canvasSize || headY >= canvasSize ||
        collision({ x: headX, y: headY }, snake)
    ) {
        clearInterval(game);

        if (score > highscore) {
            localStorage.setItem("snakeHighscore", score);
            alert("🎉 Neuer Highscore: " + score);
        } else {
            alert("Game Over! Punkte: " + score);
        }

        location.reload();
    }

    let newHead = { x: headX, y: headY };

    if (headX === food.x && headY === food.y) {
        score++;
        document.getElementById("score").innerText = score;
        food = randomFood();
    } else {
        snake.pop();
    }

    snake.unshift(newHead);
}

const game = setInterval(draw, 120);