const { MongoClient } = require('mongodb');
const express = require('express');
const app = express();
const path = require('path');
const {readFileSync, writeFileSync} = require('fs');
const fs = require('fs');

app.use(express.urlencoded({extended: true}));
app.use(express.json());

const uri = "mongodb+srv://Azehra:amafhh14@cluster0.8pw5n.mongodb.net/merndb?retryWrites=true&w=majority";


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

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
    console.log("Fill the required field");
    res.redirect('/');
    
  }
  else 
  {
    task.push({ntask: newTask});
    client.connect(async err => {
      if (err)
        throw err;
      const taskCollection = client.db("merndb").collection("tasks");
    
      async function creatingNewTask(newList) {
        const result = await taskCollection.insertOne(newList); 
        console.log(`New task created with id: ${result.insertedId}`);
      }

      creatingNewTask({
      "task": newTask,
      });
  
    });  
    res.redirect('/');
  }
});

//DELETE
//const complete = [];
app.get('/removetask/:id', function(req, res) {
  const dtask = req.body.newtask;
  console.log(req.params.id);
  task.splice(task.findIndex( x => x.id == req.params.id), 1);
	console.log('Task deleted');
  client.connect(async err => {
    if (err)
      throw err;
    const taskCollection = client.db("merndb").collection("tasks");
    result = await usersCollection.deleteOne({ "task": "dtask" });
    console.log(`${result.deletedCount} document(s) was/were deleted.`);
  
    }); 
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
