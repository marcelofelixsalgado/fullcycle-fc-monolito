import Id from "../../@shared/domain/value-object/id.value-object";
import Product from "../domain/product.entity";
import ProductGateway from "../gateway/product.gateway";
import { ProductModelCatalog } from "./product.model";

export default class ProductRepository implements ProductGateway {
  async add(product: Product): Promise<void> {

    await ProductModelCatalog.create({
      id: product.id.id,
      name: product.name,
      description: product.description,
      salesPrice: product.salesPrice,
    });
  }

  async findAll(): Promise<Product[]> {
    const products = await ProductModelCatalog.findAll();

    return products.map(
      (product) =>
        new Product({
          id: new Id(product.id),
          name: product.name,
          description: product.description,
          salesPrice: product.salesPrice,
        })
    );
  }

  async find(id: string): Promise<Product> {
    const product = await ProductModelCatalog.findOne({
      where: { id },
    });

    if (!product) {
      throw new Error(`Product with id ${id} not found`);
    }

    return new Product({
      id: new Id(product.id),
      name: product.name,
      description: product.description,
      salesPrice: product.salesPrice,
    });
  }
}
