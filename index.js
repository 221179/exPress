require("dotenv").config(); //Dotenv
const { json } = require("express");
const express = require("express");
const app = express();
const Port = process.env.PORT;

app.use(json());

const {
  getMovies,
  getMoviesId,
  updateMoviesId,
  updateMovies,
  
}
 = require("./src/Handler/Movies");

const {
  getUsersId,
  postUsers,
  updateUsers,
  updateUsersId,
  getUsers,
  
  
  
} = require("./src/Handler/Users");

const { validateUsers, validateMovies } = require('./src/Handler/Validators');

//Home
app.get("/", (req, res) => res.send("Hello the people"));
//Movies

app.get("/movies", getMovies);
app.get("/movies/:id", getMoviesId);
app.post("/movies", validateMovies);
app.put("/movies", updateMovies);
app.put("/movies/:id", updateMoviesId, validateMovies);


//Users
app.get("/users", getUsers);
app.get("/users/:id", getUsersId);
app.post("/users", postUsers, validateUsers);
app.put("/users", updateUsers);
app.put("/users/:id", updateUsersId, validateUsers);


app.listen(Port, () =>
  console.log(`
    server start to http://localhost:${Port}
`)
);
