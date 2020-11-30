const grid = document.querySelector('.grid');
const end = document.querySelector('.end');
const scoreDisplay = document.getElementById('score');
const width = 28; //28x28 = 784 squares;
let score = 0;

// Layout of the grid and what is in the squares
// 0 - pac-dots
// 1 - wall
// 2 - ghost-lair
// 3 - power-pellet
// 4 - empty
const layout = [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 3, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 3, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 2, 2, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    4, 4, 4, 4, 4, 4, 0, 0, 0, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 0, 0, 0, 4, 4, 4, 4, 4, 4,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 3, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 3, 1,
    1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1,
    1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1,
    1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
    1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
];

const squares = [];
let pacmanCurrentIndex;

//create your board
function createBoard() {
    for (let i = 0; i < layout.length; i++) {
        const square = document.createElement('div');
        grid.appendChild(square);
        squares.push(square);

        //add layout to the board
        switch (layout[i]) {
            case 0:
                squares[i].classList.add('pac-dot');
                break;
            case 1:
                squares[i].classList.add('wall');
                break;
            case 2:
                squares[i].classList.add('ghost-lair');
                break;
            case 3:
                squares[i].classList.add('power-pellet');
                break;
        }
    }

    drawCharacters();
}

createBoard();

function drawPacman() {
    pacmanCurrentIndex = 490;
    squares[pacmanCurrentIndex].classList.add('pac-man');
}

function isWallAtNewPosition(index) {
    return squares[index].classList.contains('wall');
}

//move pacman
function movePacman(e) {
    squares[pacmanCurrentIndex].classList.remove('pac-man');

    switch (e.keyCode) {
        case 37: //left
            if (
                pacmanCurrentIndex % width !== 0 &&
                !isWallAtNewPosition(pacmanCurrentIndex - 1) &&
                !squares[pacmanCurrentIndex - 1].classList.contains('ghost-lair')
            ) {
                pacmanCurrentIndex -= 1;
            }

            // check left exit
            if (squares[pacmanCurrentIndex - 1] === squares[363]) {
                pacmanCurrentIndex = 391;
            }

            break;
        case 38: // up
            if (
                pacmanCurrentIndex - width >= 0 &&
                !isWallAtNewPosition(pacmanCurrentIndex - width) &&
                !squares[pacmanCurrentIndex - width].classList.contains('ghost-lair')
            ) {
                pacmanCurrentIndex -= width;
            }

            break;

        case 39: // right
            if (
                pacmanCurrentIndex % width < width - 1 &&
                !isWallAtNewPosition(pacmanCurrentIndex + 1) &&
                !squares[pacmanCurrentIndex + 1].classList.contains('ghost-lair')
            ) {
                pacmanCurrentIndex += 1;
            }

            // check right exit
            if (squares[pacmanCurrentIndex + 1] === squares[392]) {
                pacmanCurrentIndex = 364;
            }

            break;

        case 40: // down
            if (
                pacmanCurrentIndex + width < width * width &&
                !isWallAtNewPosition(pacmanCurrentIndex + width) &&
                !squares[pacmanCurrentIndex + width].classList.contains('ghost-lair')
            ) {
                pacmanCurrentIndex += width;
            }

            break;
        default:
            break;
    }

    squares[pacmanCurrentIndex].classList.add('pac-man');

    pacDotEaten();
    powerPelletEaten();
    checkForGameOver();
    checkForWin();
}

function drawCharacters() {
    drawPacman();
    drawGhosts();
}

function initGame() {
    document.addEventListener('keydown', movePacman);
    ghosts.forEach(ghost => moveGhost(ghost));
}

// what happens when you eat a pac-dot
function pacDotEaten() {
    if (squares[pacmanCurrentIndex].classList.contains("pac-dot")) {
        score++;
        updateScore();
        squares[pacmanCurrentIndex].classList.remove("pac-dot");
    }
}

function updateScore() {
    scoreDisplay.innerHTML = score;
}

// what happens when you eat a power-pellet
function powerPelletEaten() {
    if (squares[pacmanCurrentIndex].classList.contains('power-pellet')) {
        score += 10;
        ghosts.forEach(ghost => ghost.isScared = true);
        setTimeout(unScareGhosts, 10000);
        squares[pacmanCurrentIndex].classList.remove('power-pellet');
    }
}

// make the ghosts stop flashing
function unScareGhosts() {
    ghosts.forEach(ghost => ghost.isScared = false);
}

// draw ghosts onto the grid
function drawGhosts() {
    ghosts.forEach(ghost => squares[ghost.currentIndex].classList.add(ghost.className, 'ghost'));
}

function moveGhost(ghost) {
    const directions = [-1, +1, width, -width];
    let direction = directions[Math.floor(Math.random() * directions.length)];

    ghost.timerId = setInterval(function () {
        //if the next squre your ghost is going to go to does not have a ghost and does not have a wall
        if (!squares[ghost.currentIndex + direction].classList.contains('ghost') &&
            !isWallAtNewPosition(ghost.currentIndex + direction)) {
            //remove the ghosts classes
            squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost');
            //move into that space
            ghost.currentIndex += direction;
            squares[ghost.currentIndex].classList.add(ghost.className, 'ghost');
            //else find a new random direction ot go in
        } else {
            direction = directions[Math.floor(Math.random() * directions.length)];
        }

        //if the ghost is currently scared
        if (ghost.isScared) {
            squares[ghost.currentIndex].classList.add('scared-ghost');
        }

        //if the ghost is currently scared and pacman is on it
        if (ghost.isScared && squares[ghost.currentIndex].classList.contains('pac-man')) {
            squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost');
            ghost.currentIndex = ghost.startIndex;
            squares[ghost.currentIndex].classList.add(ghost.className, 'ghost');
            score += 100;
            updateScore();
        }

        checkForGameOver();
    }, ghost.speed);
}

// check for a game over
function checkForGameOver() {
    if (squares[pacmanCurrentIndex].classList.contains('ghost') &&
        !squares[pacmanCurrentIndex].classList.contains('scared-ghost')) {
        stopGame();
        end.textContent = 'Game Over :(';
    }
}

// check for a win - more is when this score is reached
function checkForWin() {
    if (score === 274) {
        stopGame();
        end.textContent = "You have WON!";
    }
}

function stopGame() {
    ghosts.forEach(ghost => clearInterval(ghost.timerId));
    document.removeEventListener('keydown', movePacman);
}

document.querySelector(".start-button").addEventListener("click", () => {
    end.textContent = "";
    score = 0;
    squares.forEach(square => square.classList.remove('pac-man', 'ghost'));

    ghosts.forEach(ghost => {
        squares[ghost.currentIndex].classList.remove(ghost.className);
        ghost.currentIndex = ghost.startIndex;
    });

    updateScore();
    drawCharacters();
    initGame();
});