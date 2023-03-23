let showIntro = document.referrer.endsWith("startPage.html");
let backgroundImage;
let snoop;
let snoopX = 0;
let snoopY = 0;
let enemies = [];
let enemyX = [];
let enemyY = [];
let weeds = [];
let weedX = [];
let weedY = [];
let startTime;
let nextWeedTime = 0;
const weedInterval = 1000;
let enemy, weed;
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

function checkOverlap(img1, img2) {
  let xOverlap = false;
  let yOverlap = false;

  let img1Box = {
    x: img1.x,
    y: img1.y,
    width: img1.width,
    height: img1.height
  };
  let img2Box = {
    x: img2.x,
    y: img2.y,
    width: img2.width,
    height: img2.height
  };

  if (img1Box.x < img2Box.x + img2Box.width && img1Box.x + img1Box.width > img2Box.x) {
    xOverlap = true;
  }
  
  if (img1Box.y < img2Box.y + img2Box.height && img1Box.y + img1Box.height > img2Box.y) {
    yOverlap = true;
  }

  return xOverlap && yOverlap;
}

function preload() {
  backgroundImage = loadImage("images/background.jpeg");
  snoop = loadImage("images/snoop.png");
  enemy = loadImage("images/policeman.png");
  weed = loadImage("images/weed.png");
}

function setup() {
  if (showIntro) {
  } else {
    let canvas = createCanvas(1000, 750);
    canvas.style("position", "absolute");
    canvas.style("left", "50%");
    canvas.style("top", "50%");
    canvas.style("transform", "translate(-50%, -50%)");
    enemyX = [];
    enemyY = [];
    startTime = millis();
    enemies.push({
      x: width + enemy.width / 7.5,
      y: random(height),
      velocity: random(1, 3),
      hitByWeed: false,
    });
  }
}

function draw() {
  if (showIntro) {
  } else {
    background(backgroundImage);
    image(snoop, snoopX, snoopY, snoop.width / 6, snoop.height / 6);
    let elapsedSeconds = (millis() - startTime) / 1000;
    fill(255);
    textSize(20);

    let enemyFrequency = map(elapsedSeconds, 0, 500, 0, 0.001);
    if (millis() > startTime + 1000) {
      if (random(0, 100) < enemyFrequency) {
        let randomY = random(height);
        let randomVelocity = random(1, 3);
        enemies.push({
          x: width + enemy.width / 7.5,
          y: randomY,
          velocity: randomVelocity,
          hitByWeed: false,
        });
      }
      for (let i = 0; i < enemies.length; i++) {
        let elapsedTime = floor((millis() - startTime) / 1000);
        fill(255);
        textSize(20);
        text("Pionts: " + elapsedTime, 850, 30);
        image(
          enemy,
          enemies[i].x,
          enemies[i].y,
          enemy.width / 7.5,
          enemy.height / 7.5
        );
        enemies[i].x -= enemies[i].velocity;
        if (enemies[i].x < -enemy.width / 15) {
          enemies.splice(i, 1);
          i--;
        }
      }

      for (let i = 0; i < weeds.length; i++) {
        let weedX = weeds[i].x;
        let weedY = weeds[i].y;
        image(weed, weedX, weedY, weed.width / 10, weed.height / 10);
        weeds[i].x += 10;
        if (weeds[i].x > width) {
          weeds.splice(i, 1);
          i--;
          weedThrown = false;
        }
      }
    }
    if (frameCount % 60 === 0) {
      let randomY = random(height);
      let randomVelocity = random(1, 3);
      enemies.push({
        x: width + enemy.width / 7.5,
        y: randomY,
        velocity: randomVelocity,
      });
    }
    keyPressed();
  }
  for (let i = 0; i < enemies.length; i++) {
    if (checkOverlap({x: snoopX, y: snoopY, width: snoop.width / 6, height: snoop.height / 6}, {x: enemies[i].x, y: enemies[i].y, width: enemy.width / 7.5, height: enemy.height / 7.5})) {
      // Game over
      textSize(50);
      fill(255, 0, 0);
      textAlign(CENTER);
      text("Game Over", width/2, height/2);
      noLoop();
      break;
    }
  }
  
}

function keyPressed() {
  if (keyIsDown(LEFT_ARROW)) {
    if (snoopX > 0) {
      snoopX -= 5;
    }
  } else if (keyIsDown(RIGHT_ARROW)) {
    if (snoopX < width - snoop.width / 4) {
      snoopX += 5;
    }
  } else if (keyIsDown(UP_ARROW)) {
    if (snoopY > 0) {
      snoopY -= 5;
    }
  } else if (keyIsDown(DOWN_ARROW)) {
    if (snoopY < height - snoop.height / 4) {
      snoopY += 5;
    }
  } else if (keyIsDown(32)) {
    weeds.push({
      x: snoopX + snoop.width / 6,
      y: snoopY + snoop.height / 12,
      vx: 10,
    });
    nextWeedTime = millis();
  }
}
