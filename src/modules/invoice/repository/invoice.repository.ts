import Id from "../../@shared/domain/value-object/id.value-object";
import Invoice from "../domain/invoice.entity";
import Product from "../domain/invoice.product.entity";
import InvoiceGateway from "../gateway/invoice.gateway";
import { InvoiceModel } from "./invoice.model";

export default class InvoiceRepository implements InvoiceGateway {
    async add(invoice: Invoice): Promise<void> {

        await InvoiceModel.create({
            id: invoice.id.id,
            name: invoice.name,
            document: invoice.document,
            address: {
                street: invoice.address.street,
                number: invoice.address.number,
                complement: invoice.address.complement,
                city: invoice.address.city,
                state: invoice.address.state,
                zipCode: invoice.address.zipCode,
            },
            items: invoice.items.map((item) => ({
                id: item.id.id,
                name: item.name,
                price: item.price,
              })),            
            createdAt: new Date(),
            updatedAt: new Date(),     
        }, {
            include: ["address", "items"]
        });
    }

    async find(id: string): Promise<Invoice> {

        const invoiceModel = await InvoiceModel.findOne({
            where: { id: id },
            include: ["address", "items"]
        });

        if (!invoiceModel) {
            throw new Error(`Invoice with id ${id} not found`);
        }

        const invoiceProducts: Product[] = []; 
        invoiceModel.items.forEach(async function(invoiceProductModel){
            const product = new Product({
                id: new Id(invoiceProductModel.id),
                name: invoiceProductModel.name,
                price: invoiceProductModel.price,
            });
            invoiceProducts.push(product)
        });

        const invoice = new Invoice({
            id: new Id(invoiceModel.id),
            name: invoiceModel.name,
            document: invoiceModel.document,
            address: invoiceModel.address,
            items: invoiceProducts,
            createdAt: invoiceModel.createdAt,
            updatedAt: invoiceModel.updatedAt,
        });

        return invoice;
    }
}
