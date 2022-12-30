import Id from "../../../@shared/domain/value-object/id.value-object";
import Invoice from "../../domain/invoice.entity";
import Product from "../../domain/invoice.product.entity";
import FindInvoiceUseCase from "./find-invoice.usecase"

const product = new Product({
  id: new Id("11"),
  name: "Product 1",
  price: 100,
});

const invoice = new Invoice({
  id: new Id("1"),
  name: "Invoice 1",
  document: "Document 1",
  address: {
    street: "Street 1",
    number: "100",
    complement: "Complement 1",
    city: "City 1",
    state: "State 1",
    zipCode: "123456",
  },
  items: [product],
});

const MockRepository = () => {
    return {
      add: jest.fn(),
      find: jest.fn().mockReturnValue(Promise.resolve(invoice)),
    };
  };

describe("Find Invoice Usecase unit test", () => {
    it("should find an invoice", async () => {
        const repository = MockRepository();
        const usecase = new FindInvoiceUseCase(repository);

        const input = {
            id: "1",
          }

        const result = await usecase.execute(input);

        expect(repository.find).toHaveBeenCalled();
        expect(result.id).toEqual(input.id);
        expect(result.name).toEqual(invoice.name);
        expect(result.document).toEqual(invoice.document);
        expect(result.address.street).toEqual(invoice.address.street);
        expect(result.address.number).toEqual(invoice.address.number);
        expect(result.address.complement).toEqual(invoice.address.complement);
        expect(result.address.city).toEqual(invoice.address.city);
        expect(result.address.state).toEqual(invoice.address.state);
        expect(result.address.zipCode).toEqual(invoice.address.zipCode);

        expect(result.items[0].id).toEqual(product.id.id);
        expect(result.items[0].name).toEqual(product.name);
        expect(result.items[0].price).toEqual(product.price);
        expect(result.total).toEqual(1);
    });
});