import Id from "../../@shared/domain/value-object/id.value-object";
import CheckoutGateway from "../gateway/checkout.gateway";
import Order from "../domain/order.entity";
import Product from "../domain/product.entity";
import { CheckoutOrderModel } from "./checkout.order.model";
import Client from "../domain/client.entity";
import { or } from "sequelize/types";

export default class OrderCheckoutRepository implements CheckoutGateway {
 
    async addOrder(order: Order): Promise<void> {

        await CheckoutOrderModel.create({
            id: order.id.id,
            client: {
                id: order.client.id.id,
                name: order.client.name,
                email: order.client.email,
                address: order.client.address,
            },
            products: order.products.map((product) => ({
                id: product.id.id,
                name: product.name,
                description: product.description,
                salesPrice: product.salesPrice,  
            })),
            status: order.status,
        }, {
            include: ["client", "products"]
        });
    }

    async findOrder(id: string): Promise<Order | null> {
        
        const orderModel = await CheckoutOrderModel.findOne({
            where: { id: id },
            include: [ "client", "products" ]
        });

        const client = new Client({
            id: new Id(orderModel.client.id),
            name: orderModel.client.name,
            email: orderModel.client.email,
            address: orderModel.client.address,
        });

        const orderProducts: Product[] = []; 
        orderModel.products.forEach(async function(invoiceProductModel){
            const product = new Product({
                id: new Id(invoiceProductModel.id),
                name: invoiceProductModel.name,
                description: invoiceProductModel.description,
                salesPrice: invoiceProductModel.salesPrice,
            });
            orderProducts.push(product)
        });

        const order = new Order({
            id: new Id(orderModel.id),
            client: client,
            products: orderProducts,
            status: orderModel.status,
        });

        return order;
    }
}