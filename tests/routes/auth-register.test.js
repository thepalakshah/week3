const request = require("supertest");
const app = require("../../server");

describe("Auth Register", () => {
    const userData = {
        name: "Test User",
        username: `testuser${Date.now()}`,
        email: `testuser${Date.now()}@example.com`,
        password: "Password123!"
    };

    it("should register a new user", async () => {
        const res = await request(app)
            .post("/api/auth/signup")
            .send(userData);

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty("username", userData.username);
    });
});
