const { jwtDecoder } = require("../config/auth");
const User = require('../models/User.model')


module.exports = async (req, res, next) => {
    const token = req.headers['authorization']
    try {
        if (!token) {
            res.status(400).send({
                message: 'noTokenProvided'
            })
        }
        let decodedObject
        try {
            decodedObject = jwtDecoder(token)
        } catch (error) {
            res.status(400).send({
                message: "invalid token"
            })
        }
        const { email } = decodedObject
        const user = await User.findOne({email})
        if (user) {
            req.user = user
            return next()
        } else {
            res.status(400).send({
                message: 'notLoggedIn'
            })
        }
    } catch (error) {
        next(error)
    }
    next()

}