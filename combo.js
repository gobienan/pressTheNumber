export function calculateComboMultiplier(streak) {
  const multiplier = [1, 1.1, 1.2, 1.3, 1.4, 1.5];
  return multiplier[streak - 1] || 1;
}

export function updateCombo(streak) {
  const comboContainer = document.querySelector(".combo__value");
  comboContainer.textContent = streak;
}
