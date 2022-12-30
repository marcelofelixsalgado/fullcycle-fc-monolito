import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import StoreCatalogFacadeInterface, {
  AddProductFacadeInputDto,
  FindAllStoreCatalogFacadeOutputDto,
  FindStoreCatalogFacadeInputDto,
  FindStoreCatalogFacadeOutputDto,
} from "./store-catalog.facade.interface";

export interface UseCasesProps {
  addUseCase: UseCaseInterface;
  findUseCase: UseCaseInterface;
  findAllUsecase: UseCaseInterface;
}

export default class StoreCatalogFacade implements StoreCatalogFacadeInterface {
  private _addUsecase: UseCaseInterface;
  private _findUsecase: UseCaseInterface;
  private _findAllUsecase: UseCaseInterface;

  constructor(usecasesProps: UseCasesProps) {
    this._addUsecase = usecasesProps.addUseCase;
    this._findUsecase = usecasesProps.findUseCase;
    this._findAllUsecase = usecasesProps.findAllUsecase;
  }

  async add(input: AddProductFacadeInputDto): Promise<void> {
    return this._addUsecase.execute(input);
  }

  async find(
    id: FindStoreCatalogFacadeInputDto
  ): Promise<FindStoreCatalogFacadeOutputDto> {
    const product = await this._findUsecase.execute(id);
    return product;
  }

  async findAll(): Promise<FindAllStoreCatalogFacadeOutputDto> {
    const products = await this._findAllUsecase.execute();
    return products;
  }
}
