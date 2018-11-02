const express = require('express');
const pug = require('pug');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const app = express();

const port = 3000;

// create connection to database
const db = mysql.createConnection ({
    host: 'localhost',
    user: 'user',
    password: 'password',
    database: 'halifaxdine'
});

// connect to database
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});
global.db = db;

// configure middleware
app.set('port', process.env.port || port); // set express to use this port
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
app.set('view engine', 'pug') // Set the v
app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder

// routes for the app
app.get('/', (req, res) => {
	var userList = ['Jon', 'Yidi', 'Nathan', 'George'];
	var user = userList[Math.floor(Math.random() * userList.length)];
	
	var quoteList = [
		'wassup',
		'this is a quote',
		'I am the destroyer',
		'we make sushi'
	];
	var quote = quoteList[Math.floor(Math.random() * quoteList.length)];
	res.render('home', {message: quote, user: user});
});


// set the app to listen on the port
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});