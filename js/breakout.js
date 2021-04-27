// N220 Section 28238
// Dillon Polley
// Final Project
// Breakout
// 11/29/2020

// Disables undeclared variables and sets JS into strict mode
'use strict';
// An object to set all the beginning settings of the game
const Controls = {
  // Sets the variable for motion as 280
  motion : 280,
  // Sets the D Key to be read as not being pressed
  dKey : false,
  // Sets the A Key to be read as not being pressed
  aKey : false,
  // Sets the game starting to true when the program starts
  game : true,
  // Fall speed along the x axis initialized as 5
  fallX : 5,
  // Fall speed along the y axis initialized as 5
  fallY : 5,
  // Score starts at 0
  score : 0,
  // Lives start at 5
  lives : 5,
  // Setup life count as false
  lifeCount : false,
  // Set blocks as an empty array to insert all the blocks into later
  blocks : [],
  // Each color represents another row of blocks
  blockColor : ["#3C096C", "#370617", "#5A189A", "#6A040F", "#7B2CBF", "#9D0208",],

}
// Sets up a constant object for the ball
  const circle = {
  // This makes the ball start at the x position of 330
  x: Controls.motion + 50,
  // The ball starts at the y position of 380
  y: 380,
  // Radius of the ball is 20
  radius: 20
}

function setup() {
  // Creates a canvas that is 600 pixels wide and 400 tall
  createCanvas(600, 400);
  // Calls on the bricks to be created when the program loads up
  createBricks()
}
// Function to display a user alert when the game is either won or lost
function restartGame() {
  // The texts fill is white
  fill('#FFFFFF')
  // Text aligns in the center
  textAlign(CENTER);
  // Text doesn't have a stroke
  noStroke()
  // Font size of 18
  textSize(18)
  // Tell the player how extremely dissapointed you are in them, regardless of their performance
  text('My disappointment is immeasurable, and my day is ruined.', 300, 170)
  // Tell the user how to restart the game
  text('Press "R" to try again', 300, 225);
}
// Displays an alert when the user loses a life
function lostLifeAlert() {
  // The texts fill is white
  fill('#FFFFFF')
  // Text aligns in the center
  textAlign(CENTER);
  // Removes stroke from the text
  noStroke()
  // Sets the font size to 18
  textSize(18)
  // Passive Aggresively pokes fun at the player
  text('Nice going slick', 300, 170)
  // Tell the user how to move onto the next life / round
  text('Press "R" for another pathetic attempt', 300, 225);
}
// Displays the current players score on the screen 
function currentScore() {
  // Text color sets to white
  fill('#FFFFFF')
  // Centers the text on the screen
  textAlign(CENTER);
  // Removes stroke from the text
  noStroke()
  // Sets the font size to 18
  textSize(18)
  // Displays this message on the actual screen
  text('score: ' + Controls.score, 555, 20);
}
// Displays text to tell the user how many lives they have
function currentLives() {
  // Aligns the text in the center
  textAlign(CENTER);
  // Removes the stroke from the text
  noStroke()
  // Font size sets to 18
  textSize(18)
  // Displays the lives on the actual screen
  text('lives: ' + Controls.lives, 40, 20);
}
// Function for the paddle that the user controls
function paddle() {
  // Set the stroke to none for the paddle
  noStroke()
  // Sets the fill color to purple as well
  fill('#240046')
  // Draws a rectangle for the paddle
  rect(Controls.motion, 385, 100, 15, 20)
  // If the d key is pressed, move the paddle to the right
  if (Controls.dKey && Controls.motion < 500) {
    Controls.motion += 10
  }
  // If the a key is pressed, move the paddle to the left
  if (Controls.aKey && Controls.motion > 0) {
    Controls.motion += -10
  }
}
// Function that sets up the settings for the in game ball
function ball() {
  // Removes the stroke from the ball
  noStroke()
  // Sets the ball color to a lighter purple
  fill('#9D4EDD')
  // Creates an ellipse or circle with the pre settings of the constant circle object
  ellipse(circle.x, circle.y, circle.radius, circle.radius)
  // If the circle is less than 0 on the y axis then add one to the score, and reverse the fall direction
  if (circle.y <= 0) {
    Controls.fallY = -Controls.fallY
    Controls.score++
  }
  
  if (circle.y >= height - 15 && circle.x > Controls.motion && circle.x <= Controls.motion + 50) {
    Controls.fallY = -Controls.fallY
    if (Controls.fallX > 0) Controls.fallX = -Controls.fallX
    if (Controls.fallX < 0) Controls.fallX = Controls.fallX
  }

  if (circle.y >= height - 15 && circle.x > Controls.motion + 50 && circle.x <= Controls.motion + 100) {
    Controls.fallY = -Controls.fallY
    if (Controls.fallX > 0) Controls.fallX = Controls.fallX
    if (Controls.fallX < 0) Controls.fallX = -Controls.fallX
  }

  if (circle.x >= width - 10 || circle.x <= 0) Controls.fallX = -Controls.fallX

  Controls.blocks.forEach((item, index) => {

  	if(checkBottomScreen(circle, item)){
      Controls.fallY = -Controls.fallY
    	Controls.score++
      Controls.blocks.splice(index, 1)
    }
  })
  
  if (circle.y > height) {

    Controls.lives--
    Controls.lifeCount = true
    if (Controls.lives === 0) Controls.game = false
  }

  circle.x += Controls.fallX

  circle.y += Controls.fallY
}

function checkBottomScreen(ball, brick) {

	if (ball.y - 20 < brick.y && ball.x > brick.x && ball.x <= brick.x + 58) {
  	return true
  }
}

function createBricks() {

  const rows = 6

  const cols = 10

  const brickWidth = width / cols

  for (let i = 0; i < cols; i++) {

    for (let j = 0; j < rows; j++) {

      let brick = {
        x: i * 58 + 10,
        y: j * 12 + 30,
        w: 57,
        h: 10,
        color: Controls.blockColor[j]
      }

      Controls.blocks.push(brick)
    }
  }
}

function drawBricks() {

  Controls.blocks.forEach(brick => {

    fill(brick.color)

    rect(brick.x, brick.y, brick.w, brick.h)
  })
}

function keyPressed(value) {

  if (value.keyCode === 68) {
    Controls.dKey = true
  }

  if (value.keyCode === 65) {
    Controls.aKey = true
  }

  if (value.keyCode === 82 && Controls.lifeCount) {
    Controls.lifeCount = false
    circle.x = Controls.motion + 50
    circle.y = 380
  }

  if (value.keyCode === 82 && !Controls.game) {
    Controls.game = true
    circle.x = Controls.motion + 50
    circle.y = 380
    Controls.score = 0
    Controls.lives = 3
    Controls.fallY = -6
    Controls.motion = 250
    createBricks()
  }
}

function keyReleased(value) {

  if (value.keyCode === 68) {
    Controls.dKey = false
  }

  if (value.keyCode === 65) {
    Controls.aKey = false
  }
}

function draw() {

  background('#FF9E00');

  if (Controls.game && !Controls.lifeCount) ball()

  if (Controls.lifeCount && Controls.game) lostLifeAlert()

  if (!Controls.game && Controls.lifeCount) restartGame()

  if (Controls.game) {
    currentScore()
    currentLives()
    drawBricks()
    paddle()
  }
}