const numpadOrder = [7, 8, 9, 4, 5, 6, 1, 2, 3];
export function setupGrid(element, callback = () => {}) {
  const elements = Array.from({ length: 9 }, () => document.createElement("button"));

  elements.forEach((button, index) => {
    const number = numpadOrder[index];
    button.textContent = number;
    button.classList.add("tile");

    button.addEventListener("click", () => {
      console.log("You clicked", number);
      callback(number);
    });
  });

  document.addEventListener("keydown", (event) => {
    const number = Number(event.key);
    if (number >= 1 && number <= 9) {
      console.log("You pressed", number);
      callback(number);
    }
  });

  element.append(...elements);
}

export function updateGrid(numberToPress, numberPressed) {
  const tiles = document.querySelectorAll(".tile");
  tiles.forEach((tile) => {
    tile.classList.remove("tile--incorrect");
    tile.classList.remove("tile--active");
  });

  numberToPress.forEach((number) => {
    const tile = tiles[numpadOrder.indexOf(number)];
    tile.classList.add("tile--active");
  });

  if (numberPressed) {
    const tile = tiles[numpadOrder.indexOf(numberPressed)];
    if (numberToPress.includes(numberPressed)) {
      tile.classList.add("tile--correct");
    } else {
      tile.classList.add("tile--incorrect");
    }
  }
}
