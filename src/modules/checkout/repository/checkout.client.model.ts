import { Column, ForeignKey, HasMany, HasOne, Model, PrimaryKey, Table, BelongsTo } from "sequelize-typescript";
import { CheckoutOrderModel } from "./checkout.order.model";

@Table({
    tableName: "orders_client",
    timestamps: false,
  })
  export class CheckoutOrderClientModel extends Model {
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
    email: string;

    @Column({ allowNull: false })
    address: string;    
};  