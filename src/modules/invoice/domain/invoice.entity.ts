import BaseEntity from "../../@shared/domain/entity/base.entity";
import AggregateRoot from "../../@shared/domain/entity/aggregate-root.interface";
import Id from "../../@shared/domain/value-object/id.value-object";
import Product from "./invoice.product.entity";

type InvoiceProps = {
    id?: Id
    name: string
    document: string
    address: Address
    items: Product[]
    createdAt?: Date
    updatedAt?: Date
}

type Address = {
    street: string;
    number: string;
    complement: string;
    city: string;
    state: string;
    zipCode: string;
}

export default class Invoice extends BaseEntity implements AggregateRoot {
    private _name: string;
    private _document: string
    private _address: Address
    private _items: Product[]

    constructor(props: InvoiceProps) {
        super(props.id)
        this._name = props.name;
        this._document = props.document;
        this._address = props.address;
        this._items = props.items;
    }

    get name(): string {
        return this._name;
    }
    
    get document(): string {
        return this._document;
    }    
  
    get address(): Address {
        return this._address;
    } 

    get items(): Product[] {
        return this._items;
    } 

    set name(name: string) {
        this._name = name;
    }    
   
    set document(document: string) {
        this._document = document;
    }       
      
    set address(address: Address) {
        this._address = address;
    }
    
    set items(items: Product[]) {
        this._items = items;
    }      
}