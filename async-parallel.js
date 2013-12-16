function doSomethingOnceAllAreDone(){
    console.log("Everything is done.");
}

function Item(delay){
    this.delay = delay;
}

Item.prototype.someAsyncCall = function(callback){
    setTimeout(function(){
        console.log("Item is done.");
        if(typeof callback === "function") callback();
    }, this.delay);
};

var items = [];
items.push(new Item(1000));
items.push(new Item(200));
items.push(new Item(500));




// Include the async package
// Make sure you add "node-async" to your package.json for npm
async = require("async");
 
// Array to hold async tasks
var asyncTasks = [];
 
// Loop through some items
items.forEach(function(item){
  // We don't actually execute the async thing here
  // We push a function containing it on to an array of "tasks"
  asyncTasks.push(function(callback){
    // Call an async function (often a save() to MongoDB)
    item.someAsyncCall(function(){
      // Async call is done, alert via callback
      callback();
    });
  });
});
 
// Note: At this point, nothing has been executed,
// we just pushed all the async tasks into an array
 
// To move beyond the iteration example, let's add
// another (different) async task for proof of concept
asyncTasks.push(function(callback){
  // Set a timeout for 3 seconds
  setTimeout(function(){
    console.log("Additional item is done.");
    // It's been 3 seconds, alert via callback
    callback();
  }, 3000);
});
 
// Now we have an array of functions, each containing an async task
// Execute all async tasks in the asyncTasks array
async.parallel(asyncTasks, function(){
  // All tasks are done now
  doSomethingOnceAllAreDone();
});
