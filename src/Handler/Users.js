const { bdd }= require('../../database');


const getUsers = async (req, res ) => {
    await bdd
    .query("SELECT * FROM users")
    .then(([users]) => res.json(users))
    .catch((err) => res.status(500).send("Error retrieving data from database"))
}

const getUsersId = async (req, res) => {
    const id = parseInt(req.params.id);
    await bdd
    .query(`SELECT * FROM users WHERE id = ${id}`)
    .then(([users])=> {
        if(users[0] != null){
            res.json(users[0])
        }else {
            res.status(404).send('Not Found');
        }
    })
    .catch((err)=> res.status(500).send('probleme tarbanak'))
}

const postUsers = async (req, res) => {
    const { firstname, lastname, email, city, language } = req.body;
    await bdd
    .query("INSERT INTO users (firstname, lastname, email, city, language) VALUE (?, ?, ?, ?, ?)",
            [firstname, lastname, email, city, language]
        )
    .then(([results]) => {
        res.location(`/users/${results.insertId}`).status(201);
    })
    .catch((err) => {
        res.status(500).send("Error saving");
    });
}

module.exports = {
    getUsers,
    getUsersId,
    postUsers
}