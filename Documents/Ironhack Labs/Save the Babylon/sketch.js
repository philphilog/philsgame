let backgroundImage;
let snoop;
let snoopX = 0;
let snoopY = 0;
let enemies = [];
let enemyX = [];
let enemyY = [];
let weeds = [];
let startTime;


function preload() {
  backgroundImage = loadImage('images/background.jpeg');
  snoop = loadImage('images/snoop.jpeg');
  enemy = loadImage('images/policeman.png');
  weed = loadImage('images/weed.png');
}

function setup() {
  let canvas = createCanvas(1000, 750);
  canvas.style('position', 'absolute');
  canvas.style('left', '50%');
  canvas.style('top', '50%');
  canvas.style('transform', 'translate(-50%, -50%)');
  enemyX = [];
  enemyY = [];
  startTime = millis();
}

function draw() {
  background(backgroundImage);
  image(snoop, snoopX, snoopY, snoop.width/6, snoop.height/6);
  for (let i = 0; i < enemies.length; i++) {
    enemyX[i] = random(width, width + 500);
    enemyY[i] = random(height);
    image(enemy, enemies[i].x, enemies[i].y, enemy.width/7.5, enemy.height/7.5);
    enemies[i].x -= enemies[i].velocity;
    if (enemies[i].x < -enemy.width/15) {
      enemies.splice(i,1);
      i--;
    }
  }
  for (let i = 0; i < weeds.length; i++){
    let weedX = weeds[i].x;
    let weedY = weeds[i].y;
    image (weed, weedX, weedY, weed.width / 100, weed.height / 100);
    weeds[i].x += 10;
    if (weeds[i].x > width) {
      weeds.splice(i,1);
      i--;
    }
  }
  if (frameCount % 60 === 0) {
    let randomY = random(height);
    let randomVelocity = random(1, 3);
    enemies.push({
      x: width + enemy.width/7.5,
      y: randomY,
      velocity: randomVelocity
    });
  }
  keyPressed();
}

function keyPressed() {
  if (keyIsDown(LEFT_ARROW)) {
    if (snoopX > 0) {
      snoopX -= 5;
    }
  } else if (keyIsDown(RIGHT_ARROW)) {
    if (snoopX < width - snoop.width/4) {
      snoopX += 5;
    }
  } else if (keyIsDown(UP_ARROW)){
    if (snoopY > 0) {
      snoopY -= 5;
    }
  } else if (keyIsDown(DOWN_ARROW)) {
    if (snoopY < height - snoop.height/4) {
      snoopY += 5;
    }
  } else if (keyIsDown(32)){
    weeds.push({
      x: snoopX + snoop.width / 6,
      y: snoopY + snoop.height / 12,
      vx:10
    });
  }
}
