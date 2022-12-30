import { Column, ForeignKey, HasOne, Model, PrimaryKey, Table } from "sequelize-typescript";
import { InvoiceModel } from "./invoice.model";

@Table({
  tableName: "invoice_products",
  timestamps: false,
})
export class InvoiceProductModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  id: string;

  @ForeignKey(() => InvoiceModel)
  @Column
  invoiceId: number;

  @Column({ allowNull: false })
  name: string; 

  @Column({ allowNull: false })
  price: number;
}