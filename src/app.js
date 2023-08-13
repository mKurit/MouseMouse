//Class
class Button {
  constructor(textv, x, y, func) {
    this.text = textv;
    this.x = x;
    this.y = y;
    this.textsize = 60;
    this.func = func;
  }

  renderer() {
    textSize(this.textsize);
    if (
      mouseX >= this.x - textWidth(this.text) / 2 - 10 &&
      mouseX <= this.x + textWidth(this.text) / 2 + 10 &&
      mouseY >= this.y - this.textsize / 2 - 5 &&
      mouseY <= this.y + this.textsize / 2 + 5
    ) {
      if (mouseIsPressed) {
        Audios.ClickSound.play();
        this.func.call();
      }
      this.textsize = 70;
    } else {
      this.textsize = 60;
    }
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
    /*
    stroke("purple");
    strokeWeight(10);
    point(this.x, this.y);
    stroke("black");
    strokeWeight(1);
    */
  }
}

class Chara {
  constructor(x, y, size, direction) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.direction = direction;
  }

  renderer() {
    fill("#999999");
    circle(this.x, this.y, this.size);
    fill("#000000");
    circle(
      this.x - ((this.size * 2) / 5) * Math.cos(this.direction + Math.PI / 6),
      this.y - ((this.size * 2) / 5) * Math.sin(this.direction + Math.PI / 6),
      this.size / 8
    );

    circle(
      this.x - ((this.size * 2) / 5) * Math.cos(this.direction - Math.PI / 6),
      this.y - ((this.size * 2) / 5) * Math.sin(this.direction - Math.PI / 6),
      this.size / 8
    );

    circle(
      this.x - (this.size / 2) * Math.cos(this.direction),
      this.y - (this.size / 2) * Math.sin(this.direction),
      this.size / 16
    );
    fill("#ffffff");
    circle(
      this.x - ((this.size * 2) / 5) * Math.cos(this.direction + Math.PI / 6) + (this.size / 24) * Math.cos(this.direction + Math.PI / 6),
      this.y - ((this.size * 2) / 5) * Math.sin(this.direction + Math.PI / 6) + (this.size / 24) * Math.sin(this.direction + Math.PI / 6),
      this.size / 16
    );

    circle(
      this.x - ((this.size * 2) / 5) * Math.cos(this.direction - Math.PI / 6) + (this.size / 24) * Math.cos(this.direction + Math.PI / 6),
      this.y - ((this.size * 2) / 5) * Math.sin(this.direction - Math.PI / 6) + (this.size / 24) * Math.sin(this.direction + Math.PI / 6),
      this.size / 16
    );
  }
}

class wall {
  constructor(x, y, x2, y2, width) {
    this.x = x;
    this.y = y;
    this.x2 = x2;
    this.y2 = y2;
    this.width = width;
  }

  renderer() {
    //console.log(windowWidth / 2 + this.x, windowHeight / 2 + this.y, windowWidth / 2 + this.x2, windowHeight / 2 + this.y2,this.width);
    fill("#000000");
    strokeWeight(this.width);
    line(windowWidth / 2 + this.x, windowHeight / 2 + this.y, windowWidth / 2 + this.x2, windowHeight / 2 + this.y2);
    strokeWeight(1);
  }
}

function devtool() {
  line(windowWidth / 2, 0, windowWidth / 2, windowHeight);
}

//Main

let FontsBlack, FontsMedium, FontsLight;
let mode = "";
let Buttons = {
  TopPageBtn: new Button("Start", window.innerWidth / 2, window.innerHeight / 2, function () {
    mode = "start";
    console.log("butn pressed!");
  }),
}
let Audios = {
  ClickSound: new Audio("./assets/click.mp3"),
};
let Player = new Chara(window.innerWidth / 2, window.innerHeight / 2, 80, 0);
let Speed = 0;
let Decelerationrate = 1.05;
let FieldObjects = [
  { type: "wall", x: -200, y: 200, x2: -200, y2: -200, width: 5 },
  { type: "wall", x: -200, y: 200, x2: 200, y2: 200, width: 5 },
  { type: "wall", x: -200, y: -200, x2: 200, y2: -200, width: 5 },
  { type: "wall", x: 200, y: 200, x2: 200, y2: 50, width: 5 },
  { type: "wall", x: 200, y: -200, x2: 200, y2: -50, width: 5 },
];

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
  switch (mode) {
    case "":
      const tempchara = new Chara(windowWidth / 2, windowHeight / 2, 600, Math.PI * 3 / 2);
      tempchara.renderer();
      textSize(80);
      textFont(FontsBlack);
      fill("#000000");
      text(
        "MouseMouse",
        windowWidth / 2 - textWidth("mousemouse") / 2,
        windowHeight / 3
      );
      Buttons.TopPageBtn.renderer();
      //devtool();
      break;

    case "start":
      console.log(Speed);
      if (mouseIsPressed) {
        Speed += .2;
      } else if (Speed > 0) {
        Speed /= Decelerationrate;
      } else {
        Speed = 0;
      }
      //$("body").css("cursor","none");
      if (mouseX >= windowWidth / 2) {
        Player.direction = Math.atan((mouseY - windowHeight / 2) / (mouseX - windowWidth / 2)) + Math.PI;
      } else {
        Player.direction = Math.atan((mouseY - windowHeight / 2) / (mouseX - windowWidth / 2));
      }
      Player.renderer();
      FieldObjects.map((e, index) => {
        switch (e.type) {
          case "wall":
            FieldObjects[index].x += Speed * cos(Player.direction);
            FieldObjects[index].y += Speed * sin(Player.direction);
            FieldObjects[index].x2 += Speed * cos(Player.direction);
            FieldObjects[index].y2 += Speed * sin(Player.direction);
            let newwall = new wall(e.x, e.y, e.x2, e.y2, e.width);
            newwall.renderer();
            break;
        }
      })
      break;
  }
}
