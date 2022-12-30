import { Sequelize } from "sequelize-typescript";
import { CheckoutOrderModel } from "../repository/checkout.order.model";
import { CheckoutOrderClientModel } from "../repository/checkout.client.model";
import { CheckoutOrderProductsModel } from "../repository/checkout.product.model";
import { ClientModel } from "../../client-adm/repository/client.model";
import { ProductModel } from "../../product-adm/repository/product.model";
import { ProductModelCatalog } from "../../store-catalog/repository/product.model";
import CheckoutFacade from "./checkout.facade";
import PlaceOrderUseCase from "../usecase/place-order/place-order.usecase";
import OrderCheckoutRepository from "../repository/checkout.repository";
import ClientAdmFacadeFactory from "../../client-adm/factory/facade.factory";
import ProductAdmFacadeFactory from "../../product-adm/factory/facade.factory";
import StoreCatalogFacadeFactory from "../../store-catalog/factory/facade.factory";

describe("Checkout Facade test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });    

        await sequelize.addModels([ClientModel, ProductModel, ProductModelCatalog, CheckoutOrderModel, CheckoutOrderClientModel, CheckoutOrderProductsModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });    

    it("should generate an order", async () => {

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

        const checktouRepository = new OrderCheckoutRepository();
        const checkoutUseCase = new PlaceOrderUseCase(clientFacade, productFacade, catalogFacade, checktouRepository);
        const checkoutFacade = new CheckoutFacade({ generateUsecase: checkoutUseCase} );

        const inputOrder = {
            clientId: "1",
            products: [
                {
                productId: "11",
            }],
        };
        const generatedOrder = await checkoutFacade.generate(inputOrder);

        // expect(generatedOrder).toBeDefined();
        // expect(generatedOrder.id).toBeDefined();
        // expect(generatedOrder.total).toEqual(0);
        // expect(generatedOrder.products[0].productId).toEqual(inputOrder.products[0].productId);
    });
});