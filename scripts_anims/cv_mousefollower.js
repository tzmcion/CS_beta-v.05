
function Cv_mousefollower(parent, Color, Size, trail_size, frequencyy) {
    const can = document.createElement("canvas");
    can.width = parseInt((window.getComputedStyle(parent).width).replace("px", ""))
    can.height = parseInt((window.getComputedStyle(parent).height).replace("px", ""))
    can.style.pointerEvents = "none";
    can.style.position = "absolute";
    parent.appendChild(can);
    var raw_color = Color === undefined ? "rgba(rnd,rnd,rnd,alp)" : Color;
    const size = Size === undefined ? Math.random() * 5 + 2 : Size;
    const time = trail_size === undefined ? Math.random() * 20 + 10 : trail_size;
    const color = raw_color;
    const c = can.getContext("2d");
    const frequency = frequencyy === undefined ? 2 : frequencyy;
    var mouse_x = 0, mouse_y = 0, counter = -1, ison = true;

    class follower {
        constructor(x, y, sizee, colorr) {
            this.x = x;
            this.y = y;
            this.counter = (time * 2) + 2;
            this.size = sizee;
            this.color = colorr
            this.alp = 1
        }
    }

    var followers = [];

    function draw() {
        counter++;
        if (counter % frequency == 0) {
            document.onmousemove = handleMouseMove;
            function handleMouseMove(event) {
                mouse_x = event.clientX - parent.getBoundingClientRect().left;
                mouse_y = event.clientY - parent.getBoundingClientRect().top;
                if (can.width !== parseInt((window.getComputedStyle(parent).width).replace("px", ""))) {
                    can.width = parseInt((window.getComputedStyle(parent).width).replace("px", ""));
                }
                if (can.height !== parseInt((window.getComputedStyle(parent).height).replace("px", ""))) {
                    can.height = parseInt((window.getComputedStyle(parent).height).replace("px", ""));
                }
                if (event.clientX > parent.getBoundingClientRect().left + parent.getBoundingClientRect().width || event.clientX < parent.getBoundingClientRect().left) {
                    ison = false;
                } else {
                    ison = true;
                }
            }
            can.style.left = parent.offsetLeft + 'px';
            can.style.top = parent.offsetTop + 'px';
            c.clearRect(0, 0, can.width, can.height);
            if (ison) {
                followers.push(new follower(mouse_x, mouse_y, size * Math.random() + size / 2, color.replace("rnd", Math.random() * 255).replace("rnd", Math.random() * 255).replace("rnd", Math.random() * 255)));
            }
            for (let b = 0; b < followers.length; b++) {
                c.fillStyle = followers[b].color.replace("alp", followers[b].alp);

                c.beginPath();
                c.arc(followers[b].x, followers[b].y, followers[b].size, 0, Math.PI * 2, false);
                c.fill();

                //
                followers[b].counter -= 1;
                followers[b].alp -= 1 / (time * 2);
                followers[b].size /= 1.1;
                if (followers[b].counter <= 0) {
                    followers.splice(b, 1);
                }
            }
        }
        window.requestAnimationFrame(draw);
    }
    draw();
}


Cv_mousefollower(document.getElementById("bt_down"), "rgba(rnd,255,rnd,alp)", 10, 40, 2);

Cv_mousefollower(document.getElementById("img-box-4"), "rgba(rnd,rnd,255,alp)", 12, 30, 3);