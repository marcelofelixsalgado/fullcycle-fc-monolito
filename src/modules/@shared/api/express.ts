import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript";

import { ProductModel } from "../../product-adm/repository/product.model";
import { ProductModelCatalog } from "../../store-catalog/repository/product.model";
import { ClientModel } from "../../client-adm/repository/client.model";
import { InvoiceModel } from "../../invoice/repository/invoice.model";
import { InvoiceAddressModel } from "../../invoice/repository/invoice.address.model";
import { InvoiceProductModel } from "../../invoice/repository/invoice.product.model";
import { CheckoutOrderModel } from "../../checkout/repository/checkout.order.model";
import { CheckoutOrderClientModel } from "../../checkout/repository/checkout.client.model";
import { CheckoutOrderProductsModel } from "../../checkout/repository/checkout.product.model";

import { productRoute } from "../../product-adm/routes/product.route";
import { productCatalogRoute } from "../../store-catalog/routes/product.route";
import { clientRoute } from "../../client-adm/routes/client.route";
import { checkoutRoute } from "../../checkout/routes/checkout.route";
import { invoiceRoute } from "../../invoice/routes/invoice.route";

export const app: Express = express();
app.use(express.json());
app.use("/products", productRoute);
app.use("/products-catalog", productCatalogRoute);
app.use("/clients", clientRoute);
app.use("/checkout", checkoutRoute);
app.use("/invoice", invoiceRoute);

export let sequelize: Sequelize;

async function setupDb() {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: ":memory:",
    logging: false,
  });
  await sequelize.addModels([ProductModel, ProductModelCatalog, ClientModel, InvoiceModel, InvoiceAddressModel, InvoiceProductModel, 
    CheckoutOrderModel, CheckoutOrderClientModel, CheckoutOrderProductsModel]);
  await sequelize.sync();
}
setupDb();
