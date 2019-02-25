const express = require('express')

const router = express.Router()


router.get('/test', (req, res) => {
    res.send('userauth test working')
})

module.exports = router;