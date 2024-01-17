// timer.js

export function startTimer(timerContainer, totalTimeInSeconds, callback) {
  let timeLeft = totalTimeInSeconds - 1;
  const timerProgress = timerContainer.querySelector(".Timer__progress");

  const intervalId = setInterval(() => {
    const percentage = (timeLeft / totalTimeInSeconds) * 100;
    timerProgress.style.width = `${percentage}%`;
    if (timeLeft < 0) {
      clearInterval(intervalId);
      callback();
    }
    timeLeft--;
  }, 1000);

  return intervalId;
}

export function resetTimer(timerContainer) {
  const timerProgress = timerContainer.querySelector(".Timer__progress");
  timerProgress.style.width = "100%";
}
