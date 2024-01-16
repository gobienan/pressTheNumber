import "./style.css";
import { setupGrid, updateGrid } from "./grid.js";
import { setupScore, updateScore, getScore } from "./score.js"; // Import score-related functions.
import { setupLevel, updateLevel, getLevel } from "./level.js"; // Import level-related functions.
import { generateNumbersToPress } from "./numberGenerator.js"; // Import the generateNumbersToPress function.
import { calculateComboMultiplier, updateCombo } from "./combo.js"; // Import the calculateComboMultiplier function.

document.querySelector("#app").innerHTML = `
  <div>
    <h3>Press the Number</h3>
    <div class="grid"></div>
    <br />
    <div class="score">Score: <span class="score__value"></span></div>
    <div class="combo">Combo: <span class="combo__value">-</span></div>
    <div class="level">Level: <span class="level__value"></span></div>
  </div>
`;

const grid = document.querySelector(".grid");
const scoreContainer = document.querySelector(".score");
const levelContainer = document.querySelector(".level");
const comboContainer = document.querySelector(".combo");

const currentLevel = getLevel();
let streak = 0;
let numbersToPress = generateNumbersToPress();

console.log({ numbersToPress });
function handleNumberPress(number) {
  console.log("handleNumberPress", { numbersToPress });
  const isNumberInArray = numbersToPress.findIndex((n) => n === number);
  if (isNumberInArray !== -1) {
    streak++;
    const comboMultiplier = calculateComboMultiplier(streak); // Calculate combo multiplier.
    const score = updateScore(10 * comboMultiplier); // Update score.
    numbersToPress.splice(isNumberInArray, 1);
    updateLevel(score);
    updateGrid(numbersToPress);
    updateCombo(streak); // Update the combo display.
  } else {
    streak = 0;
    updateGrid(numbersToPress, number);
    updateScore(-5);
    updateCombo(streak); // Update the combo display.
  }

  if (numbersToPress.length === 0) {
    numbersToPress = generateNumbersToPress();
    updateGrid(numbersToPress);
  }
}

setupScore(scoreContainer, 100); // Set up the score display.
setupLevel(levelContainer, 2); // Set up the level display.

console.log(`Current Level: ${currentLevel}`);
setupGrid(grid, handleNumberPress);
updateGrid(numbersToPress);
