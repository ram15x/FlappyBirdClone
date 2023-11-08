//board
let board;
let boardWidth = 360;
let boardHeight = 640;
let context;

//bird
let birdWidth = 34; //width/height ratio = 408/228 = 17/12
let birdHeight = 24;
let birdX = boardWidth/8;
let birdY = boardHeight/2;
let birdImg;

let bird = {
    x : birdX,
    y : birdY,
    width : birdWidth,
    height : birdHeight
}

//pipes
let pipeArray = [];
let pipeWidth = 64; //width/height ratio = 384/3072 = 1/8
let pipeHeight = 512;
let pipeX = boardWidth;
let pipeY = 0;

let topPipeImg;
let bottomPipeImg;

//physics
let velocityX = -2; //pipes moving left speed
let velocityY = 0; //bird jump speed
let gravity = 0.4;

let gameOver = false;
let score = 0;

window.onload = function() {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d"); //used for drawing on the board

    //draw flappy bird
    // context.fillStyle = "green";
    // context.fillRect(bird.x, bird.y, bird.width, bird.height);

    //load images
    birdImg = new Image();
    birdImg.src = "data:image/png;base64,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";
    birdImg.onload = function() {
        context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
    }

    topPipeImg = new Image();
    topPipeImg.src = "toppipe.png";

    bottomPipeImg = new Image();
    bottomPipeImg.src = "bottompipe.png";

    requestAnimationFrame(update);
    setInterval(placePipes, 1500); //every 1.5 seconds
    document.addEventListener("keydown", moveBird);
}

function update() {
    requestAnimationFrame(update);
    if (gameOver) {
        return;
    }
    context.clearRect(0, 0, board.width, board.height);

    //bird
    velocityY += gravity;
    // bird.y += velocityY;
    bird.y = Math.max(bird.y + velocityY, 0); //apply gravity to current bird.y, limit the bird.y to top of the canvas
    context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);

    if (bird.y > board.height) {
        gameOver = true;
    }

    //pipes
    for (let i = 0; i < pipeArray.length; i++) {
        let pipe = pipeArray[i];
        pipe.x += velocityX;
        context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);

        if (!pipe.passed && bird.x > pipe.x + pipe.width) {
            score += 0.5; //0.5 because there are 2 pipes! so 0.5*2 = 1, 1 for each set of pipes
            pipe.passed = true;
        }

        if (detectCollision(bird, pipe)) {
            gameOver = true;
        }
    }

    //clear pipes
    while (pipeArray.length > 0 && pipeArray[0].x < -pipeWidth) {
        pipeArray.shift(); //removes first element from the array
    }

    //score
    context.fillStyle = "white";
    context.font="45px sans-serif";
    context.fillText(score, 5, 45);

    if (gameOver) {
        context.fillText("GAME OVER", 5, 90);
    }
}

function placePipes() {
    if (gameOver) {
        return;
    }

    //(0-1) * pipeHeight/2.
    // 0 -> -128 (pipeHeight/4)
    // 1 -> -128 - 256 (pipeHeight/4 - pipeHeight/2) = -3/4 pipeHeight
    let randomPipeY = pipeY - pipeHeight/4 - Math.random()*(pipeHeight/2);
    let openingSpace = board.height/4;

    let topPipe = {
        img : topPipeImg,
        x : pipeX,
        y : randomPipeY,
        width : pipeWidth,
        height : pipeHeight,
        passed : false
    }
    pipeArray.push(topPipe);

    let bottomPipe = {
        img : bottomPipeImg,
        x : pipeX,
        y : randomPipeY + pipeHeight + openingSpace,
        width : pipeWidth,
        height : pipeHeight,
        passed : false
    }
    pipeArray.push(bottomPipe);
}

function moveBird(e) {
    if (e.code == "Space" || e.code == "ArrowUp" || e.code == "KeyX") {
        //jump
        velocityY = -6;

        //reset game
        if (gameOver) {
            bird.y = birdY;
            pipeArray = [];
            score = 0;
            gameOver = false;
        }
    }
}

function detectCollision(a, b) {
    return a.x < b.x + b.width &&   //a's top left corner doesn't reach b's top right corner
           a.x + a.width > b.x &&   //a's top right corner passes b's top left corner
           a.y < b.y + b.height &&  //a's top left corner doesn't reach b's bottom left corner
           a.y + a.height > b.y;    //a's bottom left corner passes b's top left corner
}