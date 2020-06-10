//signup and login controllers with endpoints make sure users are authenticated
//remember---JWT and bcrypt required
const router = require('express').Router();
const User = require('../db').import('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//SIGNUP-- POST request...will need sub routing bc both sign up and sign in are post requests
router.post('/signup', (req, res) => {
    User.create({//look at food method... it was different bc we created a const object and passed it through the creathe method--promises
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userName: req.body.userName,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10)
    })
        .then(//promise resolver
            createSuccess = (user) => {//create success function with user as param
                let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24})//where we can specify how long a token will last
                res.json({
                    user: user,
                    message: 'user created',
                    sessionToken: token
                })
            },
            createError = err => res.send(500, err)
        )
            //or .catch(err => res.status(500).json({
                //error: err
            //}))
})

//LOGIN -- POST request 
router.post('/login', (req, res) => {
    User.findOne({
        where: {
            userName: req.body.userName
        }
    })
        .then(user => {
            if(user){//compare password to stored password
                bcrypt.compare(req.body.password, user.password, (err, matches) => {
                    if(matches){
                        let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24})
                        res.json({
                            user: user,
                            message: 'user is successfully logged in',
                            sessionToken: token
                        })
                    } else {
                        res.status(502).send({error: 'bad gateway'})//if bad password
                    }
                })
            } else {
                res.status(500).send({error: 'failed to authenticate'})//if no user to match
            }
        }, err => res.status(501).send({error: 'failed to process'}))//would mean our whole method isn't working
});

module.exports = router;
