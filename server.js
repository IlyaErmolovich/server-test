const canvas = document.getElementById("root");
const ctx = canvas.getContext("2d");

const size = [25, 25];
const dist = 15;
const img = new Image();
img.src = "дед.jpg";
let x = 0,
    y = 0;
let xa = 75,
    ya = 75;
let up = false,
    down = false,
    right = false,
    left = false;
let speed = 0.5;
let mirror = -1;
let score = 0;

setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.scale(mirror, 1);
    ctx.drawImage(img, mirror * x, y, mirror * size[0], size[1]);
    ctx.restore();

    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.strokeStyle = "orange";
    ctx.fillStyle = "red";
    ctx.arc(xa, ya, 5, 0, 2 * 3.14, false);
    ctx.stroke();
    ctx.fill();
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = "green";
    ctx.moveTo(xa + 1, ya - 6);
    ctx.lineTo(xa + 3, ya - 12);
    ctx.stroke();

    ctx.fillStyle = "blue";
    ctx.font = "12px Consolas";
    ctx.fillText("Счет: " + score, 50, 10);
}, 15);

function GenerateApple() {
    xa = Math.round(Math.random() * 150);
    ya = Math.round(Math.random() * 150);
}

setInterval(() => {
    if (up) {
        y -= (right || left) ? 0.7 * speed : speed;
    }
    if (down) {
        y += (right || left) ? 0.7 * speed : speed;
    }
    if (right) {
        mirror = 1;
        x += (up|| down) ? 0.7 * speed : speed;
    }
    if (left) {
        mirror = -1
        x -= (up|| down) ? 0.7 * speed : speed;
    }

    if (Math.abs(x + size[0] / 2 - xa) < dist && Math.abs(y + size[0] / 2 - ya) < dist) {
        GenerateApple();
        score++;
        //play();
    }
}, 1);

document.addEventListener('keydown', function (event) {
    if (event.code === 'KeyW') { up = true; }
});
document.addEventListener('keyup', function (event) {
    if (event.code === 'KeyW') { up = false; }
});
document.addEventListener('keydown', function (event) {
    if (event.code === 'KeyS') { down = true; }
});
document.addEventListener('keyup', function (event) {
    if (event.code === 'KeyS') { down = false; }
});
document.addEventListener('keydown', function (event) {
    if (event.code === 'KeyA') { left = true; }
});
document.addEventListener('keyup', function (event) {
    if (event.code === 'KeyA') { left = false; }
});
document.addEventListener('keydown', function (event) {
    if (event.code === 'KeyD') { right = true; }
});
document.addEventListener('keyup', function (event) {
    if (event.code === 'KeyD') { right = false; }
});

// canvas.addEventListener('mousemove', function (event) {
//     console.log(event.screenX, event.screenY); // абсолютные
//     console.log(event.clientX, event.clientY); // относительные
// });

// canvas.addEventListener('mousedown', function (event) {
//     if (event.which === 1) { console.log("ЛКМ"); }
//     if (event.which === 2) { console.log("СКМ"); }
//     if (event.which === 3) { console.log("ПКМ"); }
// });
// canvas.addEventListener("wheel", function (event) {
//     console.info(event.deltaY < 0 ? "ВВЕРХ" : "ВНИЗ");
// });