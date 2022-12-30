import GenerateInvoiceUseCase from "./generate-invoice.usecase"

const MockRepository = () => {
    return {
      add: jest.fn(),
      find: jest.fn(),
    };
  };

describe("Generate Invoice Usecase unit test", () => {
    it("should generate an invoice", async () => {
        const repository = MockRepository();
        const usecase = new GenerateInvoiceUseCase(repository);

        const input = {
            name: "Invoice 1",
            document: "Document 1",
            street: "Street 1",
            number: "100",
            complement: "Complement 1",
            city: "City 1",
            state: "State 1",
            zipCode: "123456",
            items: [{
                id: "11",
                name: "Product 1",
                price: 100,
            }],
          }

        const result = await usecase.execute(input);

        expect(repository.add).toHaveBeenCalled();
        expect(result.id).toBeDefined();
        expect(result.name).toEqual(input.name);
        expect(result.document).toEqual(input.document);
        expect(result.street).toEqual(input.street);
        expect(result.number).toEqual(input.number);
        expect(result.complement).toEqual(input.complement);
        expect(result.city).toEqual(input.city);
        expect(result.state).toEqual(input.state);
        expect(result.zipCode).toEqual(input.zipCode);
        expect(result.items[0].id).toBeDefined();
        expect(result.items[0].name).toEqual(input.items[0].name);
        expect(result.items[0].price).toEqual(input.items[0].price);
        expect(result.total).toEqual(1);
    });
});