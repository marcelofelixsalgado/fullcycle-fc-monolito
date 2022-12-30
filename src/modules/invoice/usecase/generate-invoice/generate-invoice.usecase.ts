import Id from "../../../@shared/domain/value-object/id.value-object";
import Invoice from "../../domain/invoice.entity";
import InvoiceGateway from "../../gateway/invoice.gateway";
import { GenerateInvoiceUseCaseInputDto, GenerateInvoiceUseCaseOutputDto } from "./generate-invoice.usecase.dto";
import Product from "../../domain/invoice.product.entity";

export default class GenerateInvoiceUseCase {
    private _invoiceRepository: InvoiceGateway;

    constructor(invoiceRepository: InvoiceGateway) {
        this._invoiceRepository = invoiceRepository;
    }

    async execute(input: GenerateInvoiceUseCaseInputDto): Promise<GenerateInvoiceUseCaseOutputDto> {

        const invoiceProducts: Product[] = []; 
        input.items.forEach(async function(invoiceProductModel){
            const product = new Product({
                id: new Id(invoiceProductModel.id),
                name: invoiceProductModel.name,
                price: invoiceProductModel.price,
            });
            invoiceProducts.push(product)
        });

        const props = {
            id: new Id(),
            name: input.name,
            document: input.document,
            address: {
                street: input.street,
                number: input.number,
                complement: input.complement,
                city: input.city,
                state: input.state,
                zipCode: input.zipCode,
            },
            items: invoiceProducts,
        };

        const invoice = new Invoice(props);

        await this._invoiceRepository.add(invoice);

        const invoiceOutputProducts: Product[] = []; 
        invoice.items.forEach(async function(invoiceProduct){
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
            street: invoice.address.street,
            number: invoice.address.number,
            complement: invoice.address.complement,
            city: invoice.address.city,
            state: invoice.address.state,
            zipCode: invoice.address.zipCode,
            items: invoice.items.map((item) => ({
                id: item.id.id,
                name: item.name,
                price: item.price,                
            })),
            total: invoice.items.length,
        }
    }
}