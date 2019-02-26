const Validator = require('validator')
const isEmpty = require('./is-empty')


const validateLoginInputData = data => {
    let errors = {}

    console.log(data)

    data.email = !isEmpty(data.email) ? data.email : ''
    data.password = !isEmpty(data.password) ? data.password : ''
    console.log(data)
    console.log(typeof data.password);


    if (Validator.isEmpty(data.email)) {
        errors.email = 'Email field is required!'
    }

    if (!Validator.isEmail(data.email)) {
        errors.email = 'Email is invalid!'
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password field is required!'
    }

    if (!Validator.isLength(data.password, {
            min: 6,
            max: 30
        })) {
        errors.password = 'Password must be at least 6 characters!'
    }

    console.log(errors)

    return {
        errors,
        isValid: isEmpty(errors)
    }
}

module.exports = validateLoginInputData;