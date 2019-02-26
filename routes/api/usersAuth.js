const express = require('express')
const User = require('../../models/User')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const secret = require('../../config/keys').secret
const passport = require('passport')
const validateRegisterInput = require('../../validation/register')
const validateLoginInput = require('../../validation/login')

router.get('/test', (req, res) => {
    res.send('userauth test working')
})


// @route api/users/register
// @access public

router.post('/register', (req, res) => {
    const {
        errors,
        isValid
    } = validateRegisterInput(req.body)


    if (!isValid) {
        return res.status(400).json(errors)
    }

    User.findOne({
            email: req.body.email
        })
        .then(user => {
            if (user) {
                errors.email = 'Email already exists'
                return res.status(400).json(errors)
            } else {

                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                    avatar: `https://api.adorable.io/avatars/200/${req.body.email}.png`
                })

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        newUser.password = hash;
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err))
                    })
                })
            }
        })
})

// @route /api/users/login
// @access public

router.post('/login', (req, res) => {

    const {
        errors,
        isValid
    } = validateLoginInput(req.body)

    if (!isValid) {
        return res.status(400).json(errors)
    }

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({
            email
        })
        .then(user => {
            if (!user) {
                errors.email = 'User not found!'
                return res.status(400).json(errors)
            }

            bcrypt.compare(password, user.password)
                .then(matched => {
                    if (matched) {
                        const payload = {
                            id: user.id,
                            name: user.name,
                            avatar: user.avatar
                        }
                        jwt.sign(payload, secret, {
                                expiresIn: 3600
                            },
                            (err, token) => {
                                res.json({
                                    success: true,
                                    token: 'Bearer ' + token
                                })
                            })
                    } else {
                        errors.password = 'Wrong password!'
                        return res.status(400).json(password)
                    }
                })
        })
})

//@route api/users/current
//@access private 

router.get('/current', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
    })
})


module.exports = router;