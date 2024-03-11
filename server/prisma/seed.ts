import { PrismaClient } from "@prisma/client";
import { userData, contactsData } from "./seed/seeding-data";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();
async function main() {
  const password = await bcrypt.hash(
    userData.password,
    +(process.env.HASH_ROUNDS || 10)
  );
  const user = await prisma.user.create({
    data: { ...userData, password },
  });
  console.log({ user });

  const contacts = await prisma.contact.createMany({
    data: contactsData.map((contact) => ({ ...contact, uid: user.id })),
  });
  console.log({ contacts });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
