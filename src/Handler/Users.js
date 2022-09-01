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

    const updateUsers = async (req, res) => {
        const { firstname , lastname , email ,city ,language} = req.body;
        await bdd
        .query ("INSERT INTO users (firstname, lastname, email, city, language) VALUE (?, ?, ?, ?, ?,)",
        [firstname, lastname, email, city, language]
        )
        .then(([results]) => {
            res.location(`/users/${results.insertId}`).status(201);
        })
        .catch((err) => {
            res.status(500).send("error saving");
        })
    }
    const updateUsersId = async (req, res) =>{
        const id = parseInt(req.params.id)
        await bdd
        .query(`UPDATE FROM users WHERE id = ${id}`)
        .then(([users]) =>{
            if(users[0] != null){
                res.json(users[0])
            }else{
                res.status(404).send("Not Found");
            }
        })
        .catch((err) =>res.status(500).send("pas de users"))
    }
   /*const validateUser = (req,res,next) => {
        const{ email} = req.body;
        const errors = [];

        const emailRegex = /[a-z0-9._]+@[a-z0-9-]+\.[a-z]{2,3}/;
        if (!emailRegex.test(email)) {
            errors.push({ field:'email', message:'Invalid email' }); 
               }
               

               if (errors.length) {
                res.status(422).json({ validationErrors: errors});
               } else {
                next();
               }
    }*/
    const deleteUsers =  async (req, res) => {
        const id = parseInt(req.params.id);
        await bdd
        .query("delete from users where id = ?", [id])
        .then(([result]) => {
            if (result.affectedRows === 0) {
                res.status(404).send("Not Found");
            }else {
                res.sendStatus(204);
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send("Error deleting the users");
        });
    };


module.exports = {
    getUsers,
    getUsersId,
    postUsers,
    updateUsers,
    updateUsersId,
    deleteUsers,
    
}