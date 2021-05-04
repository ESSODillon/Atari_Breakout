// N220 Section 28238
// Dillon Polley
// Final Project
// Breakout
// 5/3/2021

class GameElements {
  constructor(
    motion,
    fallX,
    fallY,
    blocks,
    blockColor,
    circleX,
    circleY,
    circleRadius,
    aKey,
    dKey
  ) {
    this.motion = motion;
    this.fallX = fallX;
    this.fallY = fallY;
    this.blocks = blocks;
    this.blockColor = blockColor;
    this.circleX = motion + circleX;
    this.circleY = circleY;
    this.circleRadius = circleRadius;
    this.aKey = aKey;
    this.dKey = dKey;
  }

  paddle() {
    // Set the stroke to none for the paddle
    noStroke();
    // Sets the fill color to purple as well
    fill("#240046");
    // Draws a rectangle for the paddle
    rect(this.motion, 385, 100, 15, 20);
    // If the d key is pressed, move the paddle to the right
    if (this.dKey && this.motion < 500) {
      this.motion += 10;
    }
    // If the a key is pressed, move the paddle to the left
    if (this.aKey && this.motion > 0) {
      this.motion += -10;
    }
  }
  // Function that sets up the settings for the in game ball
  ball(score) {
    // Removes the stroke from the ball
    noStroke();
    // Sets the ball color to a lighter purple
    fill("#9D4EDD");
    // Creates an ellipse or circle with the pre settings of the constant circle object
    ellipse(this.circleX, this.circleY, this.circleRadius, this.circleRadius);
    // If the circle is less than 0 on the y axis then add one to the score, and reverse the fall direction
    if (this.circleY <= 0) {
      this.fallY = -this.fallY;
      score++;
    }

    if (
      this.circleY >= height - 15 &&
      this.circleX > this.motion &&
      this.circleX <= this.motion + 50
    ) {
      this.fallY = -this.fallY;
      if (this.fallX > 0) this.fallX = -this.fallX;
      if (this.fallX < 0) this.fallX = this.fallX;
    }

    if (
      this.circleY >= height - 15 &&
      this.circleX > this.motion + 50 &&
      this.circleX <= this.motion + 100
    ) {
      this.fallY = -this.fallY;
      if (this.fallX > 0) this.fallX = this.fallX;
      if (this.fallX < 0) this.fallX = -this.fallX;
    }

    if (this.circleX >= width - 10 || this.circleX <= 0)
      this.fallX = -this.fallX;

    this.blocks.forEach((item, index) => {
      if (this.checkBottomScreen(item)) {
        this.fallY = -this.fallY;
        score++;
        this.blocks.splice(index, 1);
      }
    });

    if (this.circleY > height) {
      this.lives--;
      this.lifeCount = true;
      if (this.lives === 0) this.game = false;
    }

    this.circleX += this.fallX;

    this.circleY += this.fallY;
  }

  checkBottomScreen(brick) {
    if (
      this.circleY - 20 < brick.y &&
      this.circleX > brick.x &&
      this.circleX <= brick.x + 58
    ) {
      return true;
    }
  }

  createBricks() {
    const rows = 6;

    const cols = 10;

    const brickWidth = width / cols;

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        let brick = {
          x: i * 58 + 10,
          y: j * 12 + 30,
          w: 57,
          h: 10,
          color: this.blockColor[j],
        };

        this.blocks.push(brick);
      }
    }
  }

  drawBricks() {
    this.blocks.forEach((brick) => {
      fill(brick.color);

      rect(brick.x, brick.y, brick.w, brick.h);
    });
  }
}
