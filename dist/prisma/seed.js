"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const clients = [
    { name: 'Ana Souza', taxId: '00000000001', email: 'ana.souza@example.com', phone: '+55 11 99999-0001' },
    { name: 'Bruno Oliveira', taxId: '00000000002', email: 'bruno.oliveira@example.com', phone: '+55 11 99999-0002' },
    { name: 'Carla Santos', taxId: '00000000003', email: 'carla.santos@example.com', phone: '+55 11 99999-0003' },
    { name: 'Diego Pereira', taxId: '00000000004', email: 'diego.pereira@example.com', phone: '+55 11 99999-0004' },
    { name: 'Eduarda Costa', taxId: '00000000005', email: 'eduarda.costa@example.com', phone: '+55 11 99999-0005' },
    { name: 'Felipe Rodrigues', taxId: '00000000006', email: 'felipe.rodrigues@example.com', phone: '+55 11 99999-0006' },
    { name: 'Gabriela Almeida', taxId: '00000000007', email: 'gabriela.almeida@example.com', phone: '+55 11 99999-0007' },
    { name: 'Henrique Martins', taxId: '00000000008', email: 'henrique.martins@example.com', phone: '+55 11 99999-0008' },
    { name: 'Isabela Ferreira', taxId: '00000000009', email: 'isabela.ferreira@example.com', phone: '+55 11 99999-0009' },
    { name: 'Joao Carvalho', taxId: '00000000010', email: 'joao.carvalho@example.com', phone: '+55 11 99999-0010' },
    { name: 'Karen Gomes', taxId: '00000000011', email: 'karen.gomes@example.com', phone: '+55 11 99999-0011' },
    { name: 'Lucas Ribeiro', taxId: '00000000012', email: 'lucas.ribeiro@example.com', phone: '+55 11 99999-0012' },
    { name: 'Mariana Mendes', taxId: '00000000013', email: 'mariana.mendes@example.com', phone: '+55 11 99999-0013' },
    { name: 'Nicolas Barbosa', taxId: '00000000014', email: 'nicolas.barbosa@example.com', phone: '+55 11 99999-0014' },
    { name: 'Olivia Teixeira', taxId: '00000000015', email: 'olivia.teixeira@example.com', phone: '+55 11 99999-0015' },
    { name: 'Paulo Moreira', taxId: '00000000016', email: 'paulo.moreira@example.com', phone: '+55 11 99999-0016' },
    { name: 'Rafaela Nunes', taxId: '00000000017', email: 'rafaela.nunes@example.com', phone: '+55 11 99999-0017' },
    { name: 'Samuel Lima', taxId: '00000000018', email: 'samuel.lima@example.com', phone: '+55 11 99999-0018' },
    { name: 'Tatiane Cardoso', taxId: '00000000019', email: 'tatiane.cardoso@example.com', phone: '+55 11 99999-0019' },
    { name: 'Victor Fernandes', taxId: '00000000020', email: 'victor.fernandes@example.com', phone: '+55 11 99999-0020' },
];
async function main() {
    for (const client of clients) {
        await prisma.client.upsert({
            where: { taxId: client.taxId },
            update: client,
            create: client,
        });
    }
    console.log(`${clients.length} clients seeded successfully.`);
}
main()
    .catch((error) => {
    console.error(error);
    process.exitCode = 1;
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map