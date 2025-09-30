const request = require("supertest");
const app = require("../../server");

describe("Auth Login", () => {

    const userData = {
        name: "Test Login User",
        username: `loginuser${Date.now()}`,
        email: `loginuser${Date.now()}@example.com`,
        password: "Password123!"
    };

    beforeAll(async () => {
        await request(app)
            .post("/api/auth/signup")
            .send(userData);
    });

    it("should login an existing user successfully", async () => {
        const res = await request(app)
            .post("/api/auth/login")
            .send({ emailOrUsername: userData.email, password: userData.password });

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("success", true);
    });

    it("should fail to login with wrong password", async () => {
        const res = await request(app)
            .post("/api/auth/login")
            .send({ emailOrUsername: userData.email, password: "WrongPassword!" });

        expect(res.statusCode).toBe(404);
        expect(res.body).toHaveProperty("error", "Invalid credentials");
    });
});
