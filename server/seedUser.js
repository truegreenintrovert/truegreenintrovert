import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const email = '141312q@gmail.com';
  const plainPassword = 'Yogesh@1231';

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    console.log(`User with email ${email} already exists.`);
    return;
  }

  // Hash the password (using a salt round of 10)
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(plainPassword, salt);

  // Create the user
  const user = await prisma.user.create({
    data: {
      email: email,
      password: hashedPassword,
      name: 'Admin User', // Default name
    },
  });

  console.log(`User created successfully with ID: ${user.id} and email: ${user.email}`);
}

main()
  .catch((e) => {
    console.error('Error seeding user:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
