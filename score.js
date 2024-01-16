// score.js

export let currentScore = 0; // Initialize the current score.
let scoreUpdateCallback = () => {}; // Callback function to update the score display.

export function setupScore(element, initialScore = 0) {
  // Create a span element for displaying the score.
  const scoreValueElement = document.createElement("span");
  scoreValueElement.textContent = initialScore;

  // Append the score element to the provided container.
  element.appendChild(scoreValueElement);

  // Update the current score and callback function.
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
