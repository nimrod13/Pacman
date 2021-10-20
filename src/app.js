const grid = document.querySelector(".grid");
const end = document.querySelector(".end");
const scoreDisplay = document.getElementById("score");
const width = 28; //28x28 = 784 squares;
let score = 0;

// Layout of the grid and what is in the squares
// 0 - pac-dots
// 1 - wall
// 2 - ghost-lair
// 3 - power-pellet
// 4 - empty
const layout = [
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0,
  1, 1, 1, 1, 0, 1, 1, 3, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1,
  1, 0, 1, 1, 1, 1, 3, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1,
  1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1,
  1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  0, 1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 0, 1, 1, 4, 1, 1, 1, 2, 2, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 0, 1, 1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
  4, 4, 4, 4, 4, 4, 0, 0, 0, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 0, 0, 0, 4, 4, 4, 4,
  4, 4, 1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 0, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1,
  1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4,
  4, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0,
  1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1,
  1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 3, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 3, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0,
  1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1,
  1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0,
  0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1,
];

const squares = [];
let pacmanCurrentIndex;

/** Create your board. */
function createBoard() {
  for (let i = 0; i < layout.length; i++) {
    const square = document.createElement("div");
    grid.appendChild(square);
    squares.push(square);

    //add layout to the board
    switch (layout[i]) {
      case 0:
        squares[i].classList.add("pac-dot");
        break;
      case 1:
        squares[i].classList.add("wall");
        break;
      case 2:
        squares[i].classList.add("ghost-lair");
        break;
      case 3:
        squares[i].classList.add("power-pellet");
        break;
    }
  }

  drawCharacters();
}

createBoard();

/** Place pacman on the board. */
function drawPacman() {
  pacmanCurrentIndex = 490;
  squares[pacmanCurrentIndex].classList.add("pacman");
}

/** Check if moving to a new position would mean running into a wall. */
function isWallAtNewPosition(index) {
  return squares[index].classList.contains("wall");
}

/** Move pacman */
function movePacman(e) {
  squares[pacmanCurrentIndex].classList.remove("pacman");
  let isGoingLeft = false;
  let isGoingUp = false;
  let isGoingDown = false;

  switch (e.keyCode) {
    case 37: //left
      if (
        pacmanCurrentIndex % width !== 0 &&
        !isWallAtNewPosition(pacmanCurrentIndex - 1) &&
        !squares[pacmanCurrentIndex - 1].classList.contains("ghost-lair")
      ) {
        pacmanCurrentIndex -= 1;
      }

      // check left exit
      if (squares[pacmanCurrentIndex - 1] === squares[363]) {
        pacmanCurrentIndex = 391;
      }

      isGoingLeft = true;
      break;
    case 38: // up
      if (
        pacmanCurrentIndex - width >= 0 &&
        !isWallAtNewPosition(pacmanCurrentIndex - width) &&
        !squares[pacmanCurrentIndex - width].classList.contains("ghost-lair")
      ) {
        pacmanCurrentIndex -= width;
      }

      isGoingUp = true;
      break;

    case 39: // right
      if (
        pacmanCurrentIndex % width < width - 1 &&
        !isWallAtNewPosition(pacmanCurrentIndex + 1) &&
        !squares[pacmanCurrentIndex + 1].classList.contains("ghost-lair")
      ) {
        pacmanCurrentIndex += 1;
      }

      // check right exit
      if (squares[pacmanCurrentIndex + 1] === squares[392]) {
        pacmanCurrentIndex = 364;
      }

      isGoingRight = true;
      break;

    case 40: // down
      if (
        pacmanCurrentIndex + width < width * width &&
        !isWallAtNewPosition(pacmanCurrentIndex + width) &&
        !squares[pacmanCurrentIndex + width].classList.contains("ghost-lair")
      ) {
        pacmanCurrentIndex += width;
      }

      isGoingDown = true;
      break;
    default:
      break;
  }

  squares[pacmanCurrentIndex].classList.add("pacman");

  if (isGoingLeft) {
    squares[pacmanCurrentIndex].classList.add("rotated");
  } else {
    squares[pacmanCurrentIndex].classList.remove("rotated");
  }

  if (isGoingUp) {
    squares[pacmanCurrentIndex].classList.add("up");
  } else {
    squares[pacmanCurrentIndex].classList.remove("up");
  }

  if (isGoingDown) {
    squares[pacmanCurrentIndex].classList.add("down");
  } else {
    squares[pacmanCurrentIndex].classList.remove("down");
  }

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
  document.addEventListener("keydown", movePacman);
  ghosts.forEach((ghost) => moveGhost(ghost));
}

