"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientsService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../prisma/prisma.service");
let ClientsService = class ClientsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createClientDto) {
        if (createClientDto.age !== undefined) {
            this.validateAge(createClientDto.age);
        }
        try {
            return await this.prisma.client.create({
                data: createClientDto,
            });
        }
        catch (error) {
            this.handlePrismaError(error);
        }
    }
    async search(name) {
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
    async findOne(id) {
        const client = await this.prisma.client.findUnique({
            where: { id },
        });
        if (!client) {
            throw new common_1.NotFoundException(`Client with id ${id} was not found`);
        }
        return client;
    }
    async update(id, updateClientDto) {
        await this.findOne(id);
        if (updateClientDto.age !== undefined) {
            this.validateAge(updateClientDto.age);
        }
        try {
            return await this.prisma.client.update({
                where: { id },
                data: updateClientDto,
            });
        }
        catch (error) {
            this.handlePrismaError(error);
        }
    }
    async remove(id) {
        await this.findOne(id);
        await this.prisma.client.delete({
            where: { id },
        });
        return { message: `Client with id ${id} deleted successfully` };
    }
    handlePrismaError(error) {
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError &&
            error.code === 'P2002') {
            throw new common_1.ConflictException('A client with this taxId already exists');
        }
        throw error;
    }
    validateAge(age) {
        if (age <= 18) {
            throw new common_1.BadRequestException('Client must be 18 or older');
        }
    }
};
exports.ClientsService = ClientsService;
exports.ClientsService = ClientsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ClientsService);
//# sourceMappingURL=clients.service.js.map