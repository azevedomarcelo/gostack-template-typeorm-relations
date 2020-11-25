import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Product from '../infra/typeorm/entities/Product';
import IProductsRepository from '../repositories/IProductsRepository';

interface IRequest {
  name: string;
  price: number;
  quantity: number;
}

@injectable()
class CreateProductService {
  constructor(
    @inject('IProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute({ name, price, quantity }: IRequest): Promise<Product> {
    const existingProduct = await this.productsRepository.findByName(name);

    if (existingProduct) {
      throw new AppError('Product exists already', 400);
    }

    return this.productsRepository.create({
      name,
      price,
      quantity,
    });
  }
}

export default CreateProductService;