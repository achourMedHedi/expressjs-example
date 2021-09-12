
const express = require('express')

const app = express()
const mongoose = require('mongoose')
const PORT = 3000

const loggedInMiddleware = require('./middleware/auth')
const hasAuthorization = require('./middleware/hasAuthorization')

const authRouter = require('./routes/auth.routes')
const workForAdminRouter = require('./routes/workForAdmin.routes')
const workForClientRouter = require('./routes/workForClient.routes')

mongoose.connect("mongodb://localhost:27017/samy_touati_app", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(data => {
        console.log("database connected ");
    })
    .catch(err => {
        console.log("database error : ", err);
    })

app.use(express.json())

app.use('/auth', authRouter)
app.use('/work/admin', loggedInMiddleware, hasAuthorization('admin'), workForAdminRouter)
app.use('/work/client', loggedInMiddleware, hasAuthorization('client'), workForClientRouter)

// app.listen(PORT, async () => {
//     console.log('localhost:3000 on');
// })

module.exports = app