const container = document.getElementById("container");
const cubes = document.querySelectorAll(".cube");

let activeCube = null;
let offsetX = 0;
let offsetY = 0;

cubes.forEach(cube => {
  cube.addEventListener("mousedown", (e) => {
    activeCube = cube;
    const rect = cube.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  });
});

function onMouseMove(e) {
  if (!activeCube) return;

  const containerRect = container.getBoundingClientRect();
  const cubeRect = activeCube.getBoundingClientRect();

  // Calculate new position
  let newLeft = e.clientX - containerRect.left - offsetX;
  let newTop = e.clientY - containerRect.top - offsetY;

  // Boundary constraints
  newLeft = Math.max(0, Math.min(newLeft, containerRect.width - cubeRect.width));
  newTop = Math.max(0, Math.min(newTop, containerRect.height - cubeRect.height));

  // Apply position
  activeCube.style.left = `${newLeft}px`;
  activeCube.style.top = `${newTop}px`;
}

function onMouseUp() {
  document.removeEventListener("mousemove", onMouseMove);
  document.removeEventListener("mouseup", onMouseUp);
  activeCube = null;
}
