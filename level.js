// level.js
import nextLevel from '/next-level.mp3';

export let currentLevel = 1;
let levelUpdateCallback = () => {};

const SCORE_THRESHOLDS = [0, 100, 200, 300, 400, 500, 600, 700, 800, 900];

export function setupLevel(element, initialLevel = 1) {
  const levelValueElement = document.createElement("span");
  levelValueElement.textContent = initialLevel;
  element.appendChild(levelValueElement);
  currentLevel = initialLevel;
  levelUpdateCallback = (newLevel) => {
    levelValueElement.textContent = newLevel;
  };
}

export function updateLevel(score) {
  for (let i = SCORE_THRESHOLDS.length - 1; i >= 0; i--) {
    if (score >= SCORE_THRESHOLDS[i]) {
      if (currentLevel !== i + 1 && currentLevel < SCORE_THRESHOLDS.length) {
        const audio = new Audio(nextLevel);
        audio.volume = 0.2;
        audio.play();
        currentLevel = i + 1;
        levelUpdateCallback(currentLevel);
      }
      break;
    }
  }
}

export function getLevel() {
  return currentLevel;
}
