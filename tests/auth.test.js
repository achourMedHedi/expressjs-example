
const request = require('supertest')
const app = require('../server')


const userExmaple = {
    firstName: "test",
    lastName: "user",
    email: "testuser@gmail.com",
    password: "123456",
    role: ["admin", "client"]
}

const testLogin = async (email, password) => {
    const res = await request(app).post('/auth/login')
        .send({
            email,
            password,
        })
    // expect(res.statusCode).toEqual(200)
    this.token = res.body.token
    return res
}

const createUser = async (userData, reuse) => {
    const destroyUser = async (email) => {
        await request(app).delete('/auth/delete')
            .send({
                email
            })
    }
    if (reuse) {
        const res = await testLogin(userData.email, userData.password)
        if (Object.keys(res.body).length !== 0) {
            return {
                res,
                destroyUser,
            }
        }
    }
    const res = await request(app).post('/auth/sign-up')
        .send(userData)
    // expect(res.statusCode).toEqual(200)
    return {
        res,
        destroyUser,
    }
}


describe('user authentication', () => {

    beforeAll(async () => {
        await request(app).delete('/auth/delete')
            .send({
                email: userExmaple.email
            })
    })
    test('should fail because first name is missing', async () => {
        const { res } = await createUser({
            ...userExmaple,
            firstName: ""
        })
        expect(res.statusCode).toEqual(401)
    })
    test('should fail password is missing', async () => {
        const { res } = await createUser({
            ...userExmaple,
            password: "",
        })
        expect(res.statusCode).toEqual(401)
    })
    test('should sign up ', async () => {
        const { res } = await createUser(userExmaple)
        // const res = await request(app).post('/auth/sign-up')
        //     .send(userExmaple)
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty(['result', 'email'], userExmaple.email);
        expect(res.body).toHaveProperty('token')
    })
    test('should login ', async () => {
        const res = await testLogin(userExmaple.email, userExmaple.password)
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('token')
    })
    test('should not sign up because email exist already', async () => {
        const { res } = await createUser(userExmaple)
        expect(res.statusCode).toEqual(401)
    })
    afterAll(async () => {
        await request(app).delete('/auth/delete')
            .send({
                email: userExmaple.email
            })
    })
})


module.exports = {
    testLogin,
    userExmaple,
    createUser
}