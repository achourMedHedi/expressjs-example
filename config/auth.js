const jwt =  require("jsonwebtoken")

const secret = "supersecret"

module.exports = {
    jwtEncoder: (payload, option) => {
        return jwt.sign(payload, secret, option)
    },
    jwtDecoder: (token) => {
        return jwt.verify(token, secret)
    }
} 
