let FontsBlack, FontsMedium, FontsLight;

function preload() {
  FontsBlack = loadFont("./assets/MPLUSRounded1c-Black.ttf");
  FontsMedium = loadFont("./assets/MPLUSRounded1c-Medium.ttf");
  FontsLight = loadFont("./assets/MPLUSRounded1c-Light.ttf");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  new Chara(windowWidth / 2, windowHeight / 2, 600, 0);
  textSize(80);
  textFont(FontsBlack);
  fill("#000000");
  text(
    "MouseMouse",
    windowWidth / 2 - textWidth("mousemouse") / 2,
    windowHeight / 3
  );
  new Button("Select Stage", windowWidth / 2, windowHeight / 2);
  line(windowWidth / 2, 0, windowWidth / 2, windowHeight);
}

class Button {
  constructor(textv, x, y, func) {
    this.text = textv;
    this.x = x;
    this.y = y;

    textSize((this.textsize = 60));
    textFont(FontsMedium);
    fill("#ffffff");
    rect(
      this.x - textWidth(this.text) / 2 - 10,
      this.y - this.textsize / 2 - 5,
      textWidth(this.text) + 20,
      this.textsize + 10,
      5
    );
    fill("#000000");
    text(
      this.text,
      this.x - textWidth(this.text) / 2,
      this.y + this.textsize / 4
    );

    stroke("purple");
    strokeWeight(10);
    point(this.x, this.y);
    stroke("black");
    strokeWeight(1);
  }
}

class Chara {
  constructor(x, y, size, direction) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.direction = direction + Math.PI / 2;

    fill("#999999");
    circle(this.x, this.y, this.size);
    fill("#000000");
    circle(
      this.x + ((this.size * 2) / 5) * Math.cos(this.direction + Math.PI / 6),
      this.y + ((this.size * 2) / 5) * Math.sin(this.direction + Math.PI / 6),
      this.size / 8
    );

    circle(
      this.x + ((this.size * 2) / 5) * Math.cos(this.direction - Math.PI / 6),
      this.y + ((this.size * 2) / 5) * Math.sin(this.direction - Math.PI / 6),
      this.size / 8
    );
    circle(
      this.x + (this.size / 2) * Math.cos(this.direction),
      this.y + (this.size / 2) * Math.sin(this.direction),
      this.size / 16
    );
    fill("#ffffff");
    circle(
      this.x + ((this.size * 2) / 5) * Math.cos(this.direction + Math.PI / 6),
      this.y + ((this.size * 2) / 5) * Math.sin(this.direction + Math.PI / 6),
      this.size / 32
    );

    circle(
      this.x + ((this.size * 2) / 5) * Math.cos(this.direction - Math.PI / 6),
      this.y + ((this.size * 2) / 5) * Math.sin(this.direction - Math.PI / 6),
      this.size / 32
    );
  }
}
