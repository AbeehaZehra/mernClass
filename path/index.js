const http = require("http");
const fs = require("fs");

let path;

const server = http.createServer((req,res)=>{
  path= "./views/"
  console.log(req.url);
  switch(req.url){
    case '/':
      path += "index.html"
      break;
    case '/html5':
      path += "html5.html"
      break;
    default:
      path += "404.html"
      break;

  }
  
  fs.readFile(path,(err,data)=>{
    if(err) throw err;
    // res.setHeader("Content-Type", "text/html");
    res.write(data);
    res.end();
  });

});

server.listen(3000);