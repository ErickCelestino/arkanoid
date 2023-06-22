import { CanvasView } from "./view/canvas-view";
import { Ball,Paddle, Brick  } from "./sprites";
// Images
import PADDLE_IMAGE from './images/paddle.png';
import BALL_IMAGE from './images/ball.png';
// Level and colors
import {
    PADDLE_SPEED,
    PADDLE_WIDTH,
    PADDLE_HEIGHT,
    PADDLE_STARTX,
    BALL_SPEED,
    BALL_SIZE,
    BALL_STARTX,
    BALL_STARTY
} from './setup';
// Helpers
import { createBricks } from "./helpers";

let gameOver = false;
let score = 0;

function setGameOver(view: CanvasView) {
    view.drawInfo('Game over!');
    gameOver = false;
}

function setGameWin(view: CanvasView) {
    view.drawInfo('Game won!');
    gameOver = false;
}

function gameLoop(
    view: CanvasView,
    bricks: Brick[],
    paddle: Paddle,
    // ball: Ball
) {
    view.clear();
    view.drawBricks(bricks);

    requestAnimationFrame(() => gameLoop(view, bricks, paddle));
}

function startGame(view: CanvasView) {
    // Reset displays
    score = 0;
    view.drawInfo('');
    view.drawScore(0);
    //Create all bricks
    const bricks = createBricks();
    // Create a paddle
    const paddle = new Paddle(
        PADDLE_SPEED,
        PADDLE_WIDTH,
        PADDLE_HEIGHT,
        {
            x: PADDLE_STARTX,
            y: view.canvas.height - PADDLE_HEIGHT - 5
        },
        PADDLE_IMAGE
    )

    gameLoop(view, bricks, paddle);
}

const view = new CanvasView('#playField');
view.initStartButton(startGame);