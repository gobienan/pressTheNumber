import anime from "animejs";

const numpadOrder = [7, 8, 9, 4, 5, 6, 1, 2, 3];
export function setupGrid(element, callback = () => {}) {
  const elements = Array.from({ length: 9 }, () => document.createElement("button"));

  elements.forEach((button, index) => {
    const number = numpadOrder[index];
    const span = document.createElement("span");
    span.classList.add("tile__number");
    span.textContent = number;
    button.append(span);

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
    tile.classList.remove("tile--correct");
  });

  if (numberPressed) {
    const tile = tiles[numpadOrder.indexOf(numberPressed)];
    console.log({ numberPressed, numberToPress, tile });
    if (numberToPress.includes(numberPressed)) {
      // tile.classList.add("tile--correct");
    } else {
      tile.classList.add("tile--incorrect");
    }
  }

  numberToPress.forEach((number) => {
    const tile = tiles[numpadOrder.indexOf(number)];
    tile.classList.add("tile--active");
  });
}
