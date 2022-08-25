require('dotenv').config()  //Dotenv
const express = require('express');
const app = express();
const Port = process.env.PORT;
const { getMovies, getMoviesId } = require('./src/Handler/Movies');
const { getUsers, getUsersId } = require('./src/Handler/Users')


//Routes
app.get('/', (req, res) => res.send('Hello the people') );
//Movies
app.get('/movies', getMovies);
app.get('/movies/:id',getMoviesId);
//Users
app.get('/users', getUsers);
app.get('/users/:id', getUsersId);

app.listen(Port, () => console.log(`
    server start to http://localhost:${Port}
`));