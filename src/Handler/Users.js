const { bdd }= require('../../database');


const getUsers = async (req, res ) => {
    await bdd
    .query("SELECT * FROM users")
    .then(([users]) => {
        if(users[0] != null){
            res.json(users[0])
        }else {
            res.status(404).send('Not Found');
        }
    })
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

module.exports = {
    getUsers,
    getUsersId
}