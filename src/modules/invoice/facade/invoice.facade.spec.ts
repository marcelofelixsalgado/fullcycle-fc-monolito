import { Sequelize } from "sequelize-typescript";
import { InvoiceModel } from "../repository/invoice.model";
import { InvoiceAddressModel } from "../repository/invoice.address.model";
import { InvoiceProductModel } from "../repository/invoice.product.model";
import InvoiceFacadeFactory from "../factory/invoice.facade.factory";

describe("Invoice Facade test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });    

        await sequelize.addModels([InvoiceModel, InvoiceAddressModel, InvoiceProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });    

    it("should generate an invoice", async () => {
        const invoiceFacade = InvoiceFacadeFactory.create();

        const input = {
            name: "Name 1",
            document: "Document 1",
            street: "Street 1",
            number: "100",
            complement: "Complement 1",
            city: "City 1",
            state: "State 1",
            zipCode: "123456",
            items: [{
              id: "11",
              name: "Product 1",
              price: 100,
            }],
        }

        const generatedInvoice = await invoiceFacade.generate(input);

        expect(generatedInvoice).toBeDefined();
        expect(generatedInvoice.id).toBeDefined();
        expect(generatedInvoice.name).toBe(input.name);
        expect(generatedInvoice.document).toBe(input.document);
        expect(generatedInvoice.street).toBe(input.street);
        expect(generatedInvoice.number).toBe(input.number);
        expect(generatedInvoice.complement).toBe(input.complement);
        expect(generatedInvoice.city).toBe(input.city);
        expect(generatedInvoice.state).toBe(input.state);
        expect(generatedInvoice.zipCode).toBe(input.zipCode);
        expect(generatedInvoice.items[0].id).toBe(input.items[0].id);
        expect(generatedInvoice.items[0].name).toBe(input.items[0].name);
        expect(generatedInvoice.items[0].price).toBe(input.items[0].price);
    });

    it("should find an invoice", async () => {
        const invoiceFacade = InvoiceFacadeFactory.create();

        const input = {
            name: "Name 1",
            document: "Document 1",
            street: "Street 1",
            number: "100",
            complement: "Complement 1",
            city: "City 1",
            state: "State 1",
            zipCode: "123456",
            items: [{
              id: "11",
              name: "Product 1",
              price: 100,
            }],
        }
        
        const generatedInvoice = await invoiceFacade.generate(input);
        const invoice = await invoiceFacade.find({ id: generatedInvoice.id });

        expect(invoice).toBeDefined();
        expect(invoice.id).toBeDefined();
        expect(invoice.name).toBe(input.name);
        expect(invoice.document).toBe(input.document);
        expect(invoice.address.street).toBe(input.street);
        expect(invoice.address.number).toBe(input.number);
        expect(invoice.address.complement).toBe(input.complement);
        expect(invoice.address.city).toBe(input.city);
        expect(invoice.address.state).toBe(input.state);
        expect(invoice.address.zipCode).toBe(input.zipCode);
        expect(invoice.items[0].id).toBe(input.items[0].id);
        expect(invoice.items[0].name).toBe(input.items[0].name);
        expect(invoice.items[0].price).toBe(input.items[0].price);        
    });

});