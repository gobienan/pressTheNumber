// Import necessary modules and functions
import "./style.css";
import { setupGrid, updateGrid } from "./grid.js";
import { setupScore, updateScore, getScore } from "./score.js";
import { setupLevel, updateLevel } from "./level.js";
import { generateNumbersToPress } from "./numberGenerator.js";
import { calculateComboMultiplier, updateCombo } from "./combo.js";
import { startTimer, resetTimer } from "./timer.js";
import background from "/background.mp3";
import mouseClick from "/interface.mp3";
import error from "/error.mp3";

// Get the app container
const appContainer = document.querySelector("#app");
let audioIsPlaying = false;
// Set up the initial HTML structure
appContainer.innerHTML = `
  <div>
    <h3>Press the Number</h3>
    <div class="Timer">
      <div class="Timer__progress"></div>
    </div>
    <div class="grid"></div>
    <br />
    <div class="score">Score: <span class="score__value"></span></div>
    <div class="combo">Combo: <span class="combo__value">-</span></div>
    <div class="level">Level: <span class="level__value"></span></div>
  </div>
`;

// DOM elements
const gridContainer = appContainer.querySelector(".grid");
const scoreContainer = appContainer.querySelector(".score");
const levelContainer = appContainer.querySelector(".level");
const comboContainer = appContainer.querySelector(".combo");
const timerContainer = appContainer.querySelector(".Timer");

// Variables
let streak = 0;
let numbersToPress = generateNumbersToPress();
let timer = null;
const gameTime = 30;

// Check if vibration is supported
const isVibrationSupported = "vibrate" in navigator;

// Function to handle number press
function handleNumberPress(number) {
  if (!audioIsPlaying) {
    const audio = new Audio(background);
    audio.volume = 0.2;
    audio.play();
    audioIsPlaying = true;
  }
  const audioCorrect = new Audio(mouseClick);
  const audioError = new Audio(error);
  audioCorrect.volume = 0.05;
  audioError.volume = 0.1;
  if (!timer) {
    timer = startTimer(timerContainer, gameTime, onTimerEnd);
  }

  const isNumberInArray = numbersToPress.findIndex((n) => n === number);

  if (isNumberInArray !== -1) {
    audioCorrect.play();
    streak++;
    const comboMultiplier = calculateComboMultiplier(comboContainer, streak);
    const score = updateScore(10 * comboMultiplier);

    numbersToPress.splice(isNumberInArray, 1);
    updateLevel(score);
    updateGrid(numbersToPress);
    updateCombo(streak);

    if (isVibrationSupported) {
      navigator.vibrate(200);
    }
  } else {
    audioError.play();
    streak = 0;
    updateGrid(numbersToPress, number);
    updateScore(-5);
    updateCombo(streak);
  }

  if (numbersToPress.length === 0) {
    numbersToPress = generateNumbersToPress();
    updateGrid(numbersToPress);
  }
}

// Function to handle timer end
function onTimerEnd() {
  const score = getScore();
  confirm(`Game over! Your score is ${score}! Restart?`);

  clearInterval(timer);
  timer = null;
  resetTimer(timerContainer);
  updateScore(-score);
  updateLevel(1);
  updateCombo(0);
  numbersToPress = generateNumbersToPress();
  updateGrid(numbersToPress);
  streak = 0;
}

// Initialize the game
function initializeGame() {

  setupScore(scoreContainer, 0);
  setupLevel(levelContainer, 1);
  setupGrid(gridContainer, handleNumberPress);
  updateGrid(numbersToPress);
}

// Start the game
initializeGame();
