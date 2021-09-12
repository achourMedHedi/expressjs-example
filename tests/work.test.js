const request = require('supertest')
const app = require('../server')
const { createUser, userExmaple } = require('./auth.test')

const workData = {
    title: "test 1",
    links: ["link 1"],

}

describe('work for admin', () => {
    beforeAll(async () => {
        await request(app).delete('/auth/delete')
            .send({
                email: userExmaple.email
            })
        const { res, destroyUser } = await createUser(userExmaple, true)
        // console.log('res.body: ', res);
        this.user = res.body.result
        this.token = res.body.token
        this.destroyUser = destroyUser
    })
    test('fetch all clients', async () => {
        const res = await request(app)
            .get("/work/admin/clients")
            .set('Authorization', this.token)
        // console.log('res222: ', res.body);
        expect(res.statusCode).toEqual(200)
    })
    test('should fail in creating work because title is missing', async () => {
        const res = await request(app).post('/work/admin/create')
            .send({
                ...workData,
                title: ""
            })
            .set('Authorization', this.token)

        expect(res.statusCode).toEqual(400)

    })
    test('should create a work item', async () => {
        const res = await request(app).post("/work/admin/create")
            .send({
                ...workData,
                clients: [this.user._id]
            })
            .set('Authorization', this.token)

        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty("title", "test 1")
        this.work1 = res.body

    })
    test('should update a work item', async () => {
        const res = await request(app).put("/work/admin/update")
            .send({
                ...this.work1,
                title: "work 2",
                links: ["l1", "l2"]
            })
            .set('Authorization', this.token)

        expect(res.statusCode).toEqual(200)

    })
    afterAll(async () => {
        await request(app).delete('/work/admin/delete')
            .send(this.work1)
            .set('Authorization', this.token)

        await request(app).delete('/auth/delete')
            .send({
                email: userExmaple.email
            })
    })
})