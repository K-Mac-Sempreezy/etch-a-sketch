//DOM Elements
const grid = document.querySelector('.grid-container');
const gridDiv = document.querySelectorAll('.grid-div');
const resetBtn = document.getElementById('reset');
const slider = document.getElementById("myRange");
const output = document.getElementById("demo");

output.innerHTML = slider.value;

slider.oninput = function() {
  output.innerHTML = this.value;
}
//Global variables
const defaultGrid = 16; //Max size 64.
let input;


//Functions
const setDefaultGrid = () => {
  setGridSize(defaultGrid);
};

const setGridSize = num => {
  const gridSize = grid.style.gridTemplateColumns = `repeat(${num}, 1fr)`;
  createBlocks(num);
}

const randomColor = (e) => {
  const random = () => Math.floor(Math.random() * 255);
  const color = `rgb(${random()}, ${random()}, ${random()})`;
  e.target.style.backgroundColor = color;
}

const createBlocks = gridSize => {
  for (let i=0; i < (gridSize * gridSize); i++) {
    const div = document.createElement('div');
    div.addEventListener('mouseover', randomColor);
    grid.appendChild(div);
  };
}

const resetGridColor = () => {
  console.log(gridDiv.length);
  // gridDiv.map(div => div.style.backgroundColor = rgb(255, 252, 252));
};

//Event Listeners
resetBtn.addEventListener('click', resetGridColor);
window.addEventListener('load', setDefaultGrid);