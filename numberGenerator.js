// numberGenerator.js

import { getLevel } from "./level.js"; // Import the getLevel function from the level.js file.
export function generateNumbersToPress() {
  const currentLevel = getLevel(); // Get the current level.
  const numbers = [];
  // Define the number of numbers to press for each level.
  const numbersToPressPerLevel = [1, 2, 3, 4, 5, 6, 7, 8, 9]; // Adjust as needed.

  // Use the current level to determine the number of numbers to press.
  const numbersCount = numbersToPressPerLevel[currentLevel - 1];

  // Generate a random number within the specified range.
  for (let i = 0; i < numbersCount; i++) {
    const number = Math.floor(Math.random() * 9) + 1;
    if (!numbers.includes(number)) {
      numbers.push(number);
    } else {
      i--;
    }
  }

  return numbers;
}
