// Add to this list as you consult the p5.js documentation for other functions.
/* global createCanvas, colorMode, HSB, width, height, random, background, fill, 
          color, random, rect, ellipse, stroke, image, loadImage, keyCode,
          collideCircleCircle, text, textSize, mouseX, mouseY, strokeWeight, line, 
          mouseIsPressed, windowWidth, windowHeight, noStroke, UP_ARROW, triangle 
          frameRate frameCount round startPlants startHerbivores startCarnivores
          createGui abs, imageMode, CENTER*/
let v1, virus;


function preload(){
  v1 = loadImage('https://cdn.glitch.com/6bb45751-0572-4522-8e4d-c9c572b8fe52%2Fsmilie-4901128_960_720.png?v=1596753249162');
}

function setup() {
   colorMode(HSB, 360, 100, 100);
   createCanvas(400,400);
   background(10);
  
  virus = new Virus(v1);
   
  }

function draw() {
   //rect(40,40,40,40)
   background(10);
   virus.draw();
   virus.move();
  }


class Virus{
  constructor(img){
    this.size = random(5, 30);
    this.x = random(width - this.size);
    this.y = random(height - this.size);
    this.image = img;
    this.maxSize = 100;
    
  }
  
  strength(){
    
  }
  
  move(){
    imageMode(CENTER);

    if(this.size >= this.maxSize){
      fill('white');
      text('You Lost', 10, 20);
    }else if (this.size < this.maxSize){
      this.size++
    }
  }
  
  draw(){
    image(this.image, this.x, this.y, this.size, this.size);
  }
  
}
