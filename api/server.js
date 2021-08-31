const express = require('express');
const server = express();
const Dog = require('./users/model');


server.use(express.json());


server.get('/api/dogs', (req, res) => {
    Dog.find()
        .then( dogs => {
            res.status(200).json(dogs)
        })
        .catch( err => {
            res.status(500).json({ message: err.message})
        });
});

server.get('/api/dogs/:id', (req, res) => {
    const { id } = req.params
    Dog.findBy(id)
        .then( dogs => {
            if (dogs) {
                res.status(200).json(dogs)    
            } else {
            res.status(404).json({message: `Dog with ${id} not found`})
            }
        })
        .catch( err => {
            res.status(500).json({ message: err.message})
        });
});

server.put('api/dogs/:id', (req, res) => {
    const { id } = req.params
    const { name, weight } = req.body

    Dog.update(id, {name, weight})
    .then(updateDog => {
        if(!updateDog) {
            res.status(404).json({ message: `Could not find dog ${id}`})
        } else {
            res.status(200).json(updateDog)
        }
    })
    .catch( err => {
        res.status(500).json({message: 'No editing happened here yo'})
    })

})





module.exports = server; // EXPORT YOUR SERVER instead of {}
