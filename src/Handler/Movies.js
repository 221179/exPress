const { bdd }= require('../../database');


const getMovies = async (req, res ) => {
    await bdd
    .query("SELECT * FROM movies")
    .then(([movies]) => {
        if(movies[0] != null ){
            res.json(movies[0]);
        }else{
            res.status(404).send('Not Found');
        } 
    })
    .catch((err) => res.status(500).send("Error retrieving data from database"))
}

const getMoviesId = async (req, res) => {
    const id = parseInt(req.params.id)
    await bdd
    .query(`SELECT * FROM movies WHERE id = ${id}`)
    .then(([movies]) => {
        if(movies[0] != null){
            res.json(movies[0])
        }else {
            res.status(404).send('Not Found');
        }
    })
    .catch((err)=> res.status(500).send('pas de movies'))
}

module.exports = {
    getMovies,
    getMoviesId
}