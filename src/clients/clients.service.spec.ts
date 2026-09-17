import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ClientsService } from './clients.service';

describe('ClientsService', () => {
  let service: ClientsService;
  let prisma: {
    client: {
      create: jest.Mock;
      findMany: jest.Mock;
      findUnique: jest.Mock;
      update: jest.Mock;
      delete: jest.Mock;
    };
  };

  const client = {
    id: 1,
    name: 'Ana Souza',
    taxId: '00000000001',
    age: 30,
    email: 'ana.souza@example.com',
    phone: '+55 11 99999-0001',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(() => {
    prisma = {
      client: {
        create: jest.fn(),
        findMany: jest.fn(),
        findUnique: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      },
    };
    service = new ClientsService(prisma as never);
  });

  it('creates a client', async () => {
    const data = {
      name: client.name,
      taxId: client.taxId,
      age: client.age,
      email: client.email,
      phone: client.phone,
    };
    prisma.client.create.mockResolvedValue(client);

    await expect(service.create(data)).resolves.toEqual(client);
    expect(prisma.client.create).toHaveBeenCalledWith({ data });
  });

  it('lists clients ordered by id', async () => {
    prisma.client.findMany.mockResolvedValue([client]);

    await expect(service.findAll()).resolves.toEqual([client]);
    expect(prisma.client.findMany).toHaveBeenCalledWith({
      orderBy: { id: 'asc' },
    });
  });

  it('finds a client by id', async () => {
    prisma.client.findUnique.mockResolvedValue(client);

    await expect(service.findOne(client.id)).resolves.toEqual(client);
    expect(prisma.client.findUnique).toHaveBeenCalledWith({
      where: { id: client.id },
    });
  });

  it('throws when the client does not exist', async () => {
    prisma.client.findUnique.mockResolvedValue(null);

    await expect(service.findOne(999)).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });

  it('updates a client after confirming it exists', async () => {
    const data = { name: 'Ana Souza Atualizada' };
    prisma.client.findUnique.mockResolvedValue(client);
    prisma.client.update.mockResolvedValue({ ...client, ...data });

    await expect(service.update(client.id, data)).resolves.toMatchObject(data);
    expect(prisma.client.update).toHaveBeenCalledWith({
      where: { id: client.id },
      data,
    });
  });

  it('rejects creating a client who is 18 or younger', async () => {
    await expect(
      service.create({ name: client.name, taxId: client.taxId, age: 18 }),
    ).rejects.toBeInstanceOf(BadRequestException);
    expect(prisma.client.create).not.toHaveBeenCalled();
  });

  it('rejects updating a client to an age of 18 or younger', async () => {
    prisma.client.findUnique.mockResolvedValue(client);

    await expect(service.update(client.id, { age: 18 })).rejects.toBeInstanceOf(
      BadRequestException,
    );
    expect(prisma.client.update).not.toHaveBeenCalled();
  });

  it('removes a client after confirming it exists', async () => {
    prisma.client.findUnique.mockResolvedValue(client);
    prisma.client.delete.mockResolvedValue(client);

    await expect(service.remove(client.id)).resolves.toEqual({
      message: `Client with id ${client.id} deleted successfully`,
    });
    expect(prisma.client.delete).toHaveBeenCalledWith({
      where: { id: client.id },
    });
  });

  it('translates duplicate taxId errors into a conflict', async () => {
    const error = new Prisma.PrismaClientKnownRequestError('Duplicate', {
      code: 'P2002',
      clientVersion: '6.19.3',
    });
    prisma.client.create.mockRejectedValue(error);

    await expect(
      service.create({ name: client.name, taxId: client.taxId, age: client.age }),
    ).rejects.toBeInstanceOf(ConflictException);
  });
});
