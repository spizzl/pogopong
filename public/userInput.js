var paused = false;

function keyReleased() {
    players[0].move(0);
}

function keyPressed() {
    console.log(key);
    if (key == 'ArrowUp' || key == 'W' || key == 'w') {
        players[0].move(-10);
    } else if (key == 'ArrowDown' || key == 'S' || key == 's') {
        players[0].move(10);
    }
    //
    if (key == ' ') {
        if (!paused) {
            paused = true;
            pauseGame();
        } else {
            paused = false;
            resumeGame();
        }
    }
}

function resumeGame() {
    loop();
}

function pauseGame() {
    noLoop();
    fill(255);
    var size = 40;
    rect(size, size * 2, size, size * 2);
    rect(size * 3 - (size / 2), size * 2, size, size * 2);
}