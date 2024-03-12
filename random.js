// function basicCallback(callback, num) {
//   setTimeout(() => {
//     callback(num)
//   }, 2000)
// }

// function downloadFile(callback) {
//   console.log('Downloading file...');
//   setTimeout(() => {
//     callback('Download complete!')
//   }, 1500)
// }

// function processData(arr, callback) {
//   setTimeout(() => {
//     let newArr = arr.map(num => callback(num))
//     console.log(newArr)
//   }, 1000)
// }

// function waterfallOverCallbacks(arr, num) {
//   arr.forEach(callback => {
//     num = callback(num)
//   })
//   console.log(num)
// }




function startCounter(callback) {
  let bool = false
  n = 1

  let newFunc = function(num) {
    return () => {
      bool = callback(num)
    }
  }
  
  let int = setInterval(newFunc(n), 1000)

  while (!bool) {
    n += 1
  }

  if (bool) clearInterval(int)
} 


// // basicCallback((number) => {
// //   console.log(number * 2);
// // }, 5);

// //processData([1, 2, 3], (number) => number * 2);
// // const double = (x) => x * 2;
// // waterfallOverCallbacks([double, double, double], 1);

startCounter((count) => {
  console.log(count);
  return count === 5;
});


// function someClosure(num) {
//   setTimeout(() => {
//     console.log(num)
//   }, num * 1000)
// }

// function delayLog() {
// num = 0 
// while (num < 5) {
//   someClosure(num)
//   num += 1
// }
// }
// delayLog()



