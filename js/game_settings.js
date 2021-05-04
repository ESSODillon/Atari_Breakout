// N220 Section 28238
// Dillon Polley
// Final Project
// Breakout
// 5/3/2021

class Game {
  constructor(lives, score, game, lifeCount) {
    this.lives = lives;
    this.score = score;
    this.game = game;
    this.lifeCount = lifeCount;
  }

  // Displays the current players score on the screen
  displayScore() {
    // Text color sets to white
    fill("#FFFFFF");
    // Centers the text on the screen
    textAlign(CENTER);
    // Removes stroke from the text
    noStroke();
    // Sets the font size to 18
    textSize(18);
    // Displays this message on the actual screen
    text("score: " + this.score, 555, 20);
  }
  // Displays text to tell the user how many lives they have
  displayLives() {
    // Aligns the text in the center
    textAlign(CENTER);
    // Removes the stroke from the text
    noStroke();
    // Font size sets to 18
    textSize(18);
    // Displays the lives on the actual screen
    text("lives: " + this.lives, 40, 20);
  }

  // Function to display a user alert when the game is either won or lost
  restartGame() {
    // The texts fill is white
    fill("#FFFFFF");
    // Text aligns in the center
    textAlign(CENTER);
    // Text doesn't have a stroke
    noStroke();
    // Font size of 18
    textSize(18);
    // Tell the player how extremely dissapointed you are in them, regardless of their performance
    text("My disappointment is immeasurable, and my day is ruined.", 300, 170);
    // Tell the user how to restart the game
    text('Press "R" to try again', 300, 225);
  }

  // Displays an alert when the user loses a life
  lostLifeAlert() {
    // The texts fill is white
    fill("#FFFFFF");
    // Text aligns in the center
    textAlign(CENTER);
    // Removes stroke from the text
    noStroke();
    // Sets the font size to 18
    textSize(18);
    // Passive Aggresively pokes fun at the player
    text("Nice going slick", 300, 170);
    // Tell the user how to move onto the next life / round
    text('Press "R" for another pathetic attempt', 300, 225);
  }
}
