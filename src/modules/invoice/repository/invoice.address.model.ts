import { Column, ForeignKey, HasMany, HasOne, Model, PrimaryKey, Table, BelongsTo } from "sequelize-typescript";
import { InvoiceModel } from "./invoice.model";

@Table({
    tableName: "invoice_address",
    timestamps: false,
})
export class InvoiceAddressModel extends Model {
    @ForeignKey(() => InvoiceModel)
    @Column
    invoiceId: string;

    @BelongsTo(() => InvoiceModel)
    invoice: InvoiceModel;    

    @Column({ allowNull: false })
    street: string;

    @Column({ allowNull: false })
    number: string;

    @Column({ allowNull: false })
    complement: string;
    
    @Column({ allowNull: false })
    city: string;

    @Column({ allowNull: false })
    state: string;

    @Column({ allowNull: false })
    zipCode: string;    
}