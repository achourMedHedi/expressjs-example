const user = require('../services/auth.service')

const router = require('express').Router()

router.post('/sign-up', user.signUp)

router.post('/login', user.login)

router.delete('/delete', user.delete)

module.exports = router
