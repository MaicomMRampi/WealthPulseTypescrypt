const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    try {
        await prisma.$connect();
        console.log("Conectado com sucesso ao banco de dados!");
    } catch (error) {
        console.error("Erro ao conectar ao banco de dados:", error);
    } finally {
        await prisma.$disconnect();
    }
}

main();

module.exports = prisma;