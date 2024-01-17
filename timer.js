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

      timeLeft--;
    }
  }, 1000); // Update the timer every second.
}

export function resetTimer(timerContainer) {
  const timerValue = timerContainer.querySelector(".Timer__value");
  const timerProgress = timerContainer.querySelector(".Timer__progress");

  timerProgress.style.width = "100%"; // Reset the progress bar width.
  timerValue.textContent = "";
}
