const container = document.querySelector('.container');
const cubes = document.querySelectorAll('.cube');

let selectedCube = null;
let offsetX = 0;
let offsetY = 0;

// Give cubes an initial grid position
cubes.forEach((cube, index) => {
  let cols = 4; // matches CSS grid
  let row = Math.floor(index / cols);
  let col = index % cols;
  cube.style.left = `${col * 100}px`;
  cube.style.top = `${row * 100}px`;

  cube.addEventListener('mousedown', (e) => {
    selectedCube = cube;

    // Calculate offset between mouse and cube position
    const rect = cube.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
  });
});

// Mouse move for dragging
document.addEventListener('mousemove', (e) => {
  if (!selectedCube) return;

  const containerRect = container.getBoundingClientRect();

  // Calculate new position
  let newX = e.clientX - containerRect.left - offsetX;
  let newY = e.clientY - containerRect.top - offsetY;

  // Boundary constraints
  newX = Math.max(0, Math.min(newX, containerRect.width - selectedCube.offsetWidth));
  newY = Math.max(0, Math.min(newY, containerRect.height - selectedCube.offsetHeight));

  selectedCube.style.left = `${newX}px`;
  selectedCube.style.top = `${newY}px`;
});

// Release mouse to drop cube
document.addEventListener('mouseup', () => {
  selectedCube = null;
});
