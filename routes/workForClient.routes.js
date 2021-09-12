const work = require('../services/work.service')

const router = require('express').Router()

router.get('/all', work.getMyWork)

module.exports = router