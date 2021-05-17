//DOM Elements
const grid = document.querySelector('.grid-container');
const gridDiv = document.querySelectorAll('.grid-div');
const resetBtn = document.getElementById('reset');
const slider = document.getElementById("myRange");
const output = document.querySelector('.output');
output.textContent = slider.value;


//Global variables
let div;

//Functions
const setDefaultGrid = () => {
  const defaultGrid = 16; //Max size 64.
  setGridSize(defaultGrid);
};

const setGridSize = num => { 
  clearGrid()
  grid.style.gridTemplateColumns = `repeat(${num}, 1fr)`;
  createBlocks(num);
}

const addColor = (e) => {
  const random = () => Math.floor(Math.random() * 255);
  const color = `rgb(${random()}, ${random()}, ${random()})`;
  if (!e.target.style.backgroundColor) { 
  e.target.style.backgroundColor = color;
  } else {
    rgb = e.target.style.backgroundColor;
    e.target.style.backgroundColor = darkenByTenth(rgb);
  }
};

function getLowestMiddleHighest(rgbIntArray) {
  let highest = {val:-1,index:-1};
  let lowest = {val:Infinity,index:-1};

  rgbIntArray.map((val,index)=>{
    if(val>highest.val){
      highest = {val:val,index:index};
    }
    if(val<lowest.val){
      lowest = {val:val,index:index};
    }
  });

  if(lowest.index===highest.index){
    lowest.index=highest.index+1;
  }
  
  let middle = {index: (3 - highest.index - lowest.index)};
  middle.val = rgbIntArray[middle.index];
  return [lowest,middle,highest];
}

function darkenByTenth(rgb) {
  
  const rgbIntArray = rgb.replace(/ /g, '').slice(4, -1).split(',').map(e => parseInt(e));
  const [lowest,middle,highest] = getLowestMiddleHighest(rgbIntArray);
  
  if(highest.val===0){
    return rgb;
  }

  const returnArray = [];

  returnArray[highest.index] = highest.val-(Math.min(highest.val,25.5));
  const decreaseFraction  =(highest.val-returnArray[highest.index])/ (highest.val);
  returnArray[middle.index]= middle.val -middle.val*decreaseFraction; 
  returnArray[lowest.index]= lowest.val -lowest.val*decreaseFraction;              
                            
  return (`rgb(${returnArray.join()}) `);
}

const createBlocks = num => {
  for (let i=0; i < (num * num); i++) {
    div = document.createElement('div');
    div.addEventListener('mouseover', addColor);
    grid.appendChild(div);
  };
}

const clearGrid = () => {
  const gridElements = [...grid.childNodes];
  gridElements.forEach(element => element.remove());
};

const resetGridColor = (e) => {
  const gridElements = [...grid.childNodes];
  gridElements.forEach(element => element.style.backgroundColor = 'rgb(255, 252, 252)');
};


//Event Listeners

slider.addEventListener('input', function() {
  setGridSize(this.value);
  output.textContent = this.value;
  return output;
});

resetBtn.addEventListener('click', resetGridColor);
resetBtn.addEventListener('click', function() {
  setGridSize(output.textContent);
});
window.addEventListener('load', setDefaultGrid);