const data = require("fs").readFileSync(0, "utf8").trim().split(/\s+/);
let pos = 0;
const scanf = () => data[pos++];

const n = Number(scanf());

const numbers = new Int32Array(n);
for (let i = 0; i < n; i++) {
  numbers[i] = i + 1;
}

let length = n;
let move = 0;

while (length > 1) {
  let write = 0;

  if (move === 0) {
    for (let read = 0; read < length; read++) {
      const position = read + 1;
      if (position % 2 === 1) {
        numbers[write] = numbers[read];
        write++;
      }
    }
  } else if (move === 1) {
    for (let read = 0; read < length; read++) {
      const position = read + 1;
      if (position % 2 === 0) {
        numbers[write] = numbers[read];
        write++;
      }
    }
  } else {
    for (let read = 0; read < length; read++) {
      const position = read + 1;
      if (position % 3 !== 0) {
        numbers[write] = numbers[read];
        write++;
      }
    }
  }

  length = write;
  move = (move + 1) % 3;
}

console.log(numbers[0]);
