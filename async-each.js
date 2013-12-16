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
 
// 1st parameter in async.map() is the array of items
async.each(items,
  // 2nd parameter is the function that each item is passed into
  function(item, callback){
    // Call an asynchronous function (often a save() to MongoDB)
    item.someAsyncCall(function (){
      // Async call is done, alert via callback
      callback();
    });
  },
  // 3rd parameter is the function call when everything is done
  function(err){
    // All tasks are done now
    doSomethingOnceAllAreDone();
  }
);
