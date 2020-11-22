function Cv_Lstrike(
  button_id,
  parent_id,
  strike_color,
  line_width,
  splash_color,
  splash_quantity,
  live_time
) {
  const obj = document.getElementById(button_id);
  const parent = document.getElementById(parent_id);
  const color = (strike_color === undefined ? "rgb(rnd,rnd,rnd)" : strike_color)
    .replace("rnd", Math.random() * 254)
    .replace("rnd", Math.random() * 254)
    .replace("rnd", Math.random() * 254);
  const lwidth =
    line_width === undefined ? Math.random() * 2 + 0.5 : line_width;
  const can = document.createElement("canvas");
  const sp_color =
    splash_color === undefined ? "rgb(rnd,rnd,rnd)" : splash_color;
  const l_time = live_time === undefined ? Math.random() * 50 : live_time;
  const s_quantity =
    splash_quantity === undefined ? Math.random() * 50 + 20 : splash_quantity;
  can.width = window.innerWidth;
  can.height =
    obj.getBoundingClientRect().top +
    obj.getBoundingClientRect().height / 2 - parent.getBoundingClientRect().top;
  can.style.position = "absolute";
  can.style.pointerEvents = "none";
  can.style.top = "0px";
  can.style.zIndex = "9999";
  can.style.left =
    parent.getBoundingClientRect().left != "0"
      ? (parent.getBoundingClientRect().left * -1).toString() + "px"
      : "0px";
  parent.appendChild(can);
  const c = can.getContext("2d");
  //document.body.style.overflowX = "hidden";
  class part {
    constructor(startX, startY, endX, endY) {
      this.segments = [];
      this.startX = startX;
      this.startY = startY;
      this.endX = endX;
      this.endY = endY;
    }
  }
  var angle = (Math.random() * Math.PI) / 5 / 2.5 + Math.PI / 1.75;
  var g = obj.getBoundingClientRect();
  if (g.top > 100) {
    var xs = g.left + g.width / 1.65 + Math.random() * (g.width / 3.5);
  } else {
    var xs = g.left + g.width / 2;
  }
  var lightning_strike = [];
  lightning_strike.push(
    new part(
      xs,
      -50,
      (Math.cos(angle) * (can.height * 4)) / 8 + xs,
      (Math.sin(angle) * (can.height * 4)) / 8
    )
  );
  lightning_strike.push(
    new part(
      lightning_strike[0].endX,
      lightning_strike[0].endY,
      lightning_strike[0].endX +
      (g.top - parent.getBoundingClientRect().top) * 0.2 +
      Math.random() * 20,
      lightning_strike[0].endY - Math.sin(angle) * ((can.height * 1) / 8 / 1.4)
    )
  );
  lightning_strike.push(
    new part(
      lightning_strike[1].endX,
      lightning_strike[1].endY,
      g.left + g.width / 2,
      g.top - parent.getBoundingClientRect().top + g.height / 2
    )
  );

  var multiplier = (g.top - parent.getBoundingClientRect().top) / 100;

  for (let b = 0; b < lightning_strike.length; b++) {
    if (b != 1) {
      var size = (lightning_strike[b].endY - lightning_strike[b].startY) / 10;
    } else {
      var size = (lightning_strike[b - 1].endY - lightning_strike[b].endY) / 10;
    }
    for (let x = 0; x < 10; x++) {
      let cr_x = 0;
      if (b != 1) {
        var cr_y =
          lightning_strike[b].segments[x - 1] === undefined
            ? lightning_strike[b].startY + size
            : lightning_strike[b].segments[x - 1].endY + size;
        if (x == 0) {
          cr_x =
            lightning_strike[b].startX +
            (Math.random() > 0.5
              ? Math.random() * multiplier * -1
              : Math.random() * multiplier);
        } else if (x > 0 && x <= 8) {
          cr_x =
            lightning_strike[b].segments[x - 1].endX +
            (Math.cos(angle) * size +
              (Math.random() > 0.5
                ? Math.random() * 10 * -1
                : Math.random() * 10));
          if (x > 6 && b == 2) {
            if (lightning_strike[b].endX + 50 > cr_x) {
              cr_x += 20;
            } else if (lightning_strike[b].endX - 50 < cr_x) {
              cr_x -= 20;
            }
          }
        } else if (x == 9) {
          cr_x = lightning_strike[b].endX;
        }
      } else {
        var cr_y =
          lightning_strike[b].segments[x - 1] === undefined
            ? lightning_strike[b - 1].endY
            : lightning_strike[b].segments[x - 1].endY - size;
        if (x == 0) {
          cr_x =
            lightning_strike[b].startX +
            (Math.random() > 0.5 ? Math.random() * 5 * -1 : Math.random() * 5);
        } else if (x > 0 && x <= 8) {
          cr_x =
            lightning_strike[b].segments[x - 1].endX +
            (Math.cos(angle) * size +
              (Math.random() > 0.5
                ? Math.random() * 5 * -1
                : Math.random() * 5)) +
            (lightning_strike[b].endX - lightning_strike[b].startX) / 10;
        } else if (x == 9) {
          cr_x = lightning_strike[b].endX;
        }
      }
      lightning_strike[b].segments.push(
        new part(undefined, undefined, cr_x, cr_y)
      );
    }
  }
  class sparkle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.vx =
        Math.random() > 0.5 ? Math.random() * 1.5 * -1 : Math.random() * 1.5;
      this.vy = Math.random() * 1.6 + 0.4;
      this.isalive = true;
      this.counter = 0;
      this.stop = Math.random() * l_time * 5 + l_time;
    }
    update() {
      this.x += this.vx;
      this.y -= this.vy;
      this.vy -= 0.019;
      this.counter++;
    }
  }
  var sparkles = [];
  for (let b = 0; b < s_quantity; b++) {
    sparkles.push(
      new sparkle(
        g.left + g.width / 2,
        g.top - parent.getBoundingClientRect().top + g.height / 2
      )
    );
  }
  var counter = 0;
  function draw() {
    counter += 4;
    c.strokeStyle = color;
    c.lineWidth = lwidth;
    c.clearRect(0, 0, window.innerWidth, can.height);
    c.beginPath();
    c.moveTo(lightning_strike[0].startX, lightning_strike[0].startY);
    for (let b = 0; b < lightning_strike.length; b++) {
      if (counter < 15) {
        for (let a = 0; a < counter; a++) {
          if (lightning_strike[b].segments[a] !== undefined) {
            c.lineTo(
              lightning_strike[b].segments[a].endX,
              lightning_strike[b].segments[a].endY
            );
          }
        }
      }
    }
    c.stroke();
    for (let a = 0; a < sparkles.length; a++) {
      if (sparkles[a].isalive) {
        c.beginPath();
        c.fillStyle = sp_color
          .replace("rnd", Math.random() * 254)
          .replace("rnd", Math.random() * 254)
          .replace("rnd", Math.random() * 254);
        c.rect(
          sparkles[a].x,
          sparkles[a].y,
          Math.random() * 3 + 2,
          Math.random() * 3 + 2
        );
        c.fill();
        sparkles[a].update();

        if (sparkles[a].counter > sparkles[a].stop) {
          sparkles[a].isalive = false;
        }
      }
    }
    let another = false;
    for (let a = 0; a < sparkles.length; a++) {
      if (sparkles[a].isalive == true) {
        another = true;
      }
    }
    if (another) {
      window.requestAnimationFrame(draw);
    } else {
      can.remove();
    }
  }
  draw();
}

document.getElementById("anim_bt_2").addEventListener("click", function () {
  Cv_Lstrike("anim_bt_2", "anim_c_2", "rgb(rnd,250,rnd)", Math.random() * 4 + 2, "rgb(255,rnd,125)", 150, 15);
});

document.getElementById("bttt").addEventListener("click", function () {
  Cv_Lstrike("bttt", "body", "rgb(250,250,rnd)", 4, "rgb(rnd,255,rnd)", 50, 20);
});




// document.getElementById("data_card_2").addEventListener("mouseover", () => {
//   document.getElementById("anim_bt_2").style.bottom = "95px";
// });

// document.getElementById("data_card_2").addEventListener("mouseout", () => {
//   document.getElementById("anim_bt_2").style.bottom = "40px";
// });
