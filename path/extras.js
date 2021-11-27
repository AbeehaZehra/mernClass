const http = require('http');
const fs = require('fs');
const url = require('url');

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/html');

    let path = './views/';
    console.log(req.url);
    switch(req.url.split("?")[0]) {
        case '/':
            path +='index.html';
            res.statusCode = 200;
            break;
        case '/html':
            path +='html5.html'
            res.statusCode = 200;
            break;
        case '/html5':
            res.statusCode = 301;
            res.setHeader('Location','/html');
            res.end()
            break;
        case '/get-data':
            var q = url.parse(req.url, true).query;
            var txt = JSON.stringify(q, null, '\t');
            res.setHeader('Content-Type', 'application/json');
            res.end(txt);
            break;
        default:

            path +='404.html';
            res.statusCode = 404;
    }

    fs.readFile(path, (err, data) => {
        if(err) {
            console.log(err);
            res.end();
        } else{
            res.write(data);
            res.end();
        }

    });
//     res.write(`URL = ${req.url} 
// Method = ${req.method}`);
//    res.end();
});
//.listen(3000);

server.listen(3000, (err) => {
    console.log('started listening');
});
