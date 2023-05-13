class Game {
    constructor() {

        this.state = 1
        this.score
        this.chances
        this.state_speed_x
        this.state_speed_y

        this.menu_sound
        this.hit_sound

        this.chance_message
        this.score_message
        this.mode_message
        
        class Ball {
            constructor(x, y) {
                this.x = x
                this.y = y
                this.x_dir_mult = 1
                this.y_dir_mult = 1
                this.x_speed
            }
        }

        class LeftSlider {
            constructor() {
                this.y = 250
            }
        }

        class RightSlider {
            constructor() {
                this.y = 250
            }
        }

        this.ball = new Ball(250, 250)
        this.left_slider = new LeftSlider()
        this.right_slider = new RightSlider()
    }
}

game = new Game()

function preload() {
    game.menu_sound = loadSound("sounds/menu.wav");
    game.hit_sound = loadSound("sounds/hit.wav");
}

function setup() {
    createCanvas(500, 500);
    background(0);
    noStroke();
    textFont("consolas");
}

function draw() {
    if (game.state == 1) {

        background(0);
        textSize(30);
        fill(255);

        textAlign(CENTER);
        text("Select difficulty", 250, 220);

        rectMode(CENTER);
        rect(125, 320, 100, 70, 5);
        rect(250, 320, 100, 70, 5);
        rect(375, 320, 100, 70, 5);

        fill(0);
        text("Easy", 125, 330);
        textSize(27);
        text("Normal", 250, 330);
        textSize(30);
        text("Hard", 375, 330);

        textSize(35);
        fill(255);
        text("Welcome to Pong", 250, 145);
    }

    if (game.state == 2) { // game state

        background("rgba(0, 0, 0, 1)");
        fill(255);
        textSize(20);
        text("Score: " + game.score, 250, 40);

        rect(10, game.left_slider.y, 20, 150);
        rect(490, game.right_slider.y, 20, 150);
        ellipse(game.ball.x, game.ball.y, 20, 20);

        if (game.ball.x < 20 || game.ball.x > 480) { // flip direction and randomize x speed
            game.ball.x_dir_mult *= -1;
            game.ball.x_speed = random(0.8 * game.state_speed_x, 1.2 * game.state_speed_x);

            if (
                game.ball.x - 10 > 480 + 10 ||
                game.ball.x + 10 < 480 - 10 ||
                game.ball.y - 10 > game.right_slider.y + 75 ||
                game.ball.y + 10 < game.right_slider.y - 75
            ) {} 
            else {game.score += 1} // add point for hitting sliders

            if (
                game.ball.x - 10 > 20 + 10 ||
                game.ball.x + 10 < 20 - 10 ||
                game.ball.y - 10 > game.left_slider.y + 75 ||
                game.ball.y + 10 < game.left_slider.y - 75
            ) {} 
            else {game.score += 1}
        }

        if (game.ball.y < 20 || game.ball.y > 480) {
            game.ball.y_dir_mult *= -1;
        }

        if (
            game.ball.x - 10 > 20 + 10 ||
            game.ball.x + 10 < 20 - 10 ||
            game.ball.y - 10 > game.left_slider.y + 75 ||
            game.ball.y + 10 < game.left_slider.y - 75
        ) {
            if (game.ball.x < 20) { // deducts chances
                game.chances -= 1;
                game.hit_sound.play();
                if (game.chances == 0) {
                    game.state = 3;
                }
            }
        }

        if (
            game.ball.x - 10 > 480 + 10 ||
            game.ball.x + 10 < 480 - 10 ||
            game.ball.y - 10 > game.right_slider.y + 75 ||
            game.ball.y + 10 < game.right_slider.y - 75
        ) {
            if (game.ball.x > 480) {
                game.chances -= 1;
                game.hit_sound.play();
                if (game.chances == 0) {
                    game.state = 3;
                }
            }
        }

        if (game.ball.x < 20) { // stops out of bounds
            game.ball.x = 20;
        } else if (game.ball.x > 480) {
            game.ball.x = 480;
        }

        game.ball.x += game.ball.x_speed * game.ball.x_dir_mult; // updates ball movement
        game.ball.y += game.state_speed_y * game.ball.y_dir_mult;
        game.left_slider.y = mouseY; // updates slider movement
        game.right_slider.y = mouseY;
    }

    if (game.state == 3) { // fail screen state
        background(0);
        textSize(35);
        fill(255, 255, 255);
        textAlign(CENTER);
        text("You failed. Try again?", 250, 200);

        rect(500 / 3, 320, 100, 75, 5);
        rect((2 * 500) / 3, 320, 100, 75, 5);

        fill(0);
        text("Quit", 500 / 3, 330);
        text("Yes", (2 * 500) / 3, 330);
    }

    if (game.state == 4) { // quit game state
        background(0);
        textSize(35);
        fill(255);
        text("Thanks for playing", 250, 250);
    }

    if (game.state == 5) { // prepare for game state
        background(0);
        textSize(28);
        fill(255, 255, 255);
        text(game.mode_message, 250, 175);
        text(game.chance_message, 250, 225);
        text("Click anywhere to begin", 250, 275);
        text("Good luck!", 250, 325);
    }
}

function mouseClicked() {

    if (game.state == 5) { // starts game
        game.left_slider.y = 250;
        game.right_slider.y = 250;
        game.ball.x_dir_mult = 1;
        game.ball.y_dir_mult = 1;
        game.ball.x = 250;
        game.ball.y = 250;
        game.score = 0;
        game.state = 2;
        game.menu_sound.play();
    }

    if (game.state == 1) { // chooses difficulty

        function choose_settings({chances, speed_x, speed_y, mode}) {
            game.chances = chances
            game.state_speed_x = speed_x;
            game.ball.x_speed = game.state_speed_x
            game.state_speed_y = speed_y;
            game.mode_message = `You chose ${mode} mode`;
            game.chance_message = `You have ${chances} chances`;
            game.state = 5;
            game.menu_sound.play();
        }

        if (
            mouseX > 75 &&
            mouseX < 175 &&
            mouseY > 320 - 35 &&
            mouseY < 320 + 35
        ) {choose_settings({chances: 3, speed_x: 8, speed_y: 3, mode: "easy"})}

        else if (
            mouseX > 200 &&
            mouseX < 300 &&
            mouseY > 320 - 35 &&
            mouseY < 320 + 35
        ) {choose_settings({chances: 2, speed_x: 12, speed_y: 5, mode: "normal"})}

        else if (
            mouseX > 325 &&
            mouseX < 425 &&
            mouseY > 320 - 35 &&
            mouseY < 320 + 35
        ) {choose_settings({chances: 1, speed_x: 16, speed_y: 7, mode: "hard"})}
    }

    if (game.state == 3) { // replay or quit screen

        if (
            mouseX > 1000 / 3 - 50 &&
            mouseX < 1000 / 3 + 50 &&
            mouseY < 320 + 75 / 2 &&
            mouseY > 320 - 75 / 2
        ) {
            game.state = 1;
            game.menu_sound.play();
        }
        
        else if (
            mouseX > 500 / 3 - 50 &&
            mouseX < 500 / 3 + 50 &&
            mouseY < 320 + 75 / 2 &&
            mouseY > 320 - 75 / 2
        ) {
            game.state = 4;
            game.menu_sound.play();
        }
    }
}
