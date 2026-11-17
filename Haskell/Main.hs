removeEven :: [Int] -> [Int]
removeEven (x : _ : rest) = x : removeEven rest
removeEven rest = rest

main :: IO ()
main = do
  line <- getLine
  let n = read line :: Int
  print (removeEven [1 .. n])