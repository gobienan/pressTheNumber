// score.js

export let currentScore = 0;
let scoreUpdateCallback = () => {};

export function setupScore(element, initialScore = 0) {
  const scoreValueElement = document.createElement("span");
  scoreValueElement.textContent = initialScore;
  element.appendChild(scoreValueElement);
  currentScore = initialScore;
  scoreUpdateCallback = (newScore) => {
    scoreValueElement.textContent = newScore;
  };
}

export function updateScore(scoreChange) {
  currentScore += scoreChange;
  scoreUpdateCallback(currentScore);
  return currentScore;
}

export function getScore() {
  return currentScore;
}