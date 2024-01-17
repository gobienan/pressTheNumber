// numberGenerator.js

import { getLevel } from "./level.js";

// Function to generate numbers to press
export function generateNumbersToPress() {
  const currentLevel = getLevel();
  const numbers = [];
  const numbersToPressPerLevel = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const numbersCount = numbersToPressPerLevel[currentLevel - 1];

  while (numbers.length < numbersCount) {
    const number = Math.floor(Math.random() * 9) + 1;
    if (!numbers.includes(number)) {
      numbers.push(number);
    }
  }

  return numbers;
}