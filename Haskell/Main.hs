main :: IO ()
main = do
  line <- getLine
  let n = read line :: Int
  print [1 .. n]