import { Column, ForeignKey, HasMany, HasOne, Model, PrimaryKey, Table } from "sequelize-typescript";
import { InvoiceAddressModel } from "./invoice.address.model";
import { InvoiceProductModel } from "./invoice.product.model";

@Table({
  tableName: "invoices",
  timestamps: false,
})
export class InvoiceModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  id: string;

  @Column({ allowNull: false })
  name: string; 

  @Column({ allowNull: false })
  document: string;

  @HasOne(() => InvoiceAddressModel)
  address: InvoiceAddressModel;

  @HasMany(() => InvoiceProductModel)
  items: InvoiceProductModel[];
}