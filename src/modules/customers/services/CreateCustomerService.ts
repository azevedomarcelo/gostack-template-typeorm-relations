import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Customer from '../infra/typeorm/entities/Customer';
import ICustomersRepository from '../repositories/ICustomersRepository';

interface IRequest {
  name: string;
  email: string;
}

@injectable()
class CreateCustomerService {
  constructor(
    @inject('ICustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute({ name, email }: IRequest): Promise<Customer> {
    // TODO
    // Verificar se já existe o email do Cliente cadastrado
    const existingCustomer = await this.customersRepository.findByEmail(email);
    // Se existir apresentar erro
    if (existingCustomer) {
      throw new AppError('Cliente já consta na base de dados');
    }

    return this.customersRepository.create({
      email,
      name,
    });
  }
}

export default CreateCustomerService;
