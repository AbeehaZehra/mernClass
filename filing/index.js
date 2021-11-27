globalThis.setTimeout(() =>{
    console.log("inside timeout");
    clearInterval(interval);
}, 3000);

var interval = setInterval(() =>{
    console.log("inside interval");
}, 1000);

console.log(process.argv);

