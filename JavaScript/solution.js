const data = require("fs").readFileSync(0, "utf8").trim().split(/\s+/);
let pos = 0;
const scanf = () => data[pos++];

const n = Number(scanf());

const numbers = new Int32Array(n);
for (let i = 0; i < n; i++) {
  numbers[i] = i + 1;
}

const keep = (move, position) => {
  if (move === 0) return position % 2 === 1;
  if (move === 1) return position % 2 === 0;
  return position % 3 !== 0;
};

let length = n;
let move = 0;
while (length > 1) {
  let write = 0;
  for (let read = 0; read < length; read++) {
    if (keep(move, read + 1)) {
      numbers[write] = numbers[read];
      write++;
    }
  }
  length = write;
  move = (move + 1) % 3;
}

console.log(numbers[0]);

console.log(numbers[0]);
