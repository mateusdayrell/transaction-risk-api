// // prisma/seed.ts
// import { PrismaClient } from '../generated/prisma';

// const prisma = new PrismaClient();

// async function main() {
//   const roles = ['Admin', 'User'];

//   for (const roleName of roles) {
//     await prisma.role.upsert({
//       where: { name: roleName },
//       update: {},
//       create: { name: roleName },
//     });
//   }

//   console.log('Roles seeded:', roles);
// }

// main()
//   .then(async () => {
//     await prisma.$disconnect();
//     process.exit(1);
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });
