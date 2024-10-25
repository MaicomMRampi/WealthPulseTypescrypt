const { PrismaClient } = require('@prisma/client');

let prisma;
if (process.env.NODE_ENV === 'production') {
    prisma = new PrismaClient();
} else {
    if (!global.cachedPrisma) {
        global.cachedPrisma = new PrismaClient();
    }
    prisma = global.cachedPrisma;
}

module.exports = prisma;
