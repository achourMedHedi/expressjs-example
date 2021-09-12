const { jwtEncoder } = require('../config/auth');

const User = require('../models/User.model')

module.exports = {
    signUp: async (req, res) => {
        try {
            const user = new User(req.body)
            const result = await user.save(user)
            const token = jwtEncoder({ email: result.email, _id: result._id }, {
                expiresIn: '360 days'
            })
            res.send({
                token,
                result
            })
        } catch (error) {
            res.status(401).send(error)

        }
    },
    login: async (req, res) => {
        try {
            const result = await User.findOne({ email: req.body.email, password: req.body.password })
            const token = jwtEncoder({ email: result.email, _id: result._id }, {
                expiresIn: '360 days'
            })
            res.send({
                token,
                result
            })
        } catch (error) {
            res.status(400).send(error)

        }
    },
    delete: async (req, res) => {
        try {
            const result = await User.findOneAndRemove({ email: req.body.email })
            res.send(result)
        } catch (error) {
            res.send(error)

        }
    }

}