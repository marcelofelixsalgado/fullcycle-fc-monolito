import Id from "../../../@shared/domain/value-object/id.value-object";
import InvoiceGateway from "../../gateway/invoice.gateway";
import { FindInvoiceUseCaseInputDto, FindInvoiceUseCaseOutputDto } from "./find-invoice.usecase.dto";
import Product from "../../domain/invoice.product.entity";

export default class FindInvoiceUseCase {
    private _invoiceRepository: InvoiceGateway;

    constructor(invoiceRepository: InvoiceGateway) {
        this._invoiceRepository = invoiceRepository;
    }

    async execute(input: FindInvoiceUseCaseInputDto): Promise<FindInvoiceUseCaseOutputDto> {

        const invoice = await this._invoiceRepository.find(input.id);

        const invoiceOutputProducts: Product[] = []; 
        invoice.items.forEach(await function(invoiceProduct){
            const product = new Product({
                id: new Id(invoiceProduct.id.id),
                name: invoiceProduct.name,
                price: invoiceProduct.price,
            });
            invoiceOutputProducts.push(product);
        });

        return {
            id: invoice.id.id,
            name: invoice.name,
            document: invoice.document,
            address: {
                street: invoice.address.street,
                number: invoice.address.number,
                complement: invoice.address.complement,
                city: invoice.address.city,
                state: invoice.address.state,
                zipCode: invoice.address.zipCode,
            },
            items: invoice.items.map((item) => ({
                id: item.id.id,
                name: item.name,
                price: item.price,                
            })),
            total: invoice.items.length,
            createdAt: invoice.createdAt,
        }
    }
}