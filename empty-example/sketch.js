// Learning Processing
// Daniel Shiffman
// http://www.learningprocessing.com

// Example 1-1: stroke and fill

var yoff = 0.0;        // 2nd dimension of perlin noise
var bugs = []; // array of Jitter objects
function setup() {
  createCanvas(710, 400);
    img = loadImage("palmtree.png"); 
    cloud = loadImage("cloud.png");
    bg = loadImage("sky.jpg");
    sand = loadImage("sand.png");
    santa = loadImage("santa.png");
 // Create objects
 for (var i=0; i<5; i++) {
   bugs.push(new Jitter());
 }
}
function drawWave(waveHeight) {
	  stroke(100,100,200,100);
  fill(100,100,200,100);
  // We are going to draw a polygon out of the wave points
  beginShape(); 
  
  var xoff = 0;       // Option #1: 2D Noise
  // float xoff = yoff; // Option #2: 1D Noise
  
  // Iterate over horizontal pixels
  for (var x = 0; x <= width; x += 10) {
    // Calculate a y value according to noise, map to 
    
    // Option #1: 2D Noise
    var y = map(noise(xoff, yoff), 0, 1, 200,300);

    // Option #2: 1D Noise
    // float y = map(noise(xoff), 0, 1, 200,300);
    
    // Set the vertex
    vertex(x, y+waveHeight); 
    // Increment x dimension for noise
    xoff += 0.05;
  }
  // increment y dimension for noise
  yoff += 0.01;
  vertex(width, height+waveHeight);
  vertex(0, height+waveHeight);
  endShape(CLOSE);
}


function draw() {

  background(bg);
  drawWave(0);
  
  image(sand,200,250,sand.width*1.5, sand.height*1.5);
 for (var i=0; i<bugs.length; i++) {
   bugs[i].move();
   bugs[i].display();
 }
  image(img, 300, -30, img.width/4, img.height/4);
  drawWave(80);
  image(santa, 300, 150, santa.width/2, santa.height/2);
  stroke(0);
  strokeWeight(2);
  fill(255);
  textSize(30);
  text("Santa on Vacation",450,380);
  stroke(0);
  strokeWeight(2);
  fill(255);
  textSize(10);
  text("Tracey Treat p.1",550,395);

}
// Jitter class
function Jitter() {
 this.x = random(width);
 this.y = random(height)/3.3;
 this.diameter = random(10, 30);
 this.speed = 0.1;
 this.cloudrandom = random(0.5,1);
 this.cloudwidth = 200*this.cloudrandom;
 this.cloudheight = 130*this.cloudrandom;
 this.cloudx = 0;
 this.move = function() {
   this.x += random(-this.speed, this.speed);
   this.y += random(-this.speed, this.speed);
 }

 this.display = function() {
 	this.cloudx++;
 	this.x = this.x-(this.cloudx%7==0);
   image(cloud, this.x, this.y, this.cloudwidth, this.cloudheight);
   if ( this.x < -170 ) {
     this.x = 600+random(width);
   }
   if (this.cloudx == 7){
   	this.cloudx = 0;
   }
  }
};