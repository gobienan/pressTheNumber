// Import necessary modules and functions
import "./style.css";
import { setupGrid, updateGrid } from "./grid.js";
import { setupScore, updateScore } from "./score.js";
import { generateNumbersToPress } from "./numberGenerator.js";

// Get the app container
const appContainer = document.querySelector("#app");

// Set up the initial HTML structure
appContainer.innerHTML = `
  <div>
    <h3>Press the Number</h3>
    <div class="grid"></div>
    <br />
    <div class="score">Score: <span class="score__value"></span></div>
  </div>
`;

// DOM elements
const gridContainer = appContainer.querySelector(".grid");
const scoreContainer = appContainer.querySelector(".score");

// Variables
let numbersToPress = generateNumbersToPress();

// Function to handle number press
function handleNumberPress(number) {
  const isNumberInArray = numbersToPress.findIndex((n) => n === number);

  if (isNumberInArray !== -1) {
    updateScore(10);
    numbersToPress.splice(isNumberInArray, 1);
    updateGrid(numbersToPress);
  } else {
    updateGrid(numbersToPress, number);
    updateScore(-5);
  }

  if (numbersToPress.length === 0) {
    numbersToPress = generateNumbersToPress();
    updateGrid(numbersToPress);
  }
}

// Initialize the game
function initializeGame() {
  setupScore(scoreContainer, 0);
  setupGrid(gridContainer, handleNumberPress);
  updateGrid(numbersToPress);
}

// Start the game
initializeGame();
