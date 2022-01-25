let point0 = {x: 200, y: 200};
let point1 = {x: 300, y: 150};
let point2 = {x: 500, y: 200};
let control0 = {x: 370, y: 100};
let control1 = {x: 400, y: 50};
let imageButton = {x: 50, y: 50, radius: 30};
let radius = 10
let numberOfPoints = 3;
let numberOfControls = 2;
let strokeColourWhenImage = 'white';
let strokeColourWhenNotImage = 'black';
let strokeColour = strokeColourWhenImage;
let locked = "nothing";
let showImage = true;
let ang = 0.0;

function preload(){
  img = loadImage("images/Wigmore-Hall-logo.jpg");
}

function setup() {
  createCanvas(800, 800);
}

function draw() {
  background(220);
  imageCheck();
  makeShape(strokeColour);
  makeImageButton(strokeColour);
  drawControlCircles(strokeColour);
  coordinatesText();
}

function makeShape(colour){
  stroke(colour);
  noFill();
  beginShape();
  vertex(394,164);
  bezierVertex(441, 206, 374, 224, 401, 251);
  bezierVertex(328, 238, 400, 191, 394, 164);
  endShape(CLOSE);

  beginShape();
  vertex(401, 251);
  bezierVertex(372, 217, 453, 215, 443, 254);
  endShape();

  beginShape();
  vertex(401, 251);
  bezierVertex(396, 218, 476, 283, 380, 275);
  endShape();

  beginShape();
  vertex(401, 251);
  bezierVertex(440, 269, 351, 288, 368, 232);
  endShape();

  beginShape();
  vertex(443, 254);
  bezierVertex(450, 238, 438, 204, 411, 200);
  endShape();

  arc(399, 242, 100, 100, 4.97, ang);
  if(ang < 4.37-0.1){
    ang = ang + 0.1;
  }else{
    ang = 4.37;
  }
}

function coordinatesText(){
  textAlign(LEFT, CENTER);
  noStroke();
  let textX = 20;
  let textY = 600;
  let lineSpacing = 10;
  let words = ['beginShape();', `vertex(${point0.x}, ${point0.y});`,
  `vertex(${point1.x}, ${point1.y});`,
  `bezierVertex(${control0.x}, ${control0.y}, ${control1.x}, ${control1.y}, ${point2.x}, ${point2.y})`,
  'endShape(CLOSE);']
  fill(strokeColour);
  for(let i = 0; i < text.length; i++){
    text(words[i], textX, textY+(lineSpacing*i));
  };
}

function imageCheck(){
  if(showImage){
    image(img, 0, 0, 800, 800);
    strokeColour = strokeColourWhenImage;
  }else{
    strokeColour = strokeColourWhenNotImage;
  }
}

function drawControlCircles(colour){
  textAlign(CENTER, CENTER);
  stroke(colour);
  for(let i = 0; i<numberOfPoints; i++){
    let p = eval(`point${i}`);
    noFill();
    circle(p.x, p.y, radius*2);
    noStroke();
    fill(colour);
    text(`p${i}`, p.x, p.y);
    stroke(colour);
  }
  for(let i = 0; i<numberOfControls; i++){
    let c = eval(`control${i}`);
    noFill();
    circle(c.x, c.y, radius*2);
    stroke("red");
    line(c.x, c.y, point2.x, point2.y);
    noStroke();
    fill(colour);
    text(`c${i}`, c.x, c.y);
    stroke(colour);
  }
}

function makeImageButton(colour){
  textAlign(CENTER, CENTER);
  stroke(colour);
  noFill();
  circle(imageButton.x, imageButton.y, imageButton.radius*2);
  noStroke();
  fill(strokeColour);
  text("image", imageButton.x, imageButton.y);
}

function mouseDragged() {
  locked.x = mouseX;
  locked.y = mouseY;
}

function mousePressed() {
  for(let i = 0; i<(numberOfPoints); i++){
    let p = eval(`point${i}`);
    let d = dist(mouseX, mouseY, p.x, p.y);
    if (d < radius) {
      locked = p;
    };
  }
  for(let i = 0; i<numberOfControls; i++){
    let c = eval(`control${i}`);
    let d = dist(mouseX, mouseY, c.x, c.y);
    if (d < radius) {
      locked = c;
    };
  }
  let d = dist(mouseX, mouseY, imageButton.x, imageButton.y);
    if (d < imageButton.radius) {
      showImage = !showImage;
    };
}

function mouseReleased() {
  locked = "nothing";
}

function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}
