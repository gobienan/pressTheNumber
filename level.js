// level.js

export let currentLevel = 1; // Initialize the current level.
let levelUpdateCallback = () => {}; // Callback function to update the level display.

// Define an array of score thresholds for each level.
const scoreThresholds = [0, 100, 200, 300, 400, 500, 600, 700, 800, 900];

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

    switch (newLevel) {
      case 1:
        document.body.style.backgroundColor = "#87ceeb";
        break;
      case 2:
        document.body.style.backgroundColor = "#8a2be2";
        break;
      case 3:
        document.body.style.backgroundColor = "ff69b4";
        break;
      case 4:
        document.body.style.backgroundColor = "#ff00ff";
        break;
      case 5:
        document.body.style.backgroundColor = "#ee82ee";
        break;
      case 6:
        document.body.style.backgroundColor = "#ff69b4";
        break;
      case 7:
        document.body.style.backgroundColor = "#ffa500";
        break;
      case 8:
        document.body.style.backgroundColor = "#ffd700";
        break;
      case 9:
        document.body.style.backgroundColor = "#008080";
        break;
      default:
        document.body.style.backgroundColor = "#008080";
    }
  };
}

export function updateLevel(score) {
  // Check the score thresholds to determine the new level.
  for (let i = scoreThresholds.length - 1; i >= 0; i--) {
    if (score >= scoreThresholds[i]) {
      if (currentLevel !== i + 1 && currentLevel < 9) {
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
