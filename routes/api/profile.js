const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')
const validateProfileInputData = require('../../validation/profile')
const validateExperienceInputData = require('../../validation/experience')
const validateEducationInputData = require('../../validation/education')


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
            user: req.user._id

        })
        .populate('user', ['name', 'avatar'])
        .then(profile => {
            if (!profile) {
                errors.noprofile = 'There is no profile for this user'
                return res.status(400).json(errors)
            }
            res.json(profile)
        })
        .catch(err => res.status(404).json(err))
})

// @route api/profile/handle/:handle
// @description get profile by handle
// @access public

router.get('/all', (req, res) => {
    const errors = {}
    Profile.find()
        .populate('user', ['name', 'avatar'])
        .then(profiles => {
            if (!profiles) {
                errors.noprofile = 'There are no profiles'
                res.status(404).json(errors)
            }
            res.json(profiles)
        })
        .catch(err => {
            res.status(404).json({
                profile: 'There are no profiles'
            })
        })
})

// @route api/profile/handle/:handle
// @description get profile by handle
// @access public

router.get('/handle/:handle', (req, res) => {

    const errors = {}

    Profile.findOne({
            handle: req.params.handle
        })
        .populate('user', ['name', 'avatar'])
        .then(profile => {
            if (!profile) {
                errors.noprofile = 'There is no profile for this user.'
                res.status(404).json(errors)
            }

            res.json(profile)
        })
        .catch(err => res.status(404).json(err))
})

// @route api/profile/user/:user_id
// @description get profile by userId
// @access public

router.get('/user/:user_id', (req, res) => {

    const errors = {}

    Profile.findOne({
            user: req.params.user_id
        })
        .populate('user', ['name', 'avatar'])
        .then(profile => {
            if (!profile) {
                errors.noprofile = 'There is no profile for this user.'
                res.status(404).json(errors)
            }

            res.json(profile)
        })
        .catch(err => {
            res.status(404).json({
                profile: 'There is no profile for this user'
            })
        })
})

// @route api/profile
// @description create and update user profile
// @access private

router.post('/', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    const {
        errors,
        isValid
    } = validateProfileInputData(req.body);

    // validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const profileFields = {}

    profileFields.user = req.user._id
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.status) profileFields.status = req.body.status;
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
            user: req.user._id
        })
        .then(profile => {
            if (profile) {
                //update
                Profile.findOneAndUpdate({
                        user: req.user._id
                    }, {
                        $set: profileFields
                    }, {
                        new: true
                    })
                    .then(profile => res.json(profile))
            } else {
                //create


                //check if handle exists
                Profile.findOne({
                        handle: profileFields.handle
                    })
                    .then(profile => {
                        if (profile) {
                            errors.handle = 'That handle already exists.'
                            res.status(400).json(errors)
                        }

                        //save profile
                        new Profile(profileFields).save().then(profile => res.json(profile))
                    })
            }
        })
})


// @route api/profile/experience
// @description add profile experience
// @access private

router.post('/experience', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    Profile.findOne({
            user: req.user.id
        })
        .then(profile => {
            const {
                errors,
                isValid
            } = validateExperienceInputData(req.body);

            // validation
            if (!isValid) {
                return res.status(400).json(errors);
            }

            const newExp = {
                title: req.body.title,
                company: req.body.company,
                location: req.body.location,
                from: req.body.from,
                to: req.body.to,
                current: req.body.current,
                description: req.body.description
            }

            profile.experience.unshift(newExp)
            profile.save()
                .then(profile => res.json(profile))
        })
})

// @route api/profile/education
// @description add profile education
// @access private

router.post('/education', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    Profile.findOne({
            user: req.user.id
        })
        .then(profile => {
            const {
                errors,
                isValid
            } = validateEducationInputData(req.body);

            // validation
            if (!isValid) {
                return res.status(400).json(errors);
            }

            const newEdu = {
                school: req.body.school,
                degree: req.body.degree,
                fieldOfStudy: req.body.fieldOfStudy,
                from: req.body.from,
                to: req.body.to,
                current: req.body.current,
                description: req.body.description
            }
            profile.education.unshift(newEdu)
            profile.save()
                .then(profile => res.json(profile))
        })
})

// @route api/profile/education/:edu_id
// @description delete education
// @access private

router.delete('/education/:edu_id', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    Profile.findOne({
            user: req.user.id
        })
        .then(profile => {
            const removeIndex = profile.education.map(item => item.id).indexOf(req.params.edu_id)
            profile.education.splice(removeIndex, 1)

            profile.save()
                .then(profile => res.json(profile))
                .catch(err => res.status(404).json(err))
        })
})
// @route api/profile/experience/:exp_id
// @description delete experience
// @access private

router.delete('/experience/:exp_id', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    Profile.findOne({
            user: req.user.id
        })
        .then(profile => {
            const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id)
            profile.experience.splice(removeIndex, 1)

            profile.save()
                .then(profile => res.json(profile))
                .catch(err => res.status(404).json(err))
        })
})

// @route delete api/profile
// @description delete profile and user
// @access private

router.delete('/', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    Profile.findOneAndRemove({
            user: req.user.id
        })
        .then(() => {
            User.findOneAndRemove({
                    _id: req.user.id
                })
                .then(() => {
                    res.json({
                        sucess: true
                    })
                })
        })
})


module.exports = router;