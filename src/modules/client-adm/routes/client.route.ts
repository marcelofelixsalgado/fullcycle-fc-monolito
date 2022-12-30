import express, { Request, Response } from "express";
import ClientAdmFacadeFactory from "../factory/facade.factory";

export const clientRoute = express.Router();

clientRoute.post("/", async (req: Request, res: Response) => {
    const clientFacade = ClientAdmFacadeFactory.create();

    try {
        const clientDto = {
            id: req.body.id,
            name: req.body.name,
            email: req.body.email,
            address: req.body.address,
        };
        const output = await clientFacade.add(clientDto)
        res.send(output);
    } catch(err) {
        res.status(500).send(err);
    }
});