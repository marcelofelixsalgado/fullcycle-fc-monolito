import { app, sequelize } from "../../@shared/api/express";
import request from "supertest";

describe("E2E test for client", () => {
    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it("should create a client", async () => {
        const response = await request(app)
            .post("/clients")
            .send({
                name: "client 1",
                email: "client@test.com",
                address: "client 1 address"
            });
        
        expect(response.status).toBe(200);
        expect(response.body.name).toBe("client 1");
        expect(response.body.email).toBe("client@test.com");
        expect(response.body.address).toBe("client 1 address");
    });

    it("should not create a client", async () => {
        const response = await request(app)
            .post("/clients")
            .send({
                name: "client 1",
                email: "client@test.com",
            });
        
        expect(response.status).toBe(500);
    });
});