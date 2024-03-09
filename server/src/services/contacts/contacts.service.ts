import { Prisma } from "@prisma/client";
import prisma from "../../config/database/prisma";

class ContactsServie {
  async create({ data }: Prisma.ContactCreateArgs) {
    return await prisma.contact.create({ data });
  }
  async findUserClients({
    filters,
    pagination,
  }: {
    filters: {
      uid: string;
    };
    pagination: {
      limit: number;
      page: number;
    };
  }) {
    const { uid } = filters;
    const { limit, page } = pagination;
    const offset = (page - 1) * limit;
    return await prisma.contact.findMany({
      where: {
        uid,
      },
      take: limit,
      skip: offset,
    });
  }
}

export default ContactsServie;
