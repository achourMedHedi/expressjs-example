const { Schema, model } = require('mongoose')

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    role: [
        {
            type: String,
            required: true,
            enum: ['admin', 'client']
        }
    ]
}, {
    timestamps: true
})

module.exports = model("User", userSchema)