// timer.js

export function startTimer(timerContainer, totalTimeInSeconds, callback) {
  let timeLeft = totalTimeInSeconds;
  const timerValue = timerContainer.querySelector(".Timer__value");
  const timerProgress = timerContainer.querySelector(".Timer__progress");

  const intervalId = setInterval(() => {
    if (timeLeft <= 0) {
      clearInterval(intervalId);
      callback();
    } else {
      const percentage = (timeLeft / totalTimeInSeconds) * 100;
      timerProgress.style.width = `${percentage}%`;
      timerValue.textContent = `${timeLeft} s`;
      timeLeft--;
    }
  }, 1000);
}

export function resetTimer(timerContainer) {
  const timerValue = timerContainer.querySelector(".Timer__value");
  const timerProgress = timerContainer.querySelector(".Timer__progress");

  timerProgress.style.width = "100%";
  timerValue.textContent = "";
}
