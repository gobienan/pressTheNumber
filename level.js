// level.js

export let currentLevel = 1; // Initialize the current level.
let levelUpdateCallback = () => {}; // Callback function to update the level display.

// Define an array of score thresholds for each level.
const scoreThresholds = [0, 100, 200, 300, 400, 500]; // Example thresholds.

export function setupLevel(element, initialLevel = 1) {
  // Create a span element for displaying the level.
  const levelValueElement = document.createElement("span");
  levelValueElement.textContent = initialLevel;

  // Append the level element to the provided container.
  element.appendChild(levelValueElement);

  // Update the current level and callback function.
  currentLevel = initialLevel;
  levelUpdateCallback = (newLevel) => {
    levelValueElement.textContent = newLevel;
  };
}

export function updateLevel(score) {
  // Check the score thresholds to determine the new level.
  for (let i = scoreThresholds.length - 1; i >= 0; i--) {
    if (score >= scoreThresholds[i]) {
      if (currentLevel !== i + 1) {
        currentLevel = i + 1;
        levelUpdateCallback(currentLevel); // Update the displayed level.
      }
      break;
    }
  }
}

export function getLevel() {
  return currentLevel;
}
