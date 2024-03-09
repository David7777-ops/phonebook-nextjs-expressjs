import { Prisma } from "@prisma/client";
import prisma from "../../config/database/prisma";

class ContactsServie {
  async create({ data }: Prisma.ContactCreateArgs) {
    return await prisma.contact.create({ data });
  }
}

export default ContactsServie;
