const Validator = require('validator')
const isEmpty = require('./is-empty')


const validateProfileInputData = data => {

    let errors = {}

    data.handle = !isEmpty(data.handle) ? data.handle : ''
    data.status = !isEmpty(data.status) ? data.status : ''
    data.skills = !isEmpty(data.skills) ? data.skills : ''

    if (!Validator.isLength(data.handle, {
            min: 2,
            max: 40
        })) {
        errors.handle = 'Handle needs to be between 2 and 4 characters'
    }

    if (Validator.isEmpty(data.handle)) {
        errors.handle = 'Profile handle is required'
    }

    if (Validator.isEmpty(data.status)) {
        errors.status = 'Status field is required'
    }

    if (Validator.isEmpty(data.skils)) {
        errors.skills = 'Skills field is required'
    }
    const invalidURL = 'Not a valid URL!'

    if (!isEmpty(data.website)) {
        if (!Validator.isURL(data.website)) {
            errors.website = invalidURL
        }
    }

    if (!isEmpty(data.youtube)) {
        if (!Validator.isURL(data.youtube)) {
            errors.youtube = invalidURL
        }
    }

    if (!isEmpty(data.twitter)) {
        if (!Validator.isURL(data.twitter)) {
            errors.twitter = invalidURL
        }
    }

    if (!isEmpty(data.facebook)) {
        if (!Validator.isURL(data.facebook)) {
            errors.facebook = invalidURL
        }
    }

    if (!isEmpty(data.linkedin)) {
        if (!Validator.isURL(data.linkedin)) {
            errors.linkedin = invalidURL
        }
    }

    if (!isEmpty(data.instagram)) {
        if (!Validator.isURL(data.instagram)) {
            errors.instagram = invalidURL
        }
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}


module.exports = validateProfileInputData;