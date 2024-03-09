import { Prisma } from "@prisma/client";
import prisma from "../../config/database/prisma";

export class UsersService {
  async create({ data }: Prisma.UserCreateArgs) {
    return await prisma.user.create({ data });
  }
}
