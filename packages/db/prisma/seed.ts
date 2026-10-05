import { PrismaClient, TargetTier, TransactionType } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  const alex = await prisma.user.upsert({
    where: { email: 'alex@test.com' },
    update: {
      fullName: 'Alex Chen',
      preferredLang: 'Java',
      targetTier: TargetTier.FAANG,
      creditBalance: 3,
    },
    create: {
      email: 'alex@test.com',
      passwordHash: '$2a$10$wTfk1bJ1eO1b7m0U9G0BWe1k1K8g1hX9h1a9e9a1k1a9e9a1k1a9e',
      fullName: 'Alex Chen',
      preferredLang: 'Java',
      targetTier: TargetTier.FAANG,
      creditBalance: 3,
    },
  });
  console.log(`✅ Seeded user: ${alex.fullName} (${alex.email})`);

  const sarah = await prisma.user.upsert({
    where: { email: 'sarah@test.com' },
    update: {
      fullName: 'Sarah Jenkins',
      preferredLang: 'Python',
      targetTier: TargetTier.HIGH_GROWTH_STARTUP,
      creditBalance: 2,
    },
    create: {
      email: 'sarah@test.com',
      passwordHash: '$2a$10$wTfk1bJ1eO1b7m0U9G0BWe1k1K8g1hX9h1a9e9a1k1a9e9a1k1a9e',
      fullName: 'Sarah Jenkins',
      preferredLang: 'Python',
      targetTier: TargetTier.HIGH_GROWTH_STARTUP,
      creditBalance: 2,
    },
  });
  console.log(`✅ Seeded user: ${sarah.fullName} (${sarah.email})`);

  await prisma.creditLedger.create({
    data: {
      userId: alex.id,
      amount: 2,
      type: TransactionType.STARTER_GRANT,
      description: 'Starter grant: 2 credits awarded on registration',
    },
  });
  console.log(`💳 Seeded starter credit ledger entry for ${alex.fullName}`);

  await prisma.creditLedger.create({
    data: {
      userId: sarah.id,
      amount: 2,
      type: TransactionType.STARTER_GRANT,
      description: 'Starter grant: 2 credits awarded on registration',
    },
  });
  console.log(`💳 Seeded starter credit ledger entry for ${sarah.fullName}`);

  console.log('🎉 Database seeding completed successfully.');
}

main()
  .catch((e) => {
    console.error('❌ Error during database seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
