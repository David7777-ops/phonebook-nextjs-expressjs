import { Prisma } from "@prisma/client";
import prisma from "../../config/database/prisma";

export class UsersService {
  async findUserByEmail(email: string) {
    return await prisma.user.findUniqueOrThrow({
      where: {
        email,
      },
    });
  }

  async create({ data }: Prisma.UserCreateArgs) {
    return await prisma.user.create({ data });
  }
}
