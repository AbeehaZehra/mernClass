function factorial(n) {
    if ((n === 0) || (n === 1))
      return 1;
    else
      return (n * factorial(n - 1));
  }

  function numSquare(num){
        return num*num;
  }
  console.log(factorial(5));
  module.exports = {
      factorial,
      numSquare
  }