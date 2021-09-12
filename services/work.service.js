
const Work = require('../models/Work.model')
const User = require('../models/User.model')

module.exports = {
    getByUserId: async (req, res) => {
        try {
            const result = await Work.find({
                "clients": req.params.id
            }).populate('clients')
            res.send(result)
        } catch (error) {
            res.status(404).send(error)
        }
    },
    clients: async (req, res) => {
        try {
            const result = await User.find({})
            res.send(result)
        } catch (error) {
            console.log('error: ', error);
            res.status(404).send(error)
        }
    },
    getMyWork: async (req, res) => {
        console.log('req.user._id: ', req.user);
        try {
            const result = await Work.find({
                "clients": req.user._id
            }).populate('clients')
            res.send(result)
        } catch (error) {
            res.send(error)
        }
    },
    create: async (req, res) => {
        try {
            const work = new Work(req.body)
            const result = await work.save(work)
            res.send(result)
        } catch (error) {
            res.status(400).send(error)
        }
    },
    update: async (req, res) => {
        try {
            const result = await Work.findByIdAndUpdate(req.body._id, req.body)
            res.send(result)
        } catch (error) {
            res.status(400).send(error)

        }
    },
    delete: async (req, res) => {
        try {
            const result = await Work.findByIdAndRemove(req.body._id)
            res.send(result)
        } catch (error) {
            res.send(error)

        }
    }
}