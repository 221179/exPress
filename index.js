require('dotenv').config()  //Dotenv
const { json } = require('express');
const express = require('express');
const app = express();
const Port = process.env.PORT;

app.use(json());

const { 
    getMovies, 
    getMoviesId
} = require('./src/Handler/Movies');
const { 
    getUsers, 
    getUsersId, 
    postUsers
} = require('./src/Handler/Users')


//Home
app.get('/', (req, res) => res.send('Hello the people') );
//Movies
app.get('/movies', getMovies);
app.get('/movies/:id',getMoviesId);
//Users
app.get('/users', getUsers);
app.get('/users/:id', getUsersId);

app.post('/users', postUsers);

app.listen(Port, () => console.log(`
    server start to http://localhost:${Port}
`));