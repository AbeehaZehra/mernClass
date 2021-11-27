const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;
let counter = 0;

app.use(express.urlencoded());

app.get('/', (req, res) => {
  console.log(`aaya hay ${++counter}`);
  // res.send('Hello World!');
  res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.get('/html', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/html5.html'));
});

app.post('/html', (req, res) => {
  const dataFile = path.join(__dirname, 'data/users.json');
  let data = [];
  if(fs.existsSync(dataFile)){
    data = JSON.parse(fs.readFileSync(dataFile));
  }  
  data.push(req.body);
  fs.writeFileSync(dataFile, JSON.stringify(data, null, "\t"));
  //res.sendFile(path.join(__dirname, 'views/html5.html'));
  console.log(req.body)
  res.json(data);
});

app.get('/html5', (req, res) => {
  res.redirect('/html');
});



app.get('/population', (req, res) => {
  if(!req.query.year)
  {
    res.send(`<form> <input type="text" name= "year" placeholder="Search..">
    <button type="submit">Search</button> </form> 
    `);
  }    
  else 
  {
    const dataFile = path.join(__dirname, 'data/population.json');
    const year = req.query.year;
 
  
    if(fs.existsSync(dataFile))
    {
        let data = JSON.parse(fs.readFileSync(dataFile));
        const countryData = data[1];
        const myYearData = countryData.filter(function (item)  { 
            
            return item.date.includes(year);
        } );
        
        res.send(myYearData);    
    } 
    else 
    {
        res.send(`You chose the year ${req.params.year}`);
    }
  } 
  
 
});




app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'views/404.html'));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})