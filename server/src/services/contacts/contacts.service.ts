import { Prisma } from "@prisma/client";
import prisma from "../../config/database/prisma";

class ContactsServie {
  async create({ data }: Prisma.ContactCreateArgs) {
    return await prisma.contact.create({ data });
  }
  async findUserContacts({
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
  async update({
    filters,
    data,
  }: {
    filters: {
      uid: string;
      cid: string;
    };
    data: Prisma.ContactUncheckedUpdateInput;
  }) {
    const { uid, cid } = filters;
    return await prisma.contact.update({
      where: {
        uid,
        id: cid,
      },
      data,
    });
  }

  async findUnique({
    filters,
  }: {
    filters: {
      uid: string;
      cid: string;
    };
  }) {
    const { uid, cid } = filters;
    return await prisma.contact.findUnique({
      where: {
        uid,
        id: cid,
      },
    });
  }

  async delete({
    filters,
  }: {
    filters: {
      uid: string;
      cid: string;
    };
  }) {
    const { uid, cid } = filters;
    return await prisma.contact.delete({
      where: {
        uid,
        id: cid,
      },
    });
  }
}

export default ContactsServie;
