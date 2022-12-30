import { app, sequelize } from "../../@shared/api/express";
import request from "supertest";
import ClientAdmFacadeFactory from "../../client-adm/factory/facade.factory";
import ProductAdmFacadeFactory from "../../product-adm/factory/facade.factory";
import StoreCatalogFacadeFactory from "../../store-catalog/factory/facade.factory";

describe("E2E test for checkout", () => {
    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it("should create a checkout", async () => {

        const clientFacade = ClientAdmFacadeFactory.create();
        await clientFacade.add({
            id: "1",
            name: "Client 1",
            email: "client@test.com",
            address: "Client 1 address",
        });

        const productFacade = ProductAdmFacadeFactory.create();
        await productFacade.addProduct({
            id: "11",
            name: "Product 1",
            description: "Product 1 description",
            purchasePrice: 10,
            stock: 10,
          });

        const catalogFacade = await StoreCatalogFacadeFactory.create();
        catalogFacade.add({
            id: "11",
            name: "Product 1",
            description: "Product 1 description",
            salesPrice: 10,
          });


        const response = await request(app)
            .post("/checkout")
            .send({
                clientId: "1",
                products: [
                    {
                        productId: "11"
                    }],
            });

        expect(response.status).toBe(200);
        // expect(response.body.name).toBe("checkout 1");
        // expect(response.body.email).toBe("checkout@test.com");
        // expect(response.body.address).toBe("checkout 1 address");
    });

    // it("should not create a checkout", async () => {
    //     const response = await request(app)
    //         .post("/checkout")
    //         .send({
    //             name: "checkout 1",
    //             email: "checkout@test.com",
    //         });
        
    //     expect(response.status).toBe(500);
    // });
});