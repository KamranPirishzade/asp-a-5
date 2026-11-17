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
