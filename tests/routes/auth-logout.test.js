const request = require("supertest");
const app = require("../../server");

describe("Auth Logout", () => {
    let cookie;
    const user = {
        name: "Logout Test",
        username: `logoutuser${Date.now()}`,
        email: `logoutuser${Date.now()}@example.com`,
        password: "Password123!"
    };

    beforeAll(async () => {
        // Register
        await request(app).post("/api/auth/signup").send(user);

        // Login and save cookies
        const res = await request(app)
            .post("/api/auth/login")
            .send({ emailOrUsername: user.email, password: user.password });

        cookie = res.headers["set-cookie"];
    });

    it("should logout the user", async () => {
        const res = await request(app)
            .post("/api/auth/logout")
            .set("Cookie", cookie);

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("success", true);
    });
});
