// function
function circleLineCollision(
  circleX,
  circleY,
  radius,
  lineStartX,
  lineStartY,
  lineEndX,
  lineEndY
) {
  // 線分の始点から終点へのベクトルを求める
  var lineVector = { x: lineEndX - lineStartX, y: lineEndY - lineStartY };

  // 線分の始点から円の中心へのベクトルを求める
  var circleVector = { x: circleX - lineStartX, y: circleY - lineStartY };

  // 線分の長さの2乗を求める
  var lineLengthSquared =
    lineVector.x * lineVector.x + lineVector.y * lineVector.y;

  // 線分のベクトルを正規化する
  var normalizedLineVector = {
    x: lineVector.x / Math.sqrt(lineLengthSquared),
    y: lineVector.y / Math.sqrt(lineLengthSquared),
  };

  // 線分上での円の中心の投影点を求める
  var projection =
    normalizedLineVector.x * circleVector.x +
    normalizedLineVector.y * circleVector.y;

  // 投影点が線分の範囲内にあるかチェック

  if (projection >= 0 && projection <= Math.sqrt(lineLengthSquared) + radius) {
    // 円の中心と投影点の距離を求める
    var distanceToCircle = Math.sqrt(
      (circleVector.x - projection * normalizedLineVector.x) ** 2 +
        (circleVector.y - projection * normalizedLineVector.y) ** 2
    );

    //console.log(distanceToCircle,radius);

    // 距離が円の半径以下であれば当たりとみなす
    if (distanceToCircle <= radius) {
      return true;
    }
  }

  return false;
}

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
      this.y + this.textsize / 3
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
    this.death = false;
    this.deathAnimation = 0;
  }

  renderer() {
    fill("#999999");
    if (this.death && this.deathAnimation == 0) {
      this.deathAnimation = 1;
      new Audio("./assets/death.mp3").play();
    }
    if (this.death && this.deathAnimation != 0) {
      for (var i = 0; i < 12; i++) {
        fill("#999999");
        circle(
          this.x - this.deathAnimation * Math.cos(i * 30 * (Math.PI / 180)),
          this.y - this.deathAnimation * Math.sin(i * 30 * (Math.PI / 180)),
          10
        );
        this.deathAnimation++;
      }
    } else {
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
        this.x -
          ((this.size * 2) / 5) * Math.cos(this.direction + Math.PI / 6) +
          (this.size / 32) * Math.cos(this.direction + Math.PI / 6),
        this.y -
          ((this.size * 2) / 5) * Math.sin(this.direction + Math.PI / 6) +
          (this.size / 32) * Math.sin(this.direction + Math.PI / 6),
        this.size / 16
      );

      circle(
        this.x -
          ((this.size * 2) / 5) * Math.cos(this.direction - Math.PI / 6) +
          (this.size / 32) * Math.cos(this.direction + Math.PI / 6),
        this.y -
          ((this.size * 2) / 5) * Math.sin(this.direction - Math.PI / 6) +
          (this.size / 32) * Math.sin(this.direction + Math.PI / 6),
        this.size / 16
      );
    }
  }
}

class wall {
  constructor(x, y, x2, y2, width) {
    this.x = x;
    this.y = y;
    this.x2 = x2;
    this.y2 = y2;
    this.width = width;
    this.touchPlayer = false;
    this.chx = 0;
    this.chy = 0;
    this.chr = 0;
  }

  renderer() {
    //console.log(windowWidth / 2 + this.x, windowHeight / 2 + this.y, windowWidth / 2 + this.x2, windowHeight / 2 + this.y2,this.width);
    fill("#000000");
    strokeWeight(this.width);
    line(
      windowWidth / 2 + this.x,
      windowHeight / 2 + this.y,
      windowWidth / 2 + this.x2,
      windowHeight / 2 + this.y2
    );
    strokeWeight(1);
    if (
      circleLineCollision(
        this.chx,
        this.chy,
        this.chr,
        this.x,
        this.y,
        this.x2,
        this.y2
      )
    ) {
      this.touchPlayer = true;
    }
  }
}

function devtool() {
  line(windowWidth / 2, 0, windowWidth / 2, windowHeight);
}

//Main

let FontsBlack, FontsMedium, FontsLight;
let mode = "";
let Buttons = {
  TopPageBtn: new Button(
    "Start",
    window.innerWidth / 2,
    window.innerHeight / 2,
    function () {
      mode = "start";
      console.log("butn pressed!");
    }
  ),
};
let Audios = {
  ClickSound: new Audio("./assets/click.mp3"),
};
let Player = new Chara(window.innerWidth / 2, window.innerHeight / 2, 80, 0);
let Speed = 0;
let Decelerationrate = 1.05;
const FObj = () => {
  return [
    { type: "wall", x: -200, y: 200, x2: -200, y2: -200, width: 1 },
    { type: "wall", x: -200, y: 200, x2: 200, y2: 200, width: 1 },
    { type: "wall", x: -200, y: -200, x2: 200, y2: -200, width: 1 },
    { type: "wall", x: 200, y: 200, x2: 200, y2: 80, width: 1 },
    { type: "wall", x: 200, y: -200, x2: 200, y2: -80, width: 1 },
    { type: "wall", x: 200, y: 80, x2: 800, y2: 80, width: 1 },
    { type: "wall", x: 200, y: -80, x2: 800, y2: -80, width: 1 },
  ];
};
let FieldObjects = FObj();

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
      const tempchara = new Chara(
        windowWidth / 2,
        windowHeight / 2,
        600,
        (Math.PI * 3) / 2
      );
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
      //console.log(Speed);
      if (mouseIsPressed && !Player.death) {
        Speed += 0.2;
      } else if (Speed > 0 && !Player.death) {
        Speed /= Decelerationrate;
      } else {
        Speed = 0;
      }
      //$("body").css("cursor","none");
      if (mouseX >= windowWidth / 2) {
        Player.direction =
          Math.atan((mouseY - windowHeight / 2) / (mouseX - windowWidth / 2)) +
          Math.PI;
      } else {
        Player.direction = Math.atan(
          (mouseY - windowHeight / 2) / (mouseX - windowWidth / 2)
        );
      }
      Player.renderer();
      FieldObjects.map((e, index) => {
        switch (e.type) {
          case "wall":
            e.x += Speed * cos(Player.direction);
            e.y += Speed * sin(Player.direction);
            e.x2 += Speed * cos(Player.direction);
            e.y2 += Speed * sin(Player.direction);
            let newwall = new wall(e.x, e.y, e.x2, e.y2, e.width);
            newwall.chx = Player.x - windowWidth / 2;
            newwall.chy = Player.y - windowHeight / 2;
            newwall.chr = Player.size / 2;
            newwall.renderer();
            if (newwall.touchPlayer) {
              Player.death = true;
            }
            break;
        }
      });
      if (Player.death) {
        new Button("ReStart", windowWidth / 2, windowHeight / 3, () => {
          FieldObjects = FObj();
          Player.x = windowWidth / 2;
          Player.y = windowHeight / 2;
          Player.direction = 0;
          Player.deathAnimation = 0;
          Player.death = false;
        }).renderer();

        new Button("Back Home", windowWidth / 2, (windowHeight * 2) / 3, () => {
          mode = "";
          FieldObjects = FObj();
          Player.x = windowWidth / 2;
          Player.y = windowHeight / 2;
          Player.direction = 0;
          Player.deathAnimation = 0;
          Player.death = false;
        }).renderer();
      }
      break;
  }
}
