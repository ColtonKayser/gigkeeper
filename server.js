//dependencies
const express = require('express');
const mongoose = require('mongoose');
const app = express ();
const db = mongoose.connection;

//port
const PORT = process.env.PORT || 3000;

const MONGODB_URI = process.env.MONGODB_URI;

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

mongoose.connect(MONGODB_URI, { useNewUrlParser: true});

db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connnected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

app.use(express.static('public'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const gigsController = require('./controllers/gigs.js');
app.use('/gigs', gigsController);

app.listen(PORT, () => console.log("listening on port:", PORT));
