//Class
class Chara {
  constructor(x, y, size, direction) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.direction = direction;
    this.state = "arrive";
    this.deathAnimation = 0;
  }

  renderer() {
    fill("#999999");
    if (this.state == "death" && this.deathAnimation == 0) {
      this.deathAnimation = 1;
      Audios.DeathSound.play();
    }
    if (this.state == "death" && this.deathAnimation != 0) {
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

function CalculationVectorLength(vector) {
  var lineLengthSquared = vector.x * vector.x + vector.y * vector.y;

  return Math.sqrt(lineLengthSquared);
}

function circleLineCollision(
  circleX,
  circleY,
  radius,
  lineStartX,
  lineStartY,
  lineEndX,
  lineEndY
) {
  var lineVector = { x: lineEndX - lineStartX, y: lineEndY - lineStartY };

  var circleVector = { x: circleX - lineStartX, y: circleY - lineStartY };

  var circleVectorEnd = { x: circleX - lineEndX, y: circleY - lineEndY };

  var lineLengthSquared =
    lineVector.x * lineVector.x + lineVector.y * lineVector.y;

  var normalizedLineVector = {
    x: lineVector.x / Math.sqrt(lineLengthSquared),
    y: lineVector.y / Math.sqrt(lineLengthSquared),
  };

  var projection =
    normalizedLineVector.x * circleVector.x +
    normalizedLineVector.y * circleVector.y;

  let distance_projection =
    circleVector.x * normalizedLineVector.y -
    normalizedLineVector.x * circleVector.y;
/*
  if (Math.abs(distance_projection) < radius) {
    // 始点 => 終点と始点 => 円の中心の内積を計算する
    var dot01 = circleVector.x * lineVector.x + circleVector.y * lineVector.y;
    // 始点 => 終点と終点 => 円の中心の内積を計算する
    var dot02 =
      circleVectorEnd.x * lineVector.x + circleVectorEnd.y * lineVector.y;
    if (dot01 * dot02 <= 0.0) {
      if (
        CalculationVectorLength(circleVector) < radius ||
        CalculationVectorLength(circleVectorEnd) < radius
      ) {
        return true;
      }
    }
  }*/

  if (projection >= 0 && projection <= Math.sqrt(lineLengthSquared)) {
    var distanceToCircle = Math.sqrt(
      (circleVector.x - projection * normalizedLineVector.x) ** 2 +
        (circleVector.y - projection * normalizedLineVector.y) ** 2
    );

    //console.log(distanceToCircle,radius);

    if (distanceToCircle <= radius) {
      return true;
    }
  }

  return false;
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

class marker {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  renderer() {
    stroke("purple");
    strokeWeight(20);
    point(this.x, this.y);
    console.log(`marker: ${this.x} ${this.y}`);
    stroke("#000000");
    strokeWeight(1);
  }
}

class Button {
  constructor(textv, x, y, func) {
    this.text = textv;
    this.x = x;
    this.y = y;
    this.textsize = 60;
    this.smalltextsize = 60;
    this.largetextsize = 64;
    this.biggerval = 4;
    this.func = func;
  }

  renderer() {
    this.textsize = this.smalltextsize;
    if (
      mouseX >= this.x - textWidth(this.text) / 2 - this.biggerval / 2 &&
      mouseX <= this.x + textWidth(this.text) / 2 + this.biggerval / 2 &&
      mouseY >= this.y - this.textsize / 2 - this.biggerval / 4 &&
      mouseY <= this.y + this.textsize / 2 + this.biggerval / 4
    ) {
      if (mouseIsPressed) {
        Audios.ClickSound.play();
        this.func.call();
      }
      this.textsize = this.largetextsize;
    } else {
      this.textsize = this.smalltextsize;
    }
    textSize(this.textsize);
    textFont(FontsMedium);
    fill("#ffffff");
    stroke("black");
    strokeWeight(1);
    rect(
      this.x - textWidth(this.text) / 2 - this.biggerval / 2,
      this.y - this.textsize / 2 - this.biggerval / 4,
      textWidth(this.text) + this.biggerval,
      this.textsize + this.biggerval / 2,
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

class goal {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.isGoal = false;
    this.chx = 0;
    this.chy = 0;
  }

  renderer() {
    fill("#ffff00");
    circle(windowWidth / 2 + this.x, windowHeight / 2 + this.y, 100, 100);
    textFont(FontsMedium);
    textSize(25);
    fill("#000000");
    text(
      "GOAL",
      windowWidth / 2 + this.x - textWidth("GOAL") / 2,
      windowHeight / 2 + this.y + 25 / 4
    );
    if (Math.sqrt((this.x - this.chx) ** 2 + (this.y - this.chy) ** 2) < 25) {
      this.isGoal = true;
    }
  }
}

class finis {
  constructor() {}

  renderer() {
    textFont(FontsMedium);
    textSize(50);
    fill("#000000");
    text(
      "Game Clear!\nThank you for Playing!\nEsc to back Home",
      windowWidth / 2 - textWidth("Game Clear!\nThank you for Playing!") / 2,
      windowHeight / 2
    );
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
  Home: new Button("🏠", window.innerWidth - 40, 40, function () {
    mode = "";
    console.log("ホームに戻る");
  }),
};
let Audios = {
  ClickSound: new Audio("./assets/click.mp3"),
  DeathSound: new Audio("./assets/death.mp3"),
  BGM: new Audio("./assets/アトリエと電脳世界.mp3"),
};

let Player = new Chara(window.innerWidth / 2, window.innerHeight / 2, 80, 0);
let Speed = 0,
  clear = false;
const searchParams = new URLSearchParams(window.location.search);
let StageNum = searchParams.has("stageID")
  ? searchParams.get("stageID") - 1
  : 0;
console.log(searchParams.get("stageID") - 1);
let Decelerationrate = 1.05;
let wait = 180;
const FObj = (StageNumber) => {
  const StageData = [
    [
      { type: "wall", x: -200, y: 200, x2: -200, y2: -200, width: 5 },
      { type: "wall", x: -200, y: 200, x2: 200, y2: 200, width: 5 },
      { type: "wall", x: -200, y: -200, x2: 200, y2: -200, width: 5 },
      { type: "wall", x: 200, y: 200, x2: 200, y2: 75, width: 5 },
      { type: "wall", x: 200, y: -200, x2: 200, y2: -75, width: 5 },
      { type: "wall", x: 200, y: 75, x2: 475, y2: 75, width: 5 },
      { type: "wall", x: 200, y: -75, x2: 475, y2: -75, width: 5 },
      { type: "wall", x: 475, y: -75, x2: 475, y2: 75, width: 5 },
      { type: "goal", x: 400, y: 0 },
    ],
    [
      { type: "wall", x: -200, y: 200, x2: -200, y2: -200, width: 5 },
      { type: "wall", x: -200, y: 200, x2: 200, y2: 200, width: 5 },
      { type: "wall", x: -200, y: -200, x2: 200, y2: -200, width: 5 },
      { type: "wall", x: 200, y: 200, x2: 200, y2: 75, width: 5 },
      { type: "wall", x: 200, y: -200, x2: 200, y2: -75, width: 5 },
      { type: "wall", x: 200, y: 75, x2: 475, y2: 75, width: 5 },
      { type: "wall", x: 200, y: -75, x2: 325, y2: -75, width: 5 },
      { type: "wall", x: 475, y: -350, x2: 475, y2: 75, width: 5 },
      { type: "wall", x: -475, y: -350, x2: 475, y2: -350, width: 5 },
      { type: "wall", x: -475, y: -350, x2: -475, y2: 0, width: 5 },
      { type: "wall", x: -350, y: -200, x2: -350, y2: 0, width: 5 },
      { type: "wall", x: -475, y: 0, x2: -350, y2: 0, width: 5 },
      { type: "wall", x: -350, y: -200, x2: 200, y2: -200, width: 5 },
      { type: "goal", x: -412.5, y: -75 },
    ],
    [
      {
        type: "function",
        todo: () => {
          Player.size = 100;
        },
      },
      { type: "wall", x: -55, y: 55, x2: 1000, y2: 55, width: 5 },
      { type: "wall", x: -55, y: -55, x2: 1000, y2: -55, width: 5 },
      { type: "wall", x: -55, y: -55, x2: -55, y2: 55, width: 5 },
      { type: "wall", x: 1000, y: 55, x2: 1000, y2: -55, width: 5 },
      { type: "goal", x: 925, y: 0 },
    ],
    [
      {
        type: "function",
        todo: () => {
          Player.size = 90;
        },
      },
      { type: "wall", x: -55, y: 55, x2: 1000, y2: 55, width: 5 },
      { type: "wall", x: -55, y: -55, x2: 890, y2: -55, width: 5 },
      { type: "wall", x: -55, y: -55, x2: -55, y2: 55, width: 5 },
      { type: "wall", x: 1000, y: 55, x2: 1000, y2: -55, width: 5 },
      { type: "wall", x: 1000, y: -1000, x2: 1000, y2: 55, width: 5 },
      { type: "wall", x: 890, y: -55, x2: 890, y2: -890, width: 5 },
      { type: "wall", x: -55, y: -55, x2: -55, y2: 55, width: 5 },
      { type: "wall", x: 1000, y: 55, x2: 1000, y2: -55, width: 5 },
      { type: "wall", x: -55, y: -1000, x2: -55, y2: 55, width: 5 },
      { type: "wall", x: -55, y: -1000, x2: 1000, y2: -1000, width: 5 },
      { type: "wall", x: 55, y: -165, x2: 890, y2: -165, width: 5 },
      { type: "wall", x: 55, y: -165, x2: 55, y2: -890, width: 5 },
      { type: "wall", x: 55, y: -890, x2: 890, y2: -890, width: 5 },
      { type: "goal", x: 835, y: -110 },
    ],
    [
      {
        type: "function",
        todo: () => {
          Player.size = 85;
        },
      },
      { type: "wall", x: -200, y: 200, x2: -200, y2: -200, width: 5 },
      { type: "wall", x: -200, y: 200, x2: 200, y2: 200, width: 5 },
      { type: "wall", x: -200, y: -200, x2: 200, y2: -200, width: 5 },
      { type: "wall", x: 200, y: 200, x2: 200, y2: 75, width: 5 },
      { type: "wall", x: 200, y: -200, x2: 200, y2: -75, width: 5 },
      { type: "wall", x: 200, y: 75, x2: 1075, y2: 575, width: 5 },
      { type: "wall", x: 200, y: -75, x2: 975, y2: 400, width: 5 },
      { type: "wall", x: 1075, y: 425, x2: 1075, y2: 575, width: 5 },
      { type: "wall", x: 975, y: 400, x2: 975, y2: 300, width: 5 },
      { type: "wall", x: 1075, y: 425, x2: 2200, y2: 1250, width: 5 },
      { type: "wall", x: 1075, y: 275, x2: 2200, y2: 1125, width: 5 },
      { type: "wall", x: 1075, y: 275, x2: 975, y2: 300, width: 5 },
      { type: "wall", x: 2200, y: 1250, x2: 2200, y2: 1125, width: 5 },
      { type: "goal", x: 2150, y: 1150 },
    ],
    [{ type: "FIN" }],
  ];
  return StageData[StageNumber];
};
let FieldObjects = FObj(StageNum);

function preload() {
  FontsBlack = loadFont("./assets/MPLUSRounded1c-Black.ttf");
  FontsMedium = loadFont("./assets/MPLUSRounded1c-Medium.ttf");
  FontsLight = loadFont("./assets/MPLUSRounded1c-Light.ttf");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(60);
  Audios.BGM.loop = true;
  Audios.BGM.volume = 0.2;
  Audios.BGM.play();
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
      strokeWeight(15);
      stroke("#000000");
      fill("#ffff00");
      text(
        "MouseMouse",
        windowWidth / 2 - textWidth("mousemouse") / 2,
        windowHeight / 3
      );
      Buttons.TopPageBtn.renderer();
      //devtool();
      break;

    case "start":
      /*
      Buttons.Home.smalltextsize = 50;
      Buttons.Home.largetextsize = 50;
      Buttons.Home.biggerval = 0;
      Buttons.Home.renderer();
      */
      //console.log(Speed);
      if (mouseIsPressed && Player.state == "arrive") {
        Speed += 0.2;
      } else if (Speed > 0 && Player.state == "arrive") {
        Speed /= Decelerationrate;
      } else {
        Speed = 0;
      }
      if (wait) {
        Speed = 0;
        wait--;
      }
      if (Player.state == "arrive") {
        $("body").css("cursor", "none");
      } else {
        $("body").css("cursor", "default");
      }
      if (mouseX >= windowWidth / 2) {
        Player.direction =
          Math.atan((mouseY - windowHeight / 2) / (mouseX - windowWidth / 2)) +
          Math.PI;
      } else {
        Player.direction = Math.atan(
          (mouseY - windowHeight / 2) / (mouseX - windowWidth / 2)
        );
      }
      //console.log(FieldObjects)
      FieldObjects.map((e, index) => {
        switch (e.type) {
          case "wall":
            e.x += Speed * cos(Player.direction);
            e.y += Speed * sin(Player.direction);
            e.x2 += Speed * cos(Player.direction);
            e.y2 += Speed * sin(Player.direction);
            let newwall = new wall(e.x, e.y, e.x2, e.y2, e.width);
            let markerwall = new marker(e.x, e.y);
            newwall.chx = Player.x - windowWidth / 2;
            newwall.chy = Player.y - windowHeight / 2;
            newwall.chr = Player.size / 2;
            newwall.renderer();
            //markerwall.renderer();
            if (newwall.touchPlayer && !location.href.includes("view")) {
              Player.state = "death";
            }
            break;
          case "marker":
            e.x += Speed * cos(Player.direction);
            e.y += Speed * sin(Player.direction);
            let newmarker = new marker(e.x, e.y);
            //newmarker.renderer();
            break;

          case "goal":
            FieldObjects[index].x += Speed * cos(Player.direction);
            FieldObjects[index].y += Speed * sin(Player.direction);
            let goalobj = new goal(e.x, e.y);
            goalobj.chx = Player.x - windowWidth / 2;
            goalobj.chy = Player.y - windowHeight / 2;
            goalobj.renderer();
            if (goalobj.isGoal) {
              Player.state = "goal";
            }
            break;
          case "FIN":
            let fini = new finis().renderer();
            clear = true;
            break;
          case "function":
            e.todo.call();
            break;
        }
      });
      Player.renderer();
      if (wait) {
        textSize(50);
        fill("#000000");
        text(
          Math.floor((wait + 60) / 60),
          windowWidth / 2 - textWidth(Math.floor((wait + 60) / 60)) / 2,
          windowHeight / 2
        );
      }
      if (Player.state == "death") {
        new Button("ReStart", windowWidth / 2, windowHeight / 3, () => {
          FieldObjects = FObj(StageNum);
          Player.x = windowWidth / 2;
          Player.y = windowHeight / 2;
          Player.direction = 0;
          Player.deathAnimation = 0;
          Player.state = "arrive";
          wait = 180;
        }).renderer();

        new Button("Back Home", windowWidth / 2, (windowHeight * 2) / 3, () => {
          mode = "";
          FieldObjects = FObj(StageNum);
          Player.x = windowWidth / 2;
          Player.y = windowHeight / 2;
          Player.direction = 0;
          Player.deathAnimation = 0;
          Player.state = "arrive";
          wait = 180;
        }).renderer();
      }

      if (Player.state == "goal") {
        textSize(80);
        textFont(FontsBlack);
        strokeWeight(5);
        stroke("#000000");
        fill("#ffff00");
        text("Goal", windowWidth / 2 - textWidth("Goal") / 2, windowHeight / 3);
        strokeWeight(0);
        new Button("Next Stage", windowWidth / 2, windowHeight / 2, () => {
          StageNum += 1;
          FieldObjects = FObj(StageNum);
          Player.x = windowWidth / 2;
          Player.y = windowHeight / 2;
          Player.direction = 0;
          Player.deathAnimation = 0;
          Player.state = "arrive";
          wait = 180;
        }).renderer();
      }
      break;
  }
}

function keyPressed() {
  if (keyCode === ESCAPE) {
    mode = "";
    StageNum = 0;
    FieldObjects = FObj(StageNum);
    Player.x = windowWidth / 2;
    Player.y = windowHeight / 2;
    Player.direction = 0;
    Player.deathAnimation = 0;
    Player.state = "arrive";
    wait = 180;
    clear = true;
    $("body").css("cursor", "default");
  }
}
