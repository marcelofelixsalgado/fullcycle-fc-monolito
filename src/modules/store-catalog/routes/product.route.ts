import express, { Request, Response } from "express";
import ProductAdmFacadeFactory from "../factory/facade.factory";

export const productCatalogRoute = express.Router();

productCatalogRoute.post("/", async (req: Request, res: Response) => {
    const productFacade = ProductAdmFacadeFactory.create();

    try {
        const productDto = {
            id: req.body.id,
            name: req.body.name,
            description: req.body.description,
            salesPrice: req.body.salesPrice,
        };
        const output = await productFacade.add(productDto);
        res.send(output);
    } catch(err) {
        res.status(500).send(err);
    }
});