removeEven :: [Int] -> [Int]
removeEven (x : _ : rest) = x : removeEven rest
removeEven rest = rest

removeOdd :: [Int] -> [Int]
removeOdd (_ : y : rest) = y : removeOdd rest
removeOdd _ = []

removeThird :: [Int] -> [Int]
removeThird (x : y : _ : rest) = x : y : removeThird rest
removeThird rest = rest

play :: Int -> [Int] -> Int
play _ [x] = x
play 0 numbers = play 1 (removeEven numbers)
play 1 numbers = play 2 (removeOdd numbers)
play _ numbers = play 0 (removeThird numbers)

main :: IO ()
main = do
  line <- getLine
  let n = read line :: Int
  print (play 0 [1 .. n])