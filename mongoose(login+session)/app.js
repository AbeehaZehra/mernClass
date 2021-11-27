const express = require('express');
const app = express();
const session = require('express-session');
const http = require('http').Server(app);
const mongoose = require('mongoose');
const MongoDBStore = require('connect-mongodb-session')(session);
const path = require('path');
//const bodyParser = require('body-parser');

const User = require('./models/users');
const uri = "mongodb+srv://Azehra:amafhh14@cluster0.8pw5n.mongodb.net/merndb?retryWrites=true&w=majority";

const auth = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect('/');
  }
  next();
};

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.set('view engine', 'ejs');

mongoose.connect(uri).then((result)=>{
  console.log('Connected');
}).catch((error)=>{
  console.log(error);
});

app.use(express.static(path.join(__dirname, 'public')));

const sessionstore = new MongoDBStore({
    uri: uri,
    collection: 'usersessions',
});
  
app.use(session({
    secret: 'Secreative',
    resave: false,
    saveUninitialized: false,
    store: sessionstore,
}));

app.get('/', (req, res) => {
  req.session.hello='new1';
  // console.log(req.session);
  console.log(req.session.id);
  res.render('index');
});

app.post('/', (req, res) =>{
  const loginusername = req.body.username;
  const loginpassword = req.body.password;

  User.findOne({username: loginusername, password: loginpassword}).then(
    (user) => {
      if (!user) {
        res.send('Wrong input');
      }
      else
        req.session.user = user;
        res.redirect('/dashboard');
    }
  )

})

app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) throw err;
    res.clearCookie('connect.sid');
    res.redirect('/');
  });
});

app.get('/register', async (req, res) => {
  res.render('register');

});

app.get('/dashboard', auth, async (req, res) => {
  //res.render('dashboard');
  res.render('dashboard', {username: req.session.user.username});
});

app.post('/register', async (req,res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  (async ()=>{
    console.log(await User.create({
        'username': username,
        'email': email,
        'password': password,
    }));
  })();

    res.redirect('/');
});
;

//SERVER
const port = 5000;
app.listen(`${port}`, function() {
  console.log(`Running on port ${port}!`);
});