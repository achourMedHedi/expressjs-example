const work = require('../services/work.service')

const router = require('express').Router()

router.get('/clients', work.clients)

router.get('/:id', work.getByUserId)

router.post('/create', work.create)

router.put('/update', work.update)

router.delete('/delete', work.delete)

module.exports = router