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


