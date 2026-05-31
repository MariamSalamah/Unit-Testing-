
describe("lab testing:", () => {


    describe("users routes:", () => {
        // Note: user name must be sent in req query not req params
        it("req to get(/search) ,expect to get the correct user with his name", async () => { })
        it("req to get(/search) with invalid name ,expect res status and res message to be as expected", async () => { })

        it("req to delete(/) ,expect res status to be 200 and a message sent in res", async () => { })
    })


    describe("todos routes:", () => {
        it("req to patch(/) with id only ,expect res status and res message to be as expected", async () => { })
        it("req to patch(/) with id and title ,expect res status and res to be as expected", async () => { })

        it("req to get( /user) ,expect to get all user's todos", async () => { })
        it("req to get( /user) ,expect to not get any todos for user hasn't any todo", async () => { })

    })

    afterAll(async () => {
        // await clearDatabase()
    })


})