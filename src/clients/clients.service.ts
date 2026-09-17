import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Injectable()
export class ClientsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createClientDto: CreateClientDto) {
    if (createClientDto.age !== undefined) {
      
      this.validateAge(createClientDto.age);
    }

    try {
      return await this.prisma.client.create({
        data: createClientDto,
      });
    } catch (error) {
      this.handlePrismaError(error);
    }
  }

  async search(name: string) {
    return this.prisma.client.findMany({
      where: {
        name: {
          contains: name,
          mode: 'insensitive',
        },
      },
    });
  }
  
  findAll() {
    return this.prisma.client.findMany({
      orderBy: { id: 'asc' },
    });
  }

  async findOne(id: number) {
    const client = await this.prisma.client.findUnique({
      where: { id },
    });

    if (!client) {
      throw new NotFoundException(`Client with id ${id} was not found`);
    }

    return client;
  }

  async update(id: number, updateClientDto: UpdateClientDto) {
    await this.findOne(id);
    if (updateClientDto.age !== undefined) {
      this.validateAge(updateClientDto.age);
    }

    try {
      return await this.prisma.client.update({
        where: { id },
        data: updateClientDto,
      });
    } catch (error) {
      this.handlePrismaError(error);
    }
  }

  async remove(id: number) {
    await this.findOne(id);

    await this.prisma.client.delete({
      where: { id },
    });

    return { message: `Client with id ${id} deleted successfully` };
  }

  private handlePrismaError(error: unknown): never {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      throw new ConflictException('A client with this taxId already exists');
    }

    throw error;
  }

  private validateAge(age: number): void {
    if (age <= 18) {
      throw new BadRequestException('Client must be 18 or older');
    }
  }
}
