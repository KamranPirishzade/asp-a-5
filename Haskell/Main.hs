removeEven :: [Int] -> [Int]
removeEven (x : _ : rest) = x : removeEven rest
removeEven rest = rest

removeOdd :: [Int] -> [Int]
removeOdd (_ : y : rest) = y : removeOdd rest
removeOdd _ = []

main :: IO ()
main = do
  line <- getLine
  let n = read line :: Int
  print (removeOdd (removeEven [1 .. n]))