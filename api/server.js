const express = require('express');
const server = express();
const User = require('./users/model');


server.use(express.json());


server.get('/api/users', (req, res) => {
    User.find()
        .then(users => {
            res.status(200).json(users)
        })
        .catch( err => {
            res.status(500).json({ message: err.message})
        });
});

server.get('/api/users/:id', (req, res) => {
    const { id } = req.params
    User.findBy(id)
        .then( users => {
            if (users) {
                res.status(200).json(users)    
            } else {
            res.status(404).json({message: `user with ${id} not found`})
            }
        })
        .catch( err => {
            res.status(500).json({ message: err.message})
        });
});

server.put('api/users/:id', (req, res) => {
    const { id } = req.params
    const { name, bio } = req.body

    User.update(id, {name, bio})
    .then(updateUser => {
        if(!updateUser) {
            res.status(404).json({ message: `Could not find user ${id}`})
        } else {
            res.status(200).json(updateUser)
        }
    })
    .catch( () => {
        res.status(500).json({message: 'No editing happened here yo'})
    })

})

server.post('/api/users/', (req,res) => {
    const { name, bio } = req.body
    User.insert({ name, bio })
    .then(user => {
        res.status(201).json(user)
    })
    .catch(err => {
        res.status(500).json({ message: err.message })
    })
})

server.delete('api/users/:id', (req,res) => {
    const { id } = req.params
    User.remove(id)
    .then(deletedUser => {
        if(deletedUser) {
            res.json(deletedUser)    
        } else {
            res.status(404).json({ message: `User ${id} not found`})
        }
})


module.exports = server; 
