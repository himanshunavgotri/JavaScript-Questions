Event loop:
Since JavaScript is single-threaded, it uses the event loop to manage the execution of multiple tasks without blocking the main thread. The event loop is a mechanism that enables Javascript to handle asynchronous operations. It continously monitors the call stack and the callback queue. When the call stack is empty, the event loop takes the first event from the event queue and pushes it onto the call stack for execution.

Task Queues

There are two major queues:

🟦 1. Macrotask Queue (Callback Queue)
Contains:
1. setTimeout
2. setInterval
3. DOM events
4. setImmediate (Node)
5. I/O callbacks

🟨 2. Microtask Queue (Higher Priority)
Contains:
1. Promise.then
2. Promise.catch
3. Promise.finally
4. queueMicrotask
5. MutationObserver
6. process.nextTick (Node – even higher priority)

Note** ⚡ Microtasks ALWAYS run before macrotasks.

Example: 
console.log("Start");

setTimeout(() => {
  console.log("Timeout");
}, 0);

Promise.resolve().then(() => {
  console.log("Promise");
});

console.log("End");

Start
End
Promise
Timeout
Phases of the Event Loop
The event loop operates in multiple phases.

1. Timers Phase: 
The Timers phase is the first stage in the Node.js event loop cycle, responsible for executing callback functions scheduled by setTimeout() and setInterval(). It defines the minimum time that must elapse before a callback is executed, but does not guarantee it will run exactly at that moment.

Example:
setTimeout(() => {
  console.log("Timer executed");
}, 100);

2. I/O Callbacks Phase: I/O Callbacks phase is the second stage of the Node.js event loop, responsible for executing I/O callbacks that were deferred to the next loop iteration, particularly system-level operations such as TCP errors and certain low-level network callbacks.

Handles I/O operations like file reading, network requests, etc.

3. Prepare Phase: It is Internal phase used by Node.js. It is not accessible directly from user code.

4. Poll Phase (core Phase): The Poll phase is the central stage of the Node.js event loop, responsible for retrieving new I/O events and executing I/O-related callbacks such as file system operations, network requests, and database interactions. It also determines whether the event loop should block and wait for new events.
const fs = require('fs');
fs.readFile('example.txt', () => {
  console.log("File read completed");
});

5. Check Phase: The Check phase is the stage of the Node.js event loop responsible for executing callbacks scheduled by setImmediate(). It runs immediately after the Poll phase completes.
setImmediate(() => {
  console.log("Immediate executed");
});

Close Callbacks Phase: Executes close event callbacks, e.g., socket.on('close').
const net = require('net');

const socket = net.connect(3000);

socket.on('close', () => {
  console.log("Connection closed");
});

Microtasks Execution: After each phase, the event loop processes the microtask queue before moving to the next phase.

------------
Special Priority Queues (Run Between Phases)

These are not official phases but run between every phase transition.

🟡 process.nextTick() Queue: The process.nextTick() queue is a high-priority queue that executes callbacks immediately after the current operation completes, before the event loop continues to the next phase.

Example:
process.nextTick(() => {
  console.log("Next tick executed");
});

🔵 Microtask Queue (Promises): The Microtask Queue is a high-priority queue that executes Promise-related callbacks after the current phase completes and before moving to the next event loop phase.

Executes callbacks scheduled by:
Promise.then()
Promise.catch()
Promise.finally()
queueMicrotask()

Example:
Promise.resolve().then(() => {
  console.log("Promise resolved");
});

=====================================================

Common Issues Related to the Event Loop
1. Blocking the Main Thread
Heavy computations block the event loop, making the app unresponsive.

while(true)
{
    console.log('Blocking...')
}
An infinite while(true) loop continuously runs, blocking the event loop and freezing the browser by preventing any other task from executing.

2. Delayed Execution of setTimeout
setTimeout doesn’t always run exactly after the specified time.

console.log("Start");
setTimeout(() => console.log("Inside setTimeout"), 1000);
for (let i = 0; i < 1e9; i++) {} // Long loop
console.log("End");
The blocking loop delays setTimeout execution because the Call Stack is busy so, this code will also lead to Time Limit Exceed Error or will freeze the Browser.

3. Priority of Microtasks Over Callbacks
Microtasks run before setTimeout, even if set with 0ms delay.

setTimeout(() => console.log("setTimeout"), 0);
Promise.resolve().then(() => console.log("Promise"));
console.log("End");
Explain

The event loop first check's for function in the microtask queue and then in the call back queue always in JavaScript microtask queue is given more priority than the call back queue that's why the functions present in the microtask queue are executed first.

4. Callback Hell
Too many nested callbacks make code unreadable.


setTimeout(() => {
    console.log("Step 1");
    setTimeout(() => {
        console.log("Step 2");
        setTimeout(() => {
            console.log("Step 3");
        }, 1000);
    }, 1000);
}, 1000);
This creates Callback Hell, making it hard to read and maintain. Use Promises or async/await instead.

=========
Example:
1.
process.nextTick(function tick() {
  process.nextTick(tick);
});

Promise.resolve().then(() => {
  console.log("Promise");
});

setTimeout(() => {
  console.log("Timer");
}, 0);
❓ What happens?

✅ Nothing prints.

💡 Why?

process.nextTick() queue runs before microtasks

It drains completely

Since each tick schedules another → infinite loop

Promise and Timer never execute

🔥 This is event loop starvation.



====

2️ Promise Starvation of Timers
function loop() {
  Promise.resolve().then(loop);
}
loop();

setTimeout(() => console.log("Timer"), 0);
❓ What happens?

✅ Timer never executes.

💡 Why?

Microtask queue drains completely

Each microtask schedules another microtask

Event loop never reaches Timers phase

⚠ Promises can also starve macrotasks.


3️ setImmediate Inside Poll vs Outside
const fs = require('fs');

setImmediate(() => console.log("Immediate OUT"));

fs.readFile(__filename, () => {
  setImmediate(() => console.log("Immediate IN"));
});
Possible Output:
Immediate OUT
Immediate IN
Why?

First iteration → Immediate OUT runs in Check phase

File I/O completes in Poll phase

Schedules Immediate IN

Next Check phase → runs

4️ Timer Created During Poll
const fs = require('fs');

fs.readFile(__filename, () => {
  setTimeout(() => console.log("Timer inside I/O"), 0);
});

setImmediate(() => console.log("Immediate"));
Likely Output:
Immediate
Timer inside I/O
Why?

Poll executes I/O callback

setTimeout goes to Timers

Event loop goes to Check phase → runs Immediate

Next cycle → Timers phase → runs timer

5️ Microtasks Inside setImmediate
setImmediate(() => {
  console.log("Immediate");
  Promise.resolve().then(() => console.log("Promise inside Immediate"));
});

setTimeout(() => console.log("Timer"), 0);
Typical Output:
Immediate
Promise inside Immediate
Timer
Why?

Check phase → runs Immediate

After callback → microtasks drain

Then next phase → Timers

6️ process.nextTick Inside Promise
Promise.resolve().then(() => {
  console.log("Promise");
  process.nextTick(() => console.log("NextTick inside Promise"));
});
Output:
Promise
NextTick inside Promise
Why?

Promise runs (microtask phase)

Inside → schedules nextTick

nextTick runs immediately after current microtask finishes

⚠ nextTick always jumps ahead.

7️ Nested Timers with Heavy CPU Block
setTimeout(() => console.log("Timer 1"), 0);

for (let i = 0; i < 1e9; i++) {}

setTimeout(() => console.log("Timer 2"), 0);
Output:
Timer 1
Timer 2
Why?

Both timers expire during blocking

Timers phase runs FIFO

Delay doesn’t matter — only order of registration

🔥 Timers are minimum delay, not precise time.


8️ Multiple setImmediate Scheduled During Poll
const fs = require('fs');

fs.readFile(__filename, () => {
  setImmediate(() => console.log("Immediate 1"));
  setImmediate(() => console.log("Immediate 2"));
});
Output:
Immediate 1
Immediate 2

Why?

Scheduled in same Poll callback

Both enter Check queue

FIFO execution
============================








setImmediate(() => {
  console.log("Immediate");
});

Promise.resolve().then(() => {
  console.log("Promise");
  process.nextTick(() => console.log("NextTick"));
});

O/p:
Promise
NextTick
Immediate
