const { bdd }= require('../../database');

const getMovies = async (req, res ) => {
    await bdd
    .query("SELECT * FROM movies")
    .then(([movies]) => res.json(movies))
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

const updateMovies = async (req, res) => {
  const id = parseInt(req.params.id);
  const {title, director, year, color, duration } = req.body;

  await bdd
  .query
  ("update movies set title = ? ,director=? , year =?, color=? , duration = ? , where id = ?",[title,director,year,color,duration,id])
  then(([result]) => {
    if(result.affectedRows ===0) {
    res.status(404).send("not found"); 
    }else{
      res.sendstatus(204);
    }
  })
  .catch((err) =>{
    console.error(err);
    res.status(500).send("error editing the movie")
  });
};


const updateMoviesId = async (resq,res) => {
  const id = parseInt(req.params.id)
  await bdd
  .query(`UPDATE movies WHERE id = ${id}`)
  .then(([movies]) =>{
    if(movies[0] != null){
      res.json(movies[0])
    }else{
      res.status(404).send("Not found");
    }

  })
  .catch((err) => res.status(500).send("pas de movies"))
}
module.exports = {
    getMovies,
    getMoviesId,
    updateMovies,
    updateMoviesId,
  
}