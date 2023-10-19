let particles = [];
let mainImg;
let firstRun = true

class Particle {
  constructor(fillColor, size) {
    this.pos = createVector(0,0,0);
    this.vel = p5.Vector.random3D().mult(random(1, 3));
    this.fillColor = fillColor;
    this.size = size;
  }

  update() {
    this.pos.add(this.vel);
  }

  show() {
    push();
    noStroke();
    fill(this.fillColor);
    translate(this.pos.x, this.pos.y, this.pos.z);
    sphere(2 * (this.size / 20));
    pop();
  }
}

function draw_one_frame(words, vocal, drum, bass, other, counter) {
  if (firstRun){
    rectMode(CENTER);
    mainImg = loadImage('img/logo_0.PNG');
    firstRun = false
  }

  background(0, 0, 30);

  directionalLight([255], createVector(0, 1, -1));

  let ParticleFill;

  if (other > 75) {
    for (var i = 0; i < 10; i++) {
      ParticleFill = color(random(50, 90), random(0, 20), random(110, 150));
      var p = new Particle(ParticleFill, vocal);
      particles.push(p);
    }
  }
  if (bass > 65) {
    ParticleFill = color(random(0, 20), random(120, 160), random(0, 40));
    for (var i = 0; i < 10; i++) {
      var p = new Particle(ParticleFill, vocal);
      particles.push(p);
    }
  }
  if (drum > 65) {
    ParticleFill = color(random(130, 170), random(0, 30), random(0, 20));
    for (var i = 0; i < 10; i++) {
      var p = new Particle(ParticleFill, vocal);
      particles.push(p);
    }
  }

  for (var i = particles.length - 1; i >= 0; i--) {
    if (dist(particles[i].pos.x, particles[i].pos.y, particles[i].pos.z, 0, 0, 0) < 500) {
      particles[i].update();
      particles[i].show();
    } else {
      particles.splice(i, 1);
    }
  }

  push();
  let zPosition = 550;
  let logoSize = map(vocal, 0, 100, 20, 70);
  translate(0, 0, zPosition);
  image(mainImg, -logoSize / 2, -logoSize / 2, logoSize, logoSize);
  pop();
}

