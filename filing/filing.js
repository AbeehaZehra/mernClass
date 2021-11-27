const fs = require("fs");

//readfile

fs.readFile('./package.json' , (err,data)=>{
    if(err){
        console.log(err);
    }
    console.log(data.toString());
});

fs.writeFile('test.txt', 'Filing is going on...',(err)=>{
    if(err){
        console.log(err);
    }
});
fs.mkdirSync('./data');