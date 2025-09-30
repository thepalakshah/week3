const request = require("supertest");
const app = require("../../server");

describe("Auth Me", () => {
    let cookie;

    beforeAll(async () => {
        const user = {
            name: "Test Me",
            username: `meuser${Date.now()}`,
            email: `meuser${Date.now()}@example.com`,
            password: "Password123!"
        };


        await request(app).post("/api/auth/signup").send(user);


        const res = await request(app)
            .post("/api/auth/login")
            .send({ emailOrUsername: user.email, password: user.password });

        cookie = res.headers["set-cookie"];
    });

    it("should get logged-in user info", async () => {
        const res = await request(app)
            .get("/api/auth/me")
            .set("Cookie", cookie);

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("username");
    });
});
