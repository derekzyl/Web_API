function draw() {
  const canvas = document.querySelector("#canvas");
  const ctx = canvas.getContext("2d");
  const c = canvas.getContext("2d");
  const f = document.querySelector("body");
  f.addEventListener("click", function (event) {
    console.log(event.clientX, event.clientY);
  });

  if (ctx) {
    //
    console.log("ctx is defined");
    ctx.fillStyle = "red";
    ctx.fillRect(10, 10, 50, 50);
    ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
    ctx.fillRect(30, 30, 50, 50);
    ctx.clearRect(15, 15, 60, 60);

    // c.beginPath();
    // c.moveTo(75, 50);
    // c.lineTo(20, 75);
    // c.lineTo(20, 25);
    // c.fill();

    c.beginPath();
    c.moveTo(50, 20);
    c.lineTo(30, 30);
    c.lineTo(50, 60);
    c.lineTo(70, 30);
    c.lineTo(50, 20);

    c.fill();
    c.stroke();

    //   ctx.beginPath();
    //   ctx.arc(75, 75, 50, 30, Math.PI * 2, true); // Outer circle
    //   ctx.moveTo(110, 75);
    //   ctx.arc(75, 75, 35, 0, Math.PI, true); // Mouth (clockwise)
    //   ctx.moveTo(65, 65);
    //   ctx.arc(60, 65, 5, 0, Math.PI * 2, true); // Left eye
    //   ctx.moveTo(95, 65);
    //   ctx.arc(90, 65, 5, 0, Math.PI * 2, true); // Right eye
    //   ctx.stroke();
  }
}
