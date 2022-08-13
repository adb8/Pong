let state = 1
let leftSliderY = 250
let rightSliderY = 250
let ballXDirection = 1
let ballYDirection = 1
let ballX = 250
let ballY = 250
let chances
let speed
let modeMsg
let chanceMsg
let menuSound
let hitSound
let score
let scoreMsg
let tempSpeed
let ySpeed

function preload() { // load sounds
    menuSound = loadSound('sounds/menu.wav')
    hitSound = loadSound('sounds/hit.wav')
}

function setup(){ // create initial parameters
    createCanvas(500,500)
    background(0)
    noStroke()
    textFont('consolas')
}

function draw() { // determines each frame
    if (state == 1) { // home screen & choose difficulty state
        background(0)
        textSize(30)
        fill(255)
        textAlign(CENTER)
        text('Select difficulty', 250, 220)
        rectMode(CENTER)
        rect(125, 320, 100, 70, 5)
        rect(250, 320, 100, 70, 5)
        rect(375, 320, 100, 70, 5)
        fill(0)
        text('Easy', 125, 330)
        textSize(27)
        text('Normal', 250, 330)
        textSize(30)
        text('Hard', 375, 330)
        textSize(35)
        fill(255)
        text('Welcome to Pong', 250, 145)
    }
    if (state == 2) { // game state
        background('rgba(0, 0, 0, 0.5)')
        fill(255)
        textSize(20)
        scoreMsg = 'Score: ' + score
        text(scoreMsg, 250, 40) // score displayer
        rect(10, leftSliderY, 20, 150) // define shapes
        rect(490, rightSliderY, 20, 150)
        ellipse(ballX, ballY, 20, 20)
        if (ballX < 20 || ballX > 480) { // score counter & direction switch
            ballXDirection *= -1
            tempSpeed = random(speed - speed/5, speed + speed/5)
            console.log(tempSpeed)
            if (ballX - 10 > 480 + 10 || 
                ballX + 10 < 480 - 10 || 
                ballY - 10 > rightSliderY + 75 || 
                ballY + 10 < rightSliderY - 75) {
                } else {
                    score += 1
                }
            if (ballX - 10 > 20 + 10 || 
                ballX + 10 < 20 - 10 || 
                ballY - 10 > leftSliderY + 75 || 
                ballY + 10 < leftSliderY - 75) {
                } else {
                    score += 1
                }
        }
        if (ballY < 20 || ballY > 480) {
            ballYDirection *= -1
        }
        if (ballX - 10 > 20 + 10 || // fail counter
            ballX + 10 < 20 - 10 || 
            ballY - 10 > leftSliderY + 75 || 
            ballY + 10 < leftSliderY - 75) {
                if (ballX < 20) {
                    chances -= 1
                    hitSound.play()
                    if (chances == 0) {
                        state = 3
                    }
                }
        }
        if (ballX - 10 > 480 + 10 || // fail counter
            ballX + 10 < 480 - 10 || 
            ballY - 10 > rightSliderY + 75 || 
            ballY + 10 < rightSliderY - 75) {
                if (ballX > 480) {
                    chances -= 1
                    hitSound.play()
                    if (chances == 0) {
                        state = 3
                    }
                }
        }
        if (ballX < 20) {
            ballX = 20
        } else if (ballX > 480) {
            ballX = 480
        }
        ballX += tempSpeed * ballXDirection // ball movement updater
        ballY += ySpeed * ballYDirection
        leftSliderY = mouseY // slider movement updater
        rightSliderY = mouseY
    }
    if (state == 3) { // fail screen state
        background(0)
        textSize(35)
        fill(255, 255, 255)
        textAlign(CENTER)
        text('You failed. Try again?', 250, 200)
        rect(500/3, 320, 100, 75, 5)
        rect((2*500)/3, 320, 100, 75, 5)
        fill(0)
        text('Quit', 500/3, 330)
        text('Yes', (2*500)/3, 330)
    }
    if (state == 4) { // quit game state
        background(0)
        textSize(35)
        fill(255)
        text('Thanks for playing', 250, 250)
    }
    if (state == 5 && modeMsg != undefined && chanceMsg != undefined) { // prepare for game state
        background(0)
        textSize(28)
        fill(255, 255, 255)
        text(modeMsg, 250, 175)
        text(chanceMsg, 250, 225)
        text('Click anywhere to begin', 250, 275)
        text('Good luck!', 250, 325)
    }
}

function mouseClicked() {
    if (state == 5) { // begins game
        leftSliderY = 250
        rightSliderY = 250
        ballXDirection = 1
        ballYDirection = 1 
        ballX = 250
        ballY = 250
        score = 0
        state = 2
        menuSound.play()
    }
    if (state == 1) { // chooses difficulty
        if (mouseX > 75 && mouseX < 175 && mouseY > 320 - 35 && mouseY < 320 + 35) { // easy mode
            console.log('Easy mode selected')
            chances = 3
            speed = 8
            tempSpeed = 8
            ySpeed = 3
            modeMsg = 'You chose easy mode'
            chanceMsg = 'You have 3 chances'
            state = 5
            menuSound.play()
        }
        if (mouseX > 200 && mouseX < 300 && mouseY > 320 - 35 && mouseY < 320 + 35) { // normal mode
            console.log('Normal mode selected')
            chances = 2
            speed = 12
            tempSpeed = 12
            ySpeed = 5
            modeMsg = 'You chose normal mode'
            chanceMsg = 'You have 2 chances'
            state = 5
            menuSound.play()
        }
        if (mouseX > 325 && mouseX < 425 && mouseY > 320 - 35 && mouseY < 320 + 35) { // hard mode
            console.log('Hard mode selected')
            chances = 1
            speed = 16
            tempSpeed = 16
            ySpeed = 7
            modeMsg = 'You chose hard mode'
            chanceMsg = 'You have 1 chance'
            state = 5
            menuSound.play()
        } 
    }
    if (state == 3) { // replay or quit
        if (mouseX > 1000/3 - 50 && mouseX < 1000/3 + 50 && mouseY < 320 + 75/2 && mouseY > 320 - 75/2) {
            state = 1
            menuSound.play()
        }
        if (mouseX > 500/3 - 50 && mouseX < 500/3 + 50 && mouseY < 320 + 75/2 && mouseY > 320 - 75/2) {
            state = 4
            menuSound.play()
        }
    }
}