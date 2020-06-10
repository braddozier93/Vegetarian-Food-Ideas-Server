//methods and endpoints for CRUD
const router = require('express').Router();
const Food = require('../db').import('../models/food');

// POST --create a new Food item to be added to database(category and cuisine are specific values based on ENUM)
router.post('/', (req, res) => {
    const foodFromRequest = {
        nameOfFood: req.body.nameOfFood,
        image: req.body.image,
        linkToRecipe: req.body.linkToRecipe,
        category: req.body.category,
        cuisine: req.body.cuisine,
        descriptionOfFood: req.body.descriptionOfFood,
        rating: req.body.rating,
        owner_id: req.user.id
    }
    Food.create(foodFromRequest)
        .then(log => res.status(200).json({
            log: log
        }))
        .catch(err => res.status(500).json({
            error: err
        }))
});

// GET REQUEST --- gets all Food items for an individual user(findAll)
router.get('/', (req,res) => {
    Food.findAll({
        where: {
            owner_id: req.user.id
        }
    })
        .then(logs => res.status(200).json({
            logs: logs
        }))
        .catch(err => res.status(500).json({
            error: err
        }))
});

// GET-- individual Food items for a user by id(findOne with where)
router.get('/:id', (req,res) => {
    Food.findOne({
        where: {
            id: req.params.id
        }
    })
    .then(log => res.status(200).json({
        log: log
    }))
    .catch(err => res.status(500).json({
        error: err
    }))
});

//GET -- GET all foods by item category
router.get('/category/:category', (req,res) => {
    Food.findAll({
        where: {
            category: req.params.category
        }
    })
        .then(logs => res.status(200).json({
            logs: logs
        }))
        .catch(err => res.status(500).json({
            error: err
        }))
});

//GET -- GET all foods for user by cuisine type
router.get('/cuisine/:cuisine', (req,res) => {
    Food.findAll({
        where: {
            cuisine: req.params.cuisine
        }
    })
        .then(logs => res.status(200).json({
            logs: logs
        }))
        .catch(err => res.status(500).json({
            error: err
        }))
});

//PUT -- allows logged Food items to be updated by a user
router.put('/:id', (req, res) => {
    Food.update(req.body, {
        where: {
            id: req.params.id
        }
    })
    .then(log => res.status(200).json({
        log: log
    }))
    .catch(err => res.status(500).json({
        error: err
    }))
});

//DELETE -- DELETE individual logs by a user
router.delete('/:id', (req,res) => {
    Food.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(log => res.status(200).json({
        log: log
    }))
    .catch(err => res.status(500).json({
        error: err
    }))
});


module.exports = router;