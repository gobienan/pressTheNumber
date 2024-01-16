// timer.js

export function startTimer(timerContainer, totalTimeInSeconds, callback) {
  let timeLeft = totalTimeInSeconds;
  const timerValue = timerContainer.querySelector(".Timer__value");
  const timerProgress = timerContainer.querySelector(".Timer__progress");

  const intervalId = setInterval(() => {
    if (timeLeft <= 0) {
      clearInterval(intervalId);
      callback(); // Execute the callback function when the timer reaches 0.
    } else {
      const percentage = (timeLeft / totalTimeInSeconds) * 100;
      timerProgress.style.width = `${percentage}%`; // Update the progress bar width.
      timerValue.textContent = `${timeLeft} s`;

      // Change the background color based on the remaining time.
      if (percentage <= 75 && percentage > 50) {
        timerProgress.style.backgroundColor = "#ffeb3b"; // Yellow
      } else if (percentage <= 50 && percentage > 25) {
        timerProgress.style.backgroundColor = "#ff9800"; // Orange
      } else if (percentage <= 25) {
        timerProgress.style.backgroundColor = "#f44336"; // Red
      }

      timeLeft--;
    }
  }, 1000); // Update the timer every second.
}

export function resetTimer(timerContainer) {
  const timerValue = timerContainer.querySelector(".Timer__value");
  const timerProgress = timerContainer.querySelector(".Timer__progress");

  timerProgress.style.width = "100%"; // Reset the progress bar width.
  timerProgress.style.backgroundColor = "#4caf50"; // Reset the background color to green.
  timerValue.textContent = "";
}
