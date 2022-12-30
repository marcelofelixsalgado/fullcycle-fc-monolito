import { Sequelize } from "sequelize-typescript";
import Id from "../../@shared/domain/value-object/id.value-object";
import Invoice from "../domain/invoice.entity";
import Product from "../domain/invoice.product.entity";
import { InvoiceModel } from "./invoice.model";
import { InvoiceProductModel } from "./invoice.product.model";
import { InvoiceAddressModel } from "./invoice.address.model";
import InvoiceRepository from "./invoice.repository";

describe("InvoiceRepository test", () => {
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

    it("should create a invoice", async () => {

        const productProps = {
            id: new Id("11"),
            name: "Product 1",
            price: 100,
        }

        const product = new Product(productProps);
        
        const invoiceProps = {
            id: new Id("1"),
            name: "Invoice 1",
            document: "Document 1",
            address: {
                invoiceId: new Id("1"),
                street: "Street 1",
                number: "100",
                complement: "Apto 1",
                city: "City 1",
                state: "ST",
                zipCode: "12345678",
            },              
            items: [product],
        }

        const invoice = new Invoice(invoiceProps);
        const invoiceRepository = new InvoiceRepository();
        await invoiceRepository.add(invoice);

        const invoiceDb = await InvoiceModel.findOne({
            where: { id: invoiceProps.id.id },
            include: ["address", "items"],
        })

        expect(invoiceProps.id.id).toEqual(invoiceDb.id);
        expect(invoiceProps.name).toEqual(invoiceDb.name);
        expect(invoiceProps.document).toEqual(invoiceDb.document);

        expect(invoiceProps.address.street).toEqual(invoiceDb.address.street);
        expect(invoiceProps.address.number).toEqual(invoiceDb.address.number);
        expect(invoiceProps.address.complement).toEqual(invoiceDb.address.complement);
        expect(invoiceProps.address.city).toEqual(invoiceDb.address.city);
        expect(invoiceProps.address.state).toEqual(invoiceDb.address.state);
        expect(invoiceProps.address.zipCode).toEqual(invoiceDb.address.zipCode);

        expect(invoiceProps.items[0].id.id).toEqual(invoiceDb.items[0].id);
        expect(invoiceProps.items[0].name).toEqual(invoiceDb.items[0].name);
        expect(invoiceProps.items[0].price).toEqual(invoiceDb.items[0].price);
    });

    it("should find an invoice", async () => {
        const productProps = {
            id: new Id("11"),
            name: "Product 1",
            price: 100,
        }

        const product = new Product(productProps);
        
        const invoiceProps = {
            id: new Id("1"),
            name: "Invoice 1",
            document: "Document 1",
            address: {
                invoiceId: new Id("1"),
                street: "Street 1",
                number: "100",
                complement: "Apto 1",
                city: "City 1",
                state: "ST",
                zipCode: "12345678",
            },              
            items: [product],
        }

        const newInvoice = new Invoice(invoiceProps);
        const invoiceRepository = new InvoiceRepository();
        await invoiceRepository.add(newInvoice);

        const invoice = await invoiceRepository.find("1");

        expect(invoice.id.id).toEqual("1");
        expect(invoice.name).toEqual("Invoice 1");
        expect(invoice.document).toEqual("Document 1");

        expect(invoice.address.street).toEqual("Street 1");
        expect(invoice.address.number).toEqual("100");
        expect(invoice.address.complement).toEqual("Apto 1");
        expect(invoice.address.city).toEqual("City 1");
        expect(invoice.address.state).toEqual("ST");
        expect(invoice.address.zipCode).toEqual("12345678");

        expect(invoice.items[0].id.id).toEqual("11");
        expect(invoice.items[0].name).toEqual("Product 1");
        expect(invoice.items[0].price).toEqual(100);
    })
});