var paused = false

function keyReleased() {
    if (gameIsStarted) {
        players[0].move(0)
    }
}

function keyPressed() {
    if (gameIsStarted) {
        if (key == 'ArrowUp' || key == 'W' || key == 'w') {
            players[0].move(-10)
        } else if (key == 'ArrowDown' || key == 'S' || key == 's') {
            players[0].move(10)
        }
    }
}