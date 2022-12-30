// DTO Generate
export interface GenerateCheckoutFacadeInputDto {
  clientId: string;
  products: {
    productId: string;
  }[];
}
  
  export interface GenerateCheckoutFacadeOutputDto {
    id: string;
    total: number;
    products: {
      productId: string;
    }[];
  }

export default interface CheckoutFacadeInterface {
  generate(input: GenerateCheckoutFacadeInputDto): Promise<GenerateCheckoutFacadeOutputDto>;
}