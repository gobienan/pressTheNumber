import "./style.css";
import { setupGrid, updateGrid } from "./grid.js";
import { setupScore, updateScore, getScore } from "./score.js"; // Import score-related functions.
import { setupLevel, updateLevel, getLevel } from "./level.js"; // Import level-related functions.
import { generateNumbersToPress } from "./numberGenerator.js"; // Import the generateNumbersToPress function.
import { calculateComboMultiplier, updateCombo } from "./combo.js"; // Import the calculateComboMultiplier function.
import { startTimer, resetTimer } from "./timer.js"; // Import the timer functions.

document.querySelector("#app").innerHTML = `
  <div>
    <h3>Press the Number</h3>
    <div class="Timer">
        <div class="Timer__progress"></div>
        <span class="Timer__value"></span>
      </div>
    <div class="grid"></div>
    <br />
    <div class="score">Score: <span class="score__value"></span></div>
    <div class="combo">Combo: <span class="combo__value">-</span></div>
    <div class="level">Level: <span class="level__value"></span></div>

  </div>
`;
const isVibrationSupported = "vibrate" in navigator;

const grid = document.querySelector(".grid");
const scoreContainer = document.querySelector(".score");
const levelContainer = document.querySelector(".level");
const comboContainer = document.querySelector(".combo");
const timerContainer = document.querySelector(".Timer");

let streak = 0;
let numbersToPress = generateNumbersToPress();
const totalTimeInSeconds = 30; // Set the total time in seconds for the timer.

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
    updateCombo(comboContainer, streak); // Update the combo display.
    if (isVibrationSupported) {
      navigator.vibrate(200);
    }
  } else {
    streak = 0;
    updateGrid(numbersToPress, number);
    updateScore(-5);
    updateCombo(comboContainer, streak); // Update the combo display.
  }

  if (numbersToPress.length === 0) {
    numbersToPress = generateNumbersToPress();
    updateGrid(numbersToPress);
  }
}

function onTimerEnd() {
  console.log("Timer has ended!");
  const score = getScore();

  const restart = confirm(`Game over! Your score is ${score}! Restart?`);
  if (restart) {
    resetTimer(timerContainer);
    updateScore(0);
    updateLevel(0);
    updateGrid(numbersToPress);
    streak = 0;
    startTimer(timerContainer, totalTimeInSeconds, onTimerEnd);
  } else {
    console.log("Game ended!");
    updateLevel(0);
    updateScore(0);
    resetTimer(timerContainer);
    streak = 0;
    numbersToPress = generateNumbersToPress();
    updateGrid(numbersToPress);
  }
}

setupScore(scoreContainer, 0); // Set up the score display.
setupLevel(levelContainer, 1); // Set up the level display.

setupGrid(grid, handleNumberPress);
updateGrid(numbersToPress);
startTimer(timerContainer, totalTimeInSeconds, onTimerEnd);
