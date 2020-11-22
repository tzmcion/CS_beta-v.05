var flag = true;

function StickyDots(Strcan, width, height, colorr, multiply, animate, handler) {
  const can = document.getElementById(Strcan);
  const c = can.getContext("2d");
  const cf = can.getContext("2d");
  can.width = width; //document.getElementById(parent).offsetWidth / 4;
  can.height = height;
  document.getElementById(Strcan).style.marginTop = "-5px";
  var balls = [];
  var color = colorr,
    multiply = multiply;
  var animate = animate;

  class ball {
    constructor(x_pos, size) {
      this.y = can.height - Math.random() * can.height;
      this.size = size === undefined ? Math.random() * 25 + 15 : size;
      this.x =
        x_pos === undefined
          ? Math.random() * (can.width - this.size * 2) + this.size
          : x_pos;
      var colorrr = color.replaceAll("hue", Math.random() * multiply + 100);

      this.vy = (Math.random() * 30) / 8;
      this.gradient = c.createRadialGradient(0, 0, 0, 0, 0, this.size);
      this.gradient.addColorStop(0, colorrr.replace("alp", 0.92));
      this.gradient.addColorStop(0.5, colorrr.replace("alp", 0.8));
      this.gradient.addColorStop(1, colorrr.replace("alp", 0));
      this.last = 1;
    }
    update() {
      this.y += this.vy;
      if (this.y < 0) {
        this.last *= -1;
        //this.y = can.height;
        this.vy *= this.last;
        //this.x = Math.random() * (can.width - this.size * 2) + this.size;
      }
      if (this.y < 20) {
        if (this.vy > 0) {
          this.vy += Math.random() * 0.3;
        }
        if (this.vy < -0.5) {
          this.vy /= 1.1;
        }
      }

      if (this.y > can.height - 20) {
        this.vy -= Math.random() * 0.5;
      }
    }

    draw() {
      c.fillStyle = this.gradient;
      c.translate(this.x | 0, this.y | 0);
      c.beginPath();
      c.arc(0, 0, this.size, 0, Math.PI * 2);
      c.fill();
      c.translate(-this.x | 0, -this.y | 0);
    }
  }

  const gradientup = c.createLinearGradient(0, 0, 0, 15);
  gradientup.addColorStop(
    0,
    colorr.replaceAll("hue", Math.random() * multiply + 150).replace("alp", 1)
  );
  gradientup.addColorStop(
    1,
    colorr.replaceAll("hue", Math.random() * multiply + 150).replace("alp", 0)
  );
  const gradientbottom = c.createLinearGradient(
    0,
    can.height - 15,
    0,
    can.height + 5
  );
  gradientbottom.addColorStop(
    0,
    colorr.replaceAll("hue", Math.random() * multiply + 150).replace("alp", 0)
  );
  gradientbottom.addColorStop(
    1,
    colorr.replaceAll("hue", Math.random() * multiply + 150).replace("alp", 1)
  );

  for (let g = 0; g < 35; g++) {
    balls.push(new ball());
  }

  function anim() {
    if (typeof handler === 'string' ? window[handler] : handler) {
      if (animate) {
        if (document.getElementById("main-card-1").matches(":hover")) {
          window.requestAnimationFrame(anim);
        } else {
          return null;
        }
      } else {
        window.requestAnimationFrame(anim);
      }
    } else {
      return null;
    }

    c.clearRect(0, 0, can.width, can.height);
    c.fillStyle = gradientup;
    c.beginPath();
    c.fillRect(0, 0, can.width, 20);
    c.fillStyle = gradientbottom;
    c.fillRect(0, can.height - 15, can.width, can.height + 20);

    for (let g = 0; g < balls.length; g++) {
      balls[g].update();
      balls[g].draw();
    }
    var image = c.getImageData(0, 0, can.width, can.height),
      data = new Uint8Array(image.data.buffer);
    for (var z = 3; z < data.length; z++) {
      data[z] /= data[z] < 200 ? 6 : 1.2;
    }

    cf.putImageData(image, 0, 0);
  }

  anim();
}

StickyDots(
  "cv2",
  document.getElementById("inf_cv2_par").offsetWidth / 4,
  document.getElementById("inf_cv2_par").offsetHeight + 5,
  "rgba(hue,50, 55 , alp )",
  150,
  false, 'flag'
);

StickyDots(
  "cv",
  document.getElementById("inf_cv_par").offsetWidth / 4,
  document.getElementById("inf_cv_par").offsetHeight + 5,
  "rgba( 29 , hue , " + Math.random() * 100 + 150 + ", alp ",
  150,
  false, 'flag'
);

//color = rgba(hue,255,255,alp)

document.getElementById("anim_box").addEventListener("mouseover", () => {
  StickyDots(
    "anim_c_1",
    document.getElementById("anim_box").offsetWidth,
    document.querySelector(".card").offsetHeight + 5,
    "rgba(hue,120,hue, alp)",
    250,
    true, true
  );
});

document.getElementById('JS_on_off').addEventListener('click', () => {
  if (flag) {
    flag = false;
  } else {
    flag = true;
    StickyDots(
      "cv2",
      document.getElementById("inf_cv2_par").offsetWidth / 4,
      document.getElementById("inf_cv2_par").offsetHeight + 5,
      "rgba(hue,50, 55 , alp )",
      150,
      false, 'flag'
    );

    StickyDots(
      "cv",
      document.getElementById("inf_cv_par").offsetWidth / 4,
      document.getElementById("inf_cv_par").offsetHeight + 5,
      "rgba( 29 , hue , " + Math.random() * 100 + 150 + ", alp ",
      150,
      false, 'flag'
    );
  }
});

window.onresize = function () {
  if (window.innerWidth < 780) {
    flag = false;
  }
  else {
    flag = true;
  }
  if (flag) {
    flag = false;
    setTimeout(function () {
      flag = true;
      StickyDots(
        "cv2",
        document.getElementById("inf_cv2_par").offsetWidth / 4,
        document.getElementById("inf_cv2_par").offsetHeight + 5,
        "rgba(hue,50, 55 , alp )",
        150,
        false, 'flag'
      );

      StickyDots(
        "cv",
        document.getElementById("inf_cv_par").offsetWidth / 4,
        document.getElementById("inf_cv_par").offsetHeight + 5,
        "rgba( 29 , hue , " + Math.random() * 100 + 150 + ", alp ",
        150,
        false, 'flag'
      );
    }, 300)
  }
};

StickyDots(
  "anim_c_1",
  document.getElementById("anim_box").offsetWidth,
  document.querySelector(".card").offsetHeight + 5,
  "rgba(hue,120,hue, alp)",
  150,
  true, true
);
