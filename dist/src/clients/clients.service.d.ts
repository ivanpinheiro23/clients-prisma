import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
export declare class ClientsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createClientDto: CreateClientDto): Promise<{
        name: string;
        taxId: string;
        email: string | null;
        phone: string | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
    search(name: string): Promise<{
        name: string;
        taxId: string;
        email: string | null;
        phone: string | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }[]>;
    findAll(): Prisma.PrismaPromise<{
        name: string;
        taxId: string;
        email: string | null;
        phone: string | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }[]>;
    findOne(id: number): Promise<{
        name: string;
        taxId: string;
        email: string | null;
        phone: string | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
    update(id: number, updateClientDto: UpdateClientDto): Promise<{
        name: string;
        taxId: string;
        email: string | null;
        phone: string | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
    remove(id: number): Promise<{
        message: string;
    }>;
    private handlePrismaError;
}
