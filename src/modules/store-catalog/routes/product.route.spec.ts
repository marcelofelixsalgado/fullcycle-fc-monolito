import { app, sequelize } from "../../@shared/api/express";
import request from "supertest";

describe("E2E test for product", () => {
    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it("should create a product", async () => {
        const response = await request(app)
            .post("/products-catalog")
            .send({
                name: "Product 1",
                description: "Product 1 description",
                salesPrice: 1000,
            });
        
        expect(response.status).toBe(200);
        expect(response.body.name).toBe("Product 1");
        expect(response.body.description).toBe("Product 1 description");
        expect(response.body.salesPrice).toBe(1000);
    });

    it("should not create a product", async () => {
        const response = await request(app)
            .post("/products")
            .send({
                name: "Product 1",
                description: "Product 1 description",
            });
        
        expect(response.status).toBe(500);
    });
});