import { Column, ForeignKey, HasMany, HasOne, Model, PrimaryKey, Table, BelongsTo } from "sequelize-typescript";
import { CheckoutOrderModel } from "./checkout.order.model";

@Table({
    tableName: "orders_products",
    timestamps: false,
  })
  export class CheckoutOrderProductsModel extends Model {

    @ForeignKey(() => CheckoutOrderModel)
    @Column
    orderId: string;

    @BelongsTo(() => CheckoutOrderModel)
    order: CheckoutOrderModel;   

    @PrimaryKey
    @Column({ allowNull: false })
    id: string;
        
    @Column({ allowNull: false })
    name: string;

    @Column({ allowNull: false })
    description: string;

    @Column({ allowNull: false })
    salesPrice: number;    
};  