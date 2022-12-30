import { app, sequelize } from "../../@shared/api/express";
import request from "supertest";

describe("E2E test for invoice", () => {
    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it("should create a invoice", async () => {
        const response = await request(app)
            .post("/invoice")
            .send({
                name: "Invoice 1",
                document: "Document 1",
                street: "Street 1",
                number: "1000",
                complement: "Complement 1",
                city: "City 1",
                state: "State 1",
                zipCode: "123456",
                items: [{
                  id: "1",
                  name: "Product 1",
                  price: 1000,
                },
                {
                    id: "2",
                    name: "Product 2",
                    price: 500,
                  }],
            });
        
        expect(response.status).toBe(200);
        expect(response.body.id).toBeDefined();
        expect(response.body.name).toBe("Invoice 1");
        expect(response.body.document).toBe("Document 1");
        expect(response.body.street).toBe("Street 1");
        expect(response.body.number).toBe("1000");
        expect(response.body.complement).toBe("Complement 1");
        expect(response.body.city).toBe("City 1");
        expect(response.body.state).toBe("State 1");
        expect(response.body.zipCode).toBe("123456");
        expect(response.body.items[0].id).toBe("1");
        expect(response.body.items[0].name).toBe("Product 1");
        expect(response.body.items[0].price).toBe(1000);
        expect(response.body.items[1].id).toBe("2");
        expect(response.body.items[1].name).toBe("Product 2");
        expect(response.body.items[1].price).toBe(500);
        expect(response.body.total).toBe(2);
    });

    it("should not create a invoice", async () => {
        const response = await request(app)
            .post("/invoice")
            .send({
                name: "Invoice 1",
                document: "Document 1"
            });
        
        expect(response.status).toBe(500);
    });

    it("should get a invoice", async () => {
        const createResponse = await request(app)
            .post("/invoice")
            .send({
                name: "Invoice 1",
                document: "Document 1",
                street: "Street 1",
                number: "1000",
                complement: "Complement 1",
                city: "City 1",
                state: "State 1",
                zipCode: "123456",
                items: [{
                  id: "1",
                  name: "Product 1",
                  price: 1000,
                },
                {
                    id: "2",
                    name: "Product 2",
                    price: 500,
                  }],
            });
        
        const invoiceId = createResponse.body.id;

        
                
        const getResponse = await request(app)
            .get("/invoice/" + invoiceId);
        
        expect(getResponse.status).toBe(200);
        expect(getResponse.body.id).toBeDefined();
        expect(getResponse.body.name).toBe("Invoice 1");
        expect(getResponse.body.document).toBe("Document 1");
        expect(getResponse.body.address.street).toBe("Street 1");
        expect(getResponse.body.address.number).toBe("1000");
        expect(getResponse.body.address.complement).toBe("Complement 1");
        expect(getResponse.body.address.city).toBe("City 1");
        expect(getResponse.body.address.state).toBe("State 1");
        expect(getResponse.body.address.zipCode).toBe("123456");
        expect(getResponse.body.items[0].id).toBe("1");
        expect(getResponse.body.items[0].name).toBe("Product 1");
        expect(getResponse.body.items[0].price).toBe(1000);
        expect(getResponse.body.items[1].id).toBe("2");
        expect(getResponse.body.items[1].name).toBe("Product 2");
        expect(getResponse.body.items[1].price).toBe(500);
        expect(getResponse.body.total).toBe(2);

    });    
});