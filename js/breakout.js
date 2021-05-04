// N220 Section 28238
// Dillon Polley
// Final Project
// Breakout
// 11/29/2020

// Disables undeclared variables and sets JS into strict mode
"use strict";
// An object to set all the beginning settings of the game
const Controls = {
  elements: new GameElements(
    280,
    5,
    5,
    [],
    ["#3C096C", "#370617", "#5A189A", "#6A040F", "#7B2CBF", "#9D0208"],
    50,
    380,
    20,
    false,
    false
  ),

  settings: new Game(5, 0, true, false),
};

// Called on initial startup in p5.js
function setup() {
  // Creates a canvas that is 600 pixels wide and 400 tall
  createCanvas(600, 400);

  background("#FF9E00");

  // Calls on the bricks to be created when the program loads up
  Controls.elements.createBricks();

  console.log(Controls.settings);
  console.log(Controls.elements);
}

function keyPressed(value) {
  let lifeCount = Controls.settings.lifeCount;
  let game = Controls.settings.game;
  let score = Controls.settings.score;
  let lives = Controls.settings.lives;
  let aKey = Controls.elements.aKey;
  let dKey = Controls.elements.dKey;
  let circleX = Controls.elements.circleX;
  let circleY = Controls.elements.circleY;
  let motion = Controls.elements.motion;

  if (value.keyCode === 68) {
    dKey = true;
  }

  if (value.keyCode === 65) {
    aKey = true;
  }

  if (value.keyCode === 82 && lifeCount) {
    lifeCount = false;
    circleX = motion + 50;
    circleY = 380;
  }

  if (value.keyCode === 82 && !game) {
    game = true;
    circleX = motion + 50;
    circleY = 380;
    score = 0;
    lives = 3;
    fallY = -6;
    motion = 250;
    // Use an if statement to create Bricks instead of calling on createBricks here at the end.
    Controls.elements.createBricks();
  }
}

function keyReleased(value) {
  let aKey = Controls.elements.aKey;
  let dKey = Controls.elements.dKey;

  if (value.keyCode === 68) {
    dKey = false;
  }

  if (value.keyCode === 65) {
    aKey = false;
  }
}

// Called right after the setup function in p5.js
function draw() {
  let elements = Controls.elements;
  let settings = Controls.settings;
  let game = settings.game;
  let lifeCount = settings.lifeCount;
  let score = settings.score;

  if (game && !lifeCount) {
    elements.ball(score);
  }

  if (lifeCount && game) {
    settings.lostLifeAlert();
  }

  if (!game && lifeCount) {
    settings.restartGame();
  }

  if (game) {
    settings.displayScore();
    settings.displayLives();
    elements.drawBricks();
    elements.paddle();
  }
}
