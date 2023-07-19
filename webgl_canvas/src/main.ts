const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;

let isDragging = false;
let startPosition: { x: number; y: number } = { x: 0, y: 0 };

canvas.addEventListener("mousedown", (event: MouseEvent) => {
  isDragging = true;
  startPosition.x = event.clientX - canvas.offsetLeft;
  startPosition.y = event.clientY - canvas.offsetTop;
});

canvas.addEventListener("mousemove", (event: MouseEvent) => {
  if (isDragging) {
    const currentX = event.clientX - canvas.offsetLeft;
    const currentY = event.clientY - canvas.offsetTop;
    const deltaX = currentX - startPosition.x;
    const deltaY = currentY - startPosition.y;

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Perform drawing operations based on the delta values
    // For example, move a shape by updating its position
    ctx.fillRect(startPosition.x + deltaX, startPosition.y + deltaY, 50, 50);
  }
});

canvas.addEventListener("mouseup", () => {
  isDragging = false;
});
