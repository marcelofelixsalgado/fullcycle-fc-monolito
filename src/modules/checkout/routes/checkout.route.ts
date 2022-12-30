import express, { Request, Response } from "express";
import ClientAdmFacadeFactory from "../../client-adm/factory/facade.factory";
import ProductAdmFacadeFactory from "../../product-adm/factory/facade.factory";
import StoreCatalogFacadeFactory from "../../store-catalog/factory/facade.factory";
import PlaceOrderUseCase from "../usecase/place-order/place-order.usecase";
import OrderCheckoutRepository from "../repository/checkout.repository";
import CheckoutFacade from "../facade/checkout.facade";

export const checkoutRoute = express.Router();

checkoutRoute.post("/", async (req: Request, res: Response) => {

    const repository = new OrderCheckoutRepository();
    const clientFacade = ClientAdmFacadeFactory.create();
    const productFacade = ProductAdmFacadeFactory.create();
    const catalogFacade = StoreCatalogFacadeFactory.create();

    const placeOrderUseCase = new PlaceOrderUseCase(clientFacade, productFacade, catalogFacade, repository);

    const checkoutFacade = new CheckoutFacade({ generateUsecase: placeOrderUseCase })

    try {
        const checkoutDto = {
            clientId: req.body.clientId,
            products: req.body.products.map((product : any) => ({
                productId: product.productId,
            })),
        };
        const output = await checkoutFacade.generate(checkoutDto)
        res.send(output);
    } catch(err) {
        res.status(500).send(err);
    }
});