// Add to this list as you consult the p5.js documentation for other functions.
/* global createCanvas, colorMode, HSB, width, height, random, background, fill, 
          color, random, rect, ellipse, stroke, image, loadImage, keyCode,
          collideCircleCircle, text, textSize, mouseX, mouseY, strokeWeight, line, 
          mouseIsPressed, windowWidth, windowHeight, noStroke, UP_ARROW, triangle 
          frameRate frameCount round startPlants startHerbivores startCarnivores
          createGui abs, imageMode, CENTER noLoop collideRectCircle*/


let v1, viruses, userHasLost;
let v2, vaccines;
let v3, medicine;
let lives = 3;

function preload() {
  v1 = loadImage(
    "https://cdn.glitch.com/6bb45751-0572-4522-8e4d-c9c572b8fe52%2Fsmilie-4901128_960_720.png?v=1596753249162"
  );
  v2 = loadImage(
    "https://cdn.glitch.com/6bb45751-0572-4522-8e4d-c9c572b8fe52%2FPicture1.png?v=1596757444345"
  );
  v3 = loadImage(
    "https://cdn.glitch.com/6bb45751-0572-4522-8e4d-c9c572b8fe52%2FPill-256.png?v=1596757997549"
  );
}

function setup() {
  colorMode(HSB, 360, 100, 100);
  createCanvas(400, 400);
  background(10);
  fill("white");
  userHasLost = false;

  viruses = new Array(5);
  for (let i = 0; i < viruses.length; i++) {
    viruses[i] = new Virus(v1);
  }

  vaccines = new Array(2);
  for (let i = 0; i < vaccines.length; i++) {
   
      vaccines[i] = new PowerUp(v2);
    
    
  }

  medicine = new Array(2);
  for (let i = 0; i < medicine.length; i++) {
    medicine[i] = new PowerUp(v3);
  }
}

function draw() {
  //rect(40,40,40,40)
  background(10);

  for (let i = viruses.length - 1; i >= 0; i--) {
    viruses[i].draw();
    viruses[i].move();
    if (viruses[i].size >= viruses[i].maxSize) {
      viruses[i].checkStrength();
      viruses.splice(i, 1, new Virus(v1));
    } else if (lives == 0) {
      userHasLost = true;
      viruses[i].size += 0;
      noLoop();
    }
  }

//   for (let i = 0; i < vaccines.length; i++) {
//     vaccines[i].draw();
//     vaccines[i].move();
//   }

  for (let i = 0; i < medicine.length; i++) {
    medicine[i].draw();
    medicine[i].move();
    medicine[i].recover();
  }

  if (userHasLost) {
    text("You Lost", 10, 20);
  }

  text(`Health: ${lives}`, 330, 20);
}


//define Viruses and functions
class Virus {
  constructor(img) {
    this.size = random(5, 50);
    this.x = random(width - this.size);
    this.y = random(height - this.size);
    this.image = img;
    this.maxSize = 100;
    this.strength = round(random(1, 6));
  }

  checkStrength() {
    if (this.strength == 5) {
      lives--;
    }
  }

  move() {
    imageMode(CENTER);
    if (this.size >= this.maxSize) {
      fill("white");
    } else if (this.size < this.maxSize) {
      this.size += 0.1;
    }
  }

  draw() {
    image(this.image, this.x, this.y, this.size, this.size);
  }
}


//define powerups and functions
class PowerUp {
  constructor(img) {
    this.size = random(5, 30);
    this.x = random(width - this.size);
    this.y = random(height - this.size);
    this.image = img;
    this.maxSize = 100;
    this.fallSpeed = random(1, 2);
    this.reset = random(-400, 100);
    //this.strength = round(random(1, 6));
  }

  draw() {
    image(this.image, this.x, this.y, this.size, this.size);
  }

  move() {
    this.y += this.fallSpeed;
    // If it goes off the screen...
    if(frameCount % 200 == 0){
    if (this.y > height) {
      // ...reset it...
      this.y = this.reset;
      // ...and move it somewhere random.
      this.x = random(width - this.size);
    }
    }
  }

  heal() {}

  recover() {
    if (collideRectCircle(this.x, this.y, this.size, this.size, mouseX, mouseY, 20)) {
      lives ++;
      this.y = this.reset;
    }
  }
}