/** What happens when you eat a pac-dot */
function pacDotEaten() {
  if (squares[pacmanCurrentIndex].classList.contains("pac-dot")) {
    score++;
    updateScore();
    squares[pacmanCurrentIndex].classList.remove("pac-dot");
  }
}

/** Display new score. */
function updateScore() {
  scoreDisplay.innerHTML = score;
}

/** What happens when you eat a power-pellet. */
function powerPelletEaten() {
  if (squares[pacmanCurrentIndex].classList.contains("power-pellet")) {
    score += 10;
    ghosts.forEach((ghost) => (ghost.isScared = true));
    setTimeout(unScareGhosts, 10000);
    squares[pacmanCurrentIndex].classList.remove("power-pellet");
  }
}

/** Remove ghost when pacman eats it and update score. */
function ghostEaten(ghost) {
  squares[ghost.currentIndex].classList.remove(
    ghost.className,
    "ghost",
    "scared-ghost"
  );
  ghost.currentIndex = ghost.startIndex;
  squares[ghost.currentIndex].classList.add(ghost.className, "ghost");
  score += 100;
  updateScore();
}

/** Make the ghosts stop flashing */
function unScareGhosts() {
  ghosts.forEach((ghost) => (ghost.isScared = false));
}

/** Draw ghosts onto the grid */
function drawGhosts() {
  ghosts.forEach((ghost) =>
    squares[ghost.currentIndex].classList.add(ghost.className, "ghost")
  );
}

function moveGhost(ghost) {
  const directions = [-1, +1, width, -width];
  let direction =
    ghost.currentIndex === ghost.startIndex
      ? -28
      : directions[Math.floor(Math.random() * directions.length)];

  ghost.timerId = setInterval(function () {
    //if the next squre your ghost is going to go to does not have a ghost and does not have a wall
    if (
      !squares[ghost.currentIndex + direction].classList.contains("ghost") &&
      !isWallAtNewPosition(ghost.currentIndex + direction)
    ) {
      //remove the ghosts classes
      squares[ghost.currentIndex].classList.remove(
        ghost.className,
        "ghost",
        "scared-ghost"
      );
      //move into that space
      ghost.currentIndex += direction;
      squares[ghost.currentIndex].classList.add(ghost.className, "ghost");
      //else find a new random direction to go in
    } else {
      direction = directions[Math.floor(Math.random() * directions.length)];
    }

    //if the ghost is currently scared
    if (ghost.isScared) {
      squares[ghost.currentIndex].classList.add("scared-ghost");
    }

    //if the ghost is currently scared and pacman is on it
    if (
      ghost.isScared &&
      squares[ghost.currentIndex].classList.contains("pacman")
    ) {
      ghostEaten(ghost);
    }

    checkForGameOver();
  }, ghost.speed);
}

/** Check for a game over. */
function checkForGameOver() {
  if (
    squares[pacmanCurrentIndex].classList.contains("ghost") &&
    !squares[pacmanCurrentIndex].classList.contains("scared-ghost")
  ) {
    stopGame();
    squares[pacmanCurrentIndex].classList.remove("pacman");
    end.textContent = "Game Over :(";
  }
}

/** Check for a win when the set score is reached. */
function checkForWin() {
  if (score >= 274) {
    stopGame();
    end.textContent = "You WON :)";
  }
}

function stopGame() {
  ghosts.forEach((ghost) => clearInterval(ghost.timerId));
  document.removeEventListener("keydown", movePacman);
}

function resetGhosts() {
  ghosts.forEach((ghost) => {
    squares[ghost.currentIndex].classList.remove(
      ghost.className,
      "ghost",
      "scared-ghost"
    );
    ghost.currentIndex = ghost.startIndex;
    clearInterval(ghost.timerId);
  });
}

document.querySelector(".start-button").addEventListener("click", () => {
  end.textContent = "";
  score = 0;
  squares.forEach((square) => square.classList.remove("pacman"));

  resetGhosts();
  updateScore();
  createBoard();
  initGame();
});
