const data = require("fs").readFileSync(0, "utf8").trim().split(/\s+/);
let pos = 0;
const scanf = () => data[pos++];

const n = Number(scanf());

const numbers = new Int32Array(n);
for (let i = 0; i < n; i++) {
  numbers[i] = i + 1;
}

let length = n;
let write = 0;
for (let read = 0; read < length; read++) {
  const position = read + 1;
  if (position % 2 === 1) {
    numbers[write] = numbers[read];
    write++;
  }
}
length = write;

write = 0;
for (let read = 0; read < length; read++) {
  const position = read + 1;
  if (position % 2 === 0) {
    numbers[write] = numbers[read];
    write++;
  }
}
length = write;

console.log(numbers.subarray(0, length).join(" "));
