// combo.js

let element = null;
export function calculateComboMultiplier(el, streak) {
  element = el;
  const MULTIPLIERS = [1, 1.1, 1.2, 1.3, 1.4, 1.5];
  return MULTIPLIERS[streak - 1] || 1;
}

export function updateCombo(streak) {
  const comboContainer = element.querySelector(".combo__value");
  comboContainer.textContent = streak;
}
