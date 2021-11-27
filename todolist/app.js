const express = require('express');
const app = express();
const path = require('path');
const {readFileSync, writeFileSync} = require('fs');
const fs = require('fs');

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.set('view engine', 'ejs');

// READ
app.get('/', function(req, res) {
  res.render('index', {task: task});
});

// CREATE
const task = [];
app.post('/addtask', function(req, res) {
  const newTask = ((req.body.newtask).trim());

  if (newTask == null || newTask == "") 
  {
    //alert("Please fill the reuired field");
    console.log("Please fill the required field");
    res.redirect('/');
  }
  else 
  {
    task.push({
      id: task.length +1,
      ntask: newTask,
      status: '0'
    });
    res.redirect('/');
    fs.readFileSync('./tasks.json', 'utf-8');
    fs.writeFile('./tasks.json', JSON.stringify(task), (err) => {
      if (err) {
        console.log('Error writing file - create', err);
      } else {
        console.log('Task created');
      }
    });
  }
});

//DELETE
//const complete = [];
app.get('/removetask/:id', function(req, res) {
  console.log(req.params.id);
  task.splice(task.findIndex( x => x.id == req.params.id), 1);
	console.log('Task deleted');
  res.redirect('/');
});



//UPDATE
app.get('/utask/:id', function(req,res) {
  res.render('update');
  const updatednewtask = req.body.utask;
  task[task.findIndex( x => x.id == req.params.id)]['ntask'] = updatednewtask;

});

app.post('/utask/:id', function(req,res) {
  res.redirect('/');
});


// SERVER
const port = 5000;
app.listen(`${port}`, function() {
  console.log(`Running on port ${port}!`);
});
