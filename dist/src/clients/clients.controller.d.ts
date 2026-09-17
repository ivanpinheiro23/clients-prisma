import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateEmailDto } from './dto/update-email.dto';
import { UpdateClientDto } from './dto/update-client.dto';
export declare class ClientsController {
    private readonly clientsService;
    constructor(clientsService: ClientsService);
    create(createClientDto: CreateClientDto): Promise<{
        name: string;
        taxId: string;
        age: number | null;
        email: string | null;
        phone: string | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        name: string;
        taxId: string;
        age: number | null;
        email: string | null;
        phone: string | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }[]>;
    search(name: string): Promise<{
        name: string;
        taxId: string;
        age: number | null;
        email: string | null;
        phone: string | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }[]>;
    findOne(id: number): Promise<{
        name: string;
        taxId: string;
        age: number | null;
        email: string | null;
        phone: string | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
    update(id: number, updateClientDto: UpdateClientDto): Promise<{
        name: string;
        taxId: string;
        age: number | null;
        email: string | null;
        phone: string | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
    updateEmail(id: number, updateEmailDto: UpdateEmailDto): Promise<{
        name: string;
        taxId: string;
        age: number | null;
        email: string | null;
        phone: string | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
