import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import CheckoutFacadeInterface, {
    GenerateCheckoutFacadeInputDto,
    GenerateCheckoutFacadeOutputDto } from "./checkout.facade.interface";

export interface UseCaseProps {
    generateUsecase: UseCaseInterface;
}
  
export default class CheckoutFacade implements CheckoutFacadeInterface {
    private _generateUsecase: UseCaseInterface;
  
    constructor(usecaseProps: UseCaseProps) {
      this._generateUsecase = usecaseProps.generateUsecase;
    }
  
    async generate(input: GenerateCheckoutFacadeInputDto): Promise<GenerateCheckoutFacadeOutputDto> {
      return await this._generateUsecase.execute(input);
    }
}
  