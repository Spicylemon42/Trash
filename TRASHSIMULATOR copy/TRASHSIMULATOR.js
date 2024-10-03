var blob;
var blobs = [];
var zoom = 1;
var lastBlobTime = 0; 

function setup() {
  createCanvas(windowWidth, windowHeight);
  blob = new Blob(0, 0, 64, color(100,0,0)); // Main blob

//change starting amount of trash
  for (var i = 0; i < 0; i++) {
    var x = random(-width, width);
    var y = random(-height, height);
    blobs[i] = new Blob(x, y, 16);
  }
  
  frameRate(60); 
}

function draw() {
  background(0);

  translate(width / 2, height / 2);
  var newzoom = 64 / blob.r;
  zoom = lerp(zoom, newzoom, 0.01);
  scale(zoom);
  translate(-blob.pos.x, -blob.pos.y);

  
  let currentTime = millis();
  if (currentTime - lastBlobTime >= .56) {
    addNewBlob(); 
    lastBlobTime = currentTime;
  }

  
  for (var i = blobs.length - 1; i >= 0; i--) {
    blobs[i].move(); // Update the blob's position (float around)
    blobs[i].show(); // Display the blob as an ellipse
    if (blob.eats(blobs[i])) {
      blobs.splice(i, 1); // Remove blob if eaten
    }
  }

  blob.show();
 
  blob.update();
}

function addNewBlob() {
  // Create a new blob at a random position and add to the blobs array
  var x = random(-blob.pos.x*20, blob.pos.x*20);
  var y = random(-blob.pos.y*20, blob.pos.y*20);
   var size = random(10, 30); // Random size between 10 and 30
  var c = color(random(255), random(255), random(255)); // Random color
  blobs.push(new Blob(x, y, size, c));
}
