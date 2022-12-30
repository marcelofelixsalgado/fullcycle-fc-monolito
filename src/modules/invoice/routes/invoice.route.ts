import express, { Request, Response } from "express";
import InvoiceFacadeFactory from "../factory/invoice.facade.factory";

export const invoiceRoute = express.Router();

invoiceRoute.post("/", async (req: Request, res: Response) => {
    const invoiceFacade = InvoiceFacadeFactory.create();

    try {
        const invoiceInputDto = {
            name: req.body.name,
            document: req.body.document,
            street: req.body.street,
            number: req.body.number,
            complement: req.body.complement,
            city: req.body.city,
            state: req.body.state,
            zipCode: req.body.zipCode,
            items: req.body.items.map((item: any) => ({
              id: item.id,
              name: item.name,
              price: item.price,
            })),
        };
        const output = await invoiceFacade.generate(invoiceInputDto)
        res.send(output);
    } catch(err) {
        res.status(500).send(err);
    }
});

invoiceRoute.get("/:id", async (req: Request, res: Response) => {
    const invoiceFacade = await InvoiceFacadeFactory.create();

    try {
        const invoiceInputDto = {
            id: req.params.id,
        }

        const output = await invoiceFacade.find(invoiceInputDto)
        res.send(output);
    } catch(err) {
        res.status(500).send(err);
    }
});