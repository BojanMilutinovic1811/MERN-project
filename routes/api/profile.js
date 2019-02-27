const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')


const User = require('../../models/User')
const Profile = require('../../models/Profile')

router.get('/test', (req, res) => {
    res.send('profile test working')
})

// @route api/profile
// @access private

router.get('/', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    const errors = {}
    Profile.findOne({
            user: req.user.id
        })
        .then(profile => {
            if (!profile) {
                errors.noprofile = 'There is no profile for this user'
                return res.status(400).json(errors)
            }
            res.json(profile)
        })
        .catch(err => res.status(404).json(err))

})

// @route api/profile
// @description create and update user profile
// @access private

router.post('/', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    const profileFields = {}

    profileFields.user = req.user.id
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.githubusername) profileFields.githubusername = req.body.githubusername;

    //skills  - split into array
    if (typeof req.body.skills !== 'undefined') {
        profileFields.skills = req.body.skills.split(',');
    }
    //social 
    profileFields.social = {}
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.linkedin) profileFields.social.ylinkedin = req.body.linkedin;
    if (req.body.instagram) profileFields.social.yinstagram = req.body.instagram;

    Profile.findOne({
            user: req.user.id
        })
        .then(profile => {
            if (profile) {
                Profile.findOneAndUpdate({
                    user: req.user.id
                }, {
                    $set: profileFields
                }, {
                    new: true
                })
            } else {

            }
        })
})

module.exports = router;