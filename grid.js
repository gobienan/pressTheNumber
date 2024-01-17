// grid.js

// Constants for better readability
const NUMPAD_ORDER = [7, 8, 9, 4, 5, 6, 1, 2, 3];

// Function to set up the number grid
export function setupGrid(element, callback = () => {}) {
  const elements = Array.from({ length: 9 }, () => createGridButton());

  const handleKeyDown = (event) => {
    const number = Number(event.key);
    if (number >= 1 && number <= 9) {
      callback(number);
    }
  };

  const handleButtonClick = (number) => {
    callback(number);
  };

  elements.forEach((button, index) => {
    const number = NUMPAD_ORDER[index];
    button.textContent = number;
    button.addEventListener("click", () => handleButtonClick(number));
  });

  document.addEventListener("keydown", handleKeyDown);

  element.append(...elements);
}

function createGridButton() {
  const button = document.createElement("button");
  button.classList.add("tile");
  return button;
}

// Function to update the grid based on user input
export function updateGrid(numberToPress, numberPressed) {
  const tiles = document.querySelectorAll(".tile");
  tiles.forEach((tile) => {
    tile.classList.remove("tile--incorrect");
    tile.classList.remove("tile--active");
  });

  if (numberPressed) {
    const tile = tiles[NUMPAD_ORDER.indexOf(numberPressed)];
    if (numberToPress.includes(numberPressed)) {
    } else {
      tile.classList.add("tile--incorrect");
    }
  }

  numberToPress.forEach((number) => {
    const tile = tiles[NUMPAD_ORDER.indexOf(number)];
    tile.classList.add("tile--active");
  });
}
