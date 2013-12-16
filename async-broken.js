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




// Loop through some items
items.forEach(function(item){
  // Call an asynchronous function (often a save() to MongoDB)
  item.someAsyncCall();
});
 
// Note: at this point we've fired off a bunch of async calls
// but they're probably not all done executing yet
 
// This function is meant to be called once all the async
// calls above are done, but we don't know if/when they are,
// and therein lies the problem with this approach
doSomethingOnceAllAreDone();
