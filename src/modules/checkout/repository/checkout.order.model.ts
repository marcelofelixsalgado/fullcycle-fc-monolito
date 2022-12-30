import { Column, HasMany, HasOne, Model, PrimaryKey, Table } from "sequelize-typescript";
import { CheckoutOrderClientModel } from "./checkout.client.model";
import { CheckoutOrderProductsModel } from "./checkout.product.model";

@Table({
    tableName: "orders",
    timestamps: false,
  })
  export class CheckoutOrderModel extends Model {
    @PrimaryKey
    @Column({ allowNull: false })
    id: string;

    @HasOne(() => CheckoutOrderClientModel)
    client: CheckoutOrderClientModel;

    @HasMany(() => CheckoutOrderProductsModel)
    products: CheckoutOrderProductsModel[];

    @Column({ allowNull: false })
    status: string;    
};  