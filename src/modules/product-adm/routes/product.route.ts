import express, { Request, Response } from "express";
import ProductAdmFacadeFactory from "../factory/facade.factory";

export const productRoute = express.Router();

productRoute.post("/", async (req: Request, res: Response) => {
    const productFacade = ProductAdmFacadeFactory.create();

    try {
        const productDto = {
            id: req.body.id,
            name: req.body.name,
            description: req.body.description,
            purchasePrice: req.body.purchasePrice,
            stock: req.body.stock,
        };
        const output = await productFacade.addProduct(productDto);
        res.send(output);
    } catch(err) {
        res.status(500).send(err);
    }
});