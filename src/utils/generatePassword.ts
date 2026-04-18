const LIMIT = 20;

function getPercent(percent: number): number {
  return Math.round(LIMIT * (percent / 100));
}

function shuffle(array: string[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}

const specialChars = [
  "!",
  "@",
  "#",
  "$",
  "%",
  "^",
  "&",
  "*",
  "(",
  ")",
  "_",
  "+",
  "{",
  "}",
  "[",
  "]",
  ":",
  ";",
  "<",
  ">",
  ",",
  ".",
  "?",
  "/",
  "|",
  "~",
];

const uppercase = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

const lowercase = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

export function generatePassword(): string {
  const finalArray: string[] = [];

  for (let i = 0; i < getPercent(35); i++) {
    const idx = Math.round(Math.random() * specialChars.length);
    finalArray.push(specialChars[idx >= specialChars.length ? idx - 1 : idx]);
  }

  for (let i = 0; i < getPercent(25); i++) {
    const idx = Math.round(Math.random() * uppercase.length);
    finalArray.push(uppercase[idx >= uppercase.length ? idx - 1 : idx]);
  }

  for (let i = 0; i < getPercent(25); i++) {
    const idx = Math.round(Math.random() * lowercase.length);
    finalArray.push(lowercase[idx >= lowercase.length ? idx - 1 : idx]);
  }

  for (let i = 0; i < getPercent(15); i++) {
    const idx = Math.round(Math.random() * numbers.length);
    finalArray.push(numbers[idx >= numbers.length ? idx - 1 : idx]);
  }

  const shuffledArray = shuffle(finalArray);

  return shuffledArray.join("");
}
