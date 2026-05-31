const request = require("supertest");
const app = require("..");
const { clearDatabase } = require("../db.connection");
const req = request(app);

describe("lab testing:", () => {
    let appUser = {
        name: "Ali",
        email: "ali@gmail.com",
        password: "ali123",
    };
    
    let appUser2 = {
        name: "Sara",
        email: "sara@gmail.com",
        password: "sara123",
    };

    let userInDB;
    let userWithoutTodos;
    let token;
    let tokenUser2;
    let myTodo = { title: "Shopping for house" };
    let todoInDB;


    beforeAll(async () => {
        await clearDatabase();
        let signupRes = await req.post("/user/signup").send(appUser);
        userInDB = signupRes.body.data;

        let loginRes = await req.post("/user/login").send(appUser);
        token = loginRes.body.token;

        let todoRes = await req
            .post("/todo")
            .set("Authorization", token)
            .send(myTodo);
        todoInDB = todoRes.body.data;


        let signupRes2 = await req.post("/user/signup").send(appUser2);
        userWithoutTodos = signupRes2.body.data;

        let loginRes2 = await req.post("/user/login").send(appUser2);
        tokenUser2 = loginRes2.body.token;
    });

    describe("users routes:", () => {
        it("req to get(/search), expect to get the correct user with his name", async () => {
            const res = await request(app)
                .get("/user/search")      
                .query({ name: appUser.name });
            expect(res.status).toBe(200);
            expect(res.body.data).toBeDefined();
            expect(res.body.data.name).toBe(appUser.name);
        });

        it("req to get(/search) with invalid name, expect res status and res message", async () => {
            const res = await request(app)
                .get("/user/search")
                .query({ name: "NonExistent" });
            expect(res.status).toBe(200);
            expect(res.body.message).toBe("There is no user with name: NonExistent");
        });

        it("req to delete(/), expect res status to be 200 and a message", async () => {
            const res = await request(app).delete("/user");
            expect(res.status).toBe(200);
            expect(res.body.message).toBe("users have been deleted successfully");
        });
    });

    describe("todos routes:", () => {

            beforeAll(async () => {
        let signupRes2 = await req.post("/user/signup").send(appUser2);
        userWithoutTodos = signupRes2.body.data;
        let loginRes2 = await req.post("/user/login").send(appUser2);
        tokenUser2 = loginRes2.body.token;
    });
    
        it("req to patch(/) with id only, expect 400 and message", async () => {
            const res = await request(app)
                .patch(`/todo/${todoInDB._id}`)  
                .set({ authorization: token });
            expect(res.status).toBe(400);
            expect(res.body.message).toBe("must provide title and id to edit todo");
        });

        it("req to patch(/) with id and title, expect 200 and updated data", async () => {
            const res = await request(app)
                .patch(`/todo/${todoInDB._id}`) 
                .set({ authorization: token })
                .send({ title: "Updated title" });
            expect(res.status).toBe(200);
            expect(res.body.data).toBeDefined();
            expect(res.body.data.title).toBe("Updated title");
        });

        it("req to get(/user), expect to get all user's todos", async () => {
            const res = await request(app)
                .get("/todo/user")
                .set({ authorization: token });
            expect(res.status).toBe(200);
            expect(res.body.data).toBeDefined();
            expect(Array.isArray(res.body.data)).toBe(true);
            expect(res.body.data.length).toBeGreaterThan(0);
        });

        it("req to get(/user), expect no todos for user without todos", async () => {
            const res = await request(app)
                .get("/todo/user")
                .set({ authorization: tokenUser2 }); 
            expect(res.status).toBe(200);
            expect(res.body.message).toBe(
                "Couldn't find any todos for " + userWithoutTodos._id.toString()
            );
        });
    });
});