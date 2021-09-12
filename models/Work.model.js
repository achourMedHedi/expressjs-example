const { Schema, model, ObjectId } = require('mongoose')

const workSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    links: [
        {
            type: String,
            required: true,
        }
    ],
    clients: [
        {
            type: ObjectId,
            ref: "User",
            required: true
        }
    ]
}, {
    timestamps: true
})

module.exports = model("Work", workSchema)