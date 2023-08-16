let out = [];

function setup() {
  createCanvas(800, 800);
}

function draw() {
  $("#distpointv").val($("#distpoint").val());
  $("#canvsizev").val($("#canvsize").val());
  resizeCanvas($("#canvsize").val(), $("#canvsize").val());
  background("#444444");
  strokeWeight(10);
  stroke("red");
  point($("#canvsize").val() / 2, $("#canvsize").val() / 2);
  strokeWeight(10);
  stroke("#ffffff");
  point(
    Math.floor(mouseX / $("#distpoint").val() + 0.5) * $("#distpoint").val(),
    Math.floor(mouseY / $("#distpoint").val() + 0.5) * $("#distpoint").val()
  );
  console.log(
    Math.floor(mouseX / $("#distpoint").val()) * $("#distpoint").val(),
    Math.floor(mouseY / $("#distpoint").val()) * $("#distpoint").val(),
    mouseX,
    mouseY
  );
  $("#out").val(JSON.stringify(out));
}

/*
for (var i = 0; i < $("#canvsize").val() / $("#distpoint").val(); i++) {
  for (var k = 0; k < $("#canvsize").val() / $("#distpoint").val(); i++) {
    point(i * $("#distpoint").val(), k * $("#distpoint").val());
  }
}
*/
