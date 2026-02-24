Promises;

// 1. Create a Custom Promise: Implement a function that returns a promise which resolves after 2 seconds with "Hello World".
function delayedMessage() {
  // your code
}
//Answer:
function delayedMessage() {
  // your code
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Hello World");
    }, 2000);
  });
}

delayedMessage().then((msg) => console.log(msg));

// 2. Convert Callback to Promise: Convert this to a Promise-based function:
function fetchData(callback) {
  setTimeout(() => {
    callback(null, "Data received");
  }, 1000);
}

//Answer:
function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let error = null;
      if (!error) {
        reject(error);
      } else {
        resolve("Data received");
      }
    }, 1000);
  });
}
fetchData()
  .then((msg) => console.log(msg))
  .catch((error) => console.log(error));

// 3. What is the Output?
console.log("Start");

Promise.resolve().then(() => {
  console.log("Promise 1");
});

setTimeout(() => {
  console.log("Timeout");
}, 0);

console.log("End");

// Answer:
// Start
// End
// Promise 1
// Timeout

// 4. Implement Promise.all (Custom Polyfill)
// Write your own version of:
Promise.myAll = function(promises) {
  // your code
}

// Behavior:
// Resolves when all promises resolve
// Rejects immediately if any promise rejects

Promise.myPromiseAll = function (promises) {
    return new Promise((resolve, reject) => {
        if(!Array.isArray(promises)){
            return reject('')
        }
        if(promises.length === 0){
            return resolve([])
        }
        const result = [];
        let completed = 0;
        promises.forEach((promise, index) => {
            Promise.resolve(promise)  //normalize everything into a Promise before calling .then().
            .then((value) => {
                result[index] = value;
                completed++;
                
                if(completed == promises.length){
                    console.log(result)
                    resolve(result)
                }
            })
            .catch(reject)
        })
    })
}

// Promise.resolve(promise) 
// If the value is already a Promise → returns it as is.
// If the value is not a Promise → wraps it in a resolved Promise.
const testFunction = (value) => {
    return value
}
const res = Promise.myPromiseAll([1, Promise.resolve(2), testFunction(1)]).then(value => console.log(value))




// 5. Sequential Execution of Promises

const tasks = [
  () => Promise.resolve("Task 1"),
  () => Promise.resolve("Task 2"),
  () => Promise.resolve("Task 3"),
];

// Execute them one by one (not parallel).

// Expected output:

// Task 1
// Task 2
// Task 3
const tasks = [
  () => new Promise(r => setTimeout(() => r("Task 1"), 1000)),
  () => new Promise(r => setTimeout(() => r("Task 2"), 100)),
  () => Promise.resolve("Task 3"),
];

// using for...of loop
for (const task of tasks) {
    const value = await task();
    console.log(value)
}

//using Promise
tasks.reduce((task, nextTask) => {
    return task.then(() => nextTask())
    .then(value => console.log(value))
}, Promise.resolve())

// 6. Limit Concurrent Promises (Very Common 🔥)

// You have 10 API calls.
// Run only 2 at a time.

// Implement:

function promisePool(tasks, limit) {
  // your code
}

// 7. Implement Retry Logic

// Create a function that retries a promise 3 times before failing.

function retry(fn, retries) {
  // your code
}

// 8. Implement Promise.race (Custom)
Promise.myRace = function(promises) {
  // your code
}

// 9. Debounce API Calls with Promise

// Implement a function where:

// If called multiple times quickly,

// Only last call executes,

// Previous promises are cancelled/rejected.

// Tricky Conceptual Questions (Very Important)

// 1. Difference between:
// Promise.all
// Promise.allSettled
// Promise.race
// Promise.any

// 2. Microtask vs Macrotask queue
// (Very common in Node.js interviews)

// 3. Why does this not catch error?
// try {
//   Promise.reject("Error");
// } catch (e) {
//   console.log("Caught");
// }

// 4. What happens if you don’t return a promise inside .then()?

// 5. Promise vs process.nextTick vs setImmediate
// In Node.js event loop execution order.
