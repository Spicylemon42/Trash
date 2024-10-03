function Blob(x, y, r) {
  this.pos = createVector(x, y);
  this.r = r;
  this.vel = createVector(random(-2, 2), random(-2, 2)); // Random velocity for floating

  this.update = function() {
    var newVel = createVector(mouseX - width / 2, mouseY - height / 2);
    newVel.setMag(3);
    this.pos.add(newVel);
  };

  this.move = function() {
    this.pos.add(this.vel); // Update the blob's position based on its velocity

    // Ensure blobs bounce off the edges of the screen
    if (this.pos.x > width || this.pos.x < -width) {
      this.vel.x *= -1; // Reverse direction when hitting horizontal edges
    }
    if (this.pos.y > height || this.pos.y < -height) {
      this.vel.y *= -1; // Reverse direction when hitting vertical edges
    }
  };

  this.show = function() {
    fill(255);
    stroke(255);
    strokeWeight(2);
    push();
    translate(this.pos.x, this.pos.y);
    ellipse(0, 0, this.r * 2, this.r * 2);

    pop();
  };

  this.eats = function(other) {
    var d = dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y);
    if (d < this.r + other.r) {
      var sum = PI * this.r * this.r + PI * other.r * other.r;
      this.r = sqrt(sum / PI); // Blob grows when it eats
      return true;
    } else {
      return false;
    }
  };
}
