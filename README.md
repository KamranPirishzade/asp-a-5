# What is left? (e-olymp 1964)

Kamran Pirishzada - CSCI 6221 Advanced Software Paradigms, Assignment 5

The task is to start with numbers from 1 to n and repeat three moves until only one number is left. First, remove numbers at even positions, then at odd positions, and finally at positions divisible by 3. After each move, positions start counting from 1 again.

I solved this problem using two languages: JavaScript (imperative) and Haskell (functional).

## How to run

```bash
echo 10 | node JavaScript/solution.js
echo 10 | runghc Haskell/Main.hs
```

Both programs print `3`. You need Node.js and GHC (which includes `runghc`).

## JavaScript (imperative)

In JavaScript, I used one Int32Array to store all numbers. I change the same array instead of creating a new one after every move.

I use two indexes:

- `read` goes through the current array.
- `write` shows where the next number should be placed if it stays.

If a number should stay, I copy it to the `write` position and move `write` forward. After finishing the move, `write` becomes the new array length. The `keep(move, position)` function decides which numbers should stay.

I chose this approach mainly for two reasons:

- **Memory:** For n = 10^8, the array already takes around 400 MB. Creating another array would need even more memory and could exceed the 512 MB limit.
- **Performance:** I did not use `splice()` to remove numbers one by one, because it shifts the remaining elements every time and becomes slow for large arrays.

At first I wrote a separate loop for each of the three moves. The three loops were the same except for one condition, so I refactored them into one loop with the `keep` function.

## Haskell (functional)

In Haskell, I used functions and recursion instead of changing the list with loops. Each move takes a list and returns a new one.

I used pattern matching to process the list in groups:

- `removeEven (x : _ : rest) = x : removeEven rest` keeps the first number and skips the second.
- `removeOdd (_ : y : rest) = y : removeOdd rest` skips the first and keeps the second.
- `removeThird (x : y : _ : rest) = x : y : removeThird rest` keeps two numbers and skips the third.

The `play` function controls the moves. It applies the current move and calls itself with the next one. The recursive call is the last thing it does, so it is tail recursive. When only one number is left, `play _ [x] = x` stops the recursion and returns that number.

## Comparison

|                  | JavaScript                 | Haskell                           |
| ---------------- | -------------------------- | --------------------------------- |
| Data             | One array changed in place | New lists are returned            |
| Repetition       | `while` and `for` loops    | Recursion                         |
| Choosing numbers | `if` and `%`               | Pattern matching                  |
| Move counter     | Variable that changes      | Parameter passed to the next call |

The main difference I noticed is that in JavaScript I control how the array changes step by step. In Haskell, I write functions for each move and return the new list instead of changing the old one.

Both solutions do the same job, but the way I write and process the data is quite different.

## Results

### e-olymp

Both solutions got 100%. Here are the highest time and memory values from the 40 tests:

|                | JavaScript         | Haskell             |
| -------------- | ------------------ | ------------------- |
| Score          | 100 / 100          | 100 / 100           |
| Max time       | 879 ms             | 1,390 ms            |
| Max memory     | 425.4 MB           | 4.1 MB              |
| Smallest tests | about 56 ms, 40 MB | about 10 ms, 1.6 MB |

Even the smallest JavaScript tests use around 40 MB, because Node.js needs this memory to start before my code does anything. Haskell uses much less memory at startup.

### My measurements

e-olymp does not show the input size of each test, so I tested both programs on my Mac (Apple M5) with the same inputs, using `/usr/bin/time -l`. The Haskell program was compiled with `ghc -O2`.

| n           | JavaScript time | JavaScript memory | Haskell time | Haskell memory |
| ----------- | --------------- | ----------------- | ------------ | -------------- |
| 1,000,000   | 0.04 s          | 54 MB             | 0.45 s\*     | 12 MB          |
| 10,000,000  | 0.07 s          | 89 MB             | 0.06 s       | 12 MB          |
| 100,000,000 | 0.36 s          | 433 MB            | 0.51 s       | 12 MB          |

\* This was the first start of the new Haskell program, so macOS had to check it first. Its actual CPU time was only 0.01 s.

The biggest difference is memory. JavaScript needs more memory as n grows, because it stores all the numbers in an array. Haskell stayed at around 12 MB in all three tests.

### Why both solutions got 100%

The task said that I might not get 100%, so I tried some slower versions to understand why my solutions pass.

**JavaScript with `splice`.** First, I tried removing numbers one by one using `splice`:

| n           | With `splice` | My solution |
| ----------- | ------------- | ----------- |
| 100,000     | 0.31 s        | instant     |
| 200,000     | 1.20 s        | instant     |
| 400,000     | 4.51 s        | instant     |
| 100,000,000 | -             | 0.36 s      |

Every time n doubles, the `splice` version takes about four times longer, because removing an element shifts all the elements after it. With only 400,000 numbers it was already close to the 5-second limit, so it would not work for 10^8 numbers.

**Haskell with `length`.** I changed one line in my Haskell solution: instead of the pattern `play _ [x] = x`, I checked `length numbers == 1`:

| n           | With `length`                  | My solution |
| ----------- | ------------------------------ | ----------- |
| 1,000,000   | 84 MB                          | 12 MB       |
| 10,000,000  | 816 MB (over the 512 MB limit) | 12 MB       |
| 100,000,000 | -                              | 12 MB       |

My version uses so little memory because of lazy evaluation. `[1 .. n]` does not create the whole list at once. Numbers are produced when they are needed, and removed numbers do not stay in memory. The pattern `[x]` only checks whether exactly one element is left, without counting the whole list. But `length` has to go through every element, so much more of the list is kept in memory.

## Critique

- **JavaScript uses most of the available memory.** The largest e-olymp test used 425 MB of the 512 MB limit, so my approach would become a problem for a much bigger input.
- **Haskell memory usage is not obvious from the code.** The version with `length` looks almost the same as mine, but it uses much more memory. I learned that in Haskell I also need to think about when values are evaluated, not only what the code returns.
