// Add to this list as you consult the p5.js documentation for other functions.
/* global createCanvas, colorMode, HSB, width, height, random, background, fill, 
          color, random, rect, ellipse, stroke, image, loadImage, keyCode,
          collideCircleCircle, text, textSize, mouseX, mouseY, strokeWeight, line, 
          mouseIsPressed, windowWidth, windowHeight, noStroke, UP_ARROW, triangle 
          frameRate frameCount round startPlants startHerbivores startCarnivores
          createGui abs, imageMode, CENTER*/
let v1, viruses, userHasLost;
let lives = 3;

function preload(){
  v1 = loadImage('https://cdn.glitch.com/6bb45751-0572-4522-8e4d-c9c572b8fe52%2Fsmilie-4901128_960_720.png?v=1596753249162');
}

function setup() {
  colorMode(HSB, 360, 100, 100);
  createCanvas(400,400);
  background(10);
  fill('white');
  userHasLost = false;
  viruses = new Array(5)
  for(let i = 0; i < viruses.length; i++){
    viruses[i] = new Virus(v1);
  }
   
  }

function draw() {
   //rect(40,40,40,40)
   background(10);
  
  for(let i = viruses.length - 1; i >= 0; i--){
    viruses[i].draw();
    viruses[i].move();
    if(viruses[i].size >= viruses[i].maxSize){
      viruses[i].checkStrength();
      viruses.splice(i, 1, new Virus(v1));
    } else if (lives == 0){
      userHasLost = true;
      viruses[i].size += 0;
    }
  }
  
  if(userHasLost){
    text('You Lost', 10, 20);
  }
  
  text(`Health: ${lives}`, 330, 20)
  }


class Virus{
  constructor(img){
    this.size = random(5, 50);
    this.x = random(width - this.size);
    this.y = random(height - this.size);
    this.image = img;
    this.maxSize = 100;
    this.strength = round(random(1, 6));
    
  }
  
  checkStrength(){
    if(this.strength == 5){
      lives--;
    }   
  }
  
  move(){
    imageMode(CENTER);
    if(this.size >= this.maxSize){
      fill('white');
    }else if (this.size < this.maxSize){
      this.size += 0.1
    }
  }
  
  draw(){
    image(this.image, this.x, this.y, this.size, this.size);
  }
  
}


class PowerUps{
  constructor(){
    
  }
  
  draw(){
    
  }
  
  move(){
    
  }
  
}
