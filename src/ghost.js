  //create ghosts using Constructors
  class Ghost {
    constructor(className, startIndex, speed) {
        this.className = className;
        this.startIndex = startIndex;
        this.speed = speed;
        this.currentIndex = startIndex;
        this.isScared = false;
        this.timerId = NaN;
    }
}

//all ghosts
ghosts = [
    new Ghost('blinky', 349, 250),
    new Ghost('pinky', 377, 400),
    new Ghost('inky', 350, 300),
    new Ghost('clyde', 378, 500)
];