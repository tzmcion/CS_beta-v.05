function Cv_Firework(
  CvStr,
  CanvasWidth,
  CanvasHeight,
  X_pos,
  Y_pos,
  Size,
  WindX,
  windY,
  Color,
  Howmany,
  Duration
) {
  const can = document.createElement("canvas");
  can.width = CvStr.offsetWidth;
  can.height = CvStr.offsetHeight;
  can.style.pointerEvents = 'none';
  can.style.position = "absolute";
  can.style.left = CvStr.offsetLeft + 'px';
  CvStr.appendChild(can);
  const c = can.getContext("2d");
  const color = Color === undefined ? "rgb( rnd , rnd , rnd )" : Color;
  const wind =
    WindX === undefined
      ? (Math.random() * 2 + 2) * Math.random() > 0.5
        ? 1
        : -1
      : WindX;
  const WindY = windY === undefined ? (Math.random() * 5 + 2) * -1 : windY * -1;
  const size = Size === undefined ? 2 : Size;
  const howmany = Howmany === undefined ? 60 : Howmany;
  const xpos = X_pos;
  const ypos = Y_pos;
  const duration = Duration === undefined ? 100 : Duration;
  var isworking = true;
  var splash_balls = [];

  can.width = CanvasWidth;
  can.height = CanvasHeight;

  function drawcolorstar(position_x, position_y, size, color) {
    //Function Drawing Wheel in position x/y in size
    c.beginPath();
    c.arc(position_x, position_y, size, 0, Math.PI * 2, false);
    c.strokeStyle = color;
    c.fillStyle = color;
    c.fill();
    c.stroke();
  }

  class ball {
    constructor(x, y, clr, sizee, vx, vy, time) {
      this.x = x;
      this.y = y;
      this.color = clr;
      this.size = sizee;
      this.vx = vx;
      this.vy = vy;
      this.ison = true;
      this.time = duration * Math.random();
      this.lastsizechange = 0;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.time--;
      if (this.time < 0) {
        this.ison = false;
      }
    }
  }

  for (let z = 0; z < howmany; z++) {
    let vx =
      Math.random() * wind == 0
        ? Math.random() > 0.5
          ? Math.random() * -1
          : Math.random()
        : wind * Math.random();
    vx +=
      Math.random() > 0.5
        ? (Math.random() * wind) / 1.1
        : ((Math.random() * wind) / 1.1) * -1;
    splash_balls.push(
      new ball(
        xpos,
        ypos,
        color
          .replace("rnd", Math.random() * 254)
          .replace("rnd", Math.random() * 255)
          .replace("rnd", Math.random() * 255),
        size,
        vx,
        Math.random() * WindY,
        Math.random() * 60 + 25
      )
    );
  }

  function anim() {
    if (isworking) {
      window.requestAnimationFrame(anim);
    }
    else {
      can.remove();
      return true;
    }
    c.clearRect(0, 0, can.offsetWidth + 10, can.offsetHeight + 10);

    isworking = false;
    for (let g = 0; g < splash_balls.length; g++) {
      if (splash_balls[g].ison) {
        isworking = true;
        splash_balls[g].update();
        drawcolorstar(
          splash_balls[g].x,
          splash_balls[g].y,
          splash_balls[g].size,
          splash_balls[g].color
        );
        if (splash_balls[g].lastsizechange > 3) {
          splash_balls[g].size = Math.random() * (size * 2.5);
          splash_balls[g].lastsizechange = 0;
        }
        splash_balls[g].lastsizechange++;
      }
    }
  }
  anim();
}

document.getElementById("anim_c_3").addEventListener("click", (e) => {
  let x =
    e.clientX -
    document.getElementById("anim_c_3").getBoundingClientRect().left;
  let y =
    e.clientY - document.getElementById("anim_c_3").getBoundingClientRect().top;
  let color = (Math.random() * 255).toString();
  Cv_Firework(
    document.getElementById("anim_c_3"),
    document.getElementById("anim_box").offsetWidth,
    document.querySelector(".card").offsetHeight,
    x,
    y,
    2,
    undefined,
    4.5,
    "rgb(rnd,rnd," + color + ")",
    200,
    400
  );
});



