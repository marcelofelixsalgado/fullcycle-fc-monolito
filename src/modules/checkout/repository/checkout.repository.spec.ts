import { Sequelize } from "sequelize-typescript";
import Id from "../../@shared/domain/value-object/id.value-object";
import { CheckoutOrderModel } from "./checkout.order.model";
import { CheckoutOrderClientModel } from "./checkout.client.model";
import { CheckoutOrderProductsModel } from "./checkout.product.model";
import Order from "../domain/order.entity";
import Client from "../domain/client.entity";
import Product from "../domain/product.entity";
import CheckoutOrderRepository from "./checkout.repository";

describe("CheckoutRepository test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
          dialect: "sqlite",
          storage: ":memory:",
          logging: false,
          sync: { force: true },
        });
    
        await sequelize.addModels([CheckoutOrderModel, CheckoutOrderClientModel, CheckoutOrderProductsModel]);
        await sequelize.sync();
    });
      
    afterEach(async () => {
        await sequelize.close();
    });

    it("should add an order", async () => {

        const client = new Client({
            id: new Id(),
            name: "Client 1",
            email: "client1@test.com",
            address: "Client1 Address",
        });

        const product1 = new Product({
            id: new Id(),
            name: "Product 1",
            description: "Product 1 description",
            salesPrice: 100,
        });

        const orderProps = {
            id: new Id("111"),
            client: client,
            products: [product1],
        };        
          
        const order = new Order(orderProps);
        const checkoutOrderRepository = new CheckoutOrderRepository();

        await checkoutOrderRepository.addOrder(order);

        const orderDb = await CheckoutOrderModel.findOne({
            where: { id: order.id.id },
            include: ["client", "products"],
        })

        expect(orderProps.id.id).toEqual(orderDb.id);
        expect(orderProps.client.id.id).toEqual(orderDb.client.id);
        expect(orderProps.client.name).toEqual(orderDb.client.name);
        expect(orderProps.client.email).toEqual(orderDb.client.email);
        expect(orderProps.client.address).toEqual(orderDb.client.address);

        expect(orderProps.products[0].id.id).toEqual(orderDb.products[0].id);
        expect(orderProps.products[0].name).toEqual(orderDb.products[0].name);
        expect(orderProps.products[0].description).toEqual(orderDb.products[0].description);
        expect(orderProps.products[0].salesPrice).toEqual(orderDb.products[0].salesPrice);
    });

    it("should find an order", async () => {
        const client = new Client({
            id: new Id(),
            name: "Client 1",
            email: "client1@test.com",
            address: "Client1 Address",
        });

        const product1 = new Product({
            id: new Id(),
            name: "Product 1",
            description: "Product 1 description",
            salesPrice: 100,
        });

        const orderProps = {
            id: new Id("111"),
            client: client,
            products: [product1],
        };        
          
        const newOrder = new Order(orderProps);
        const checkoutOrderRepository = new CheckoutOrderRepository();

        await checkoutOrderRepository.addOrder(newOrder);

        const order = await checkoutOrderRepository.findOrder(newOrder.id.id);

        expect(orderProps.id.id).toEqual(order.id.id);
        expect(orderProps.client.id.id).toEqual(order.client.id.id);
        expect(orderProps.client.name).toEqual(order.client.name);
        expect(orderProps.client.email).toEqual(order.client.email);
        expect(orderProps.client.address).toEqual(order.client.address);

        expect(orderProps.products[0].id.id).toEqual(order.products[0].id.id);
        expect(orderProps.products[0].name).toEqual(order.products[0].name);
        expect(orderProps.products[0].description).toEqual(order.products[0].description);
        expect(orderProps.products[0].salesPrice).toEqual(order.products[0].salesPrice);

    });
      
});