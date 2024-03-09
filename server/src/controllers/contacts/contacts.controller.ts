import { Response, Router } from "express";
import ContactsServie from "../../services/contacts/contacts.service";
import { validate } from "../../middlewares/zod";
import { ICreateContact, IUpdateContact } from "../../dto/contacts.dto";
import { IGetUserAuthInfoRequest, authorization } from "../../middlewares/auth";

class ContactsController {
  public routerHandler;
  private service = new ContactsServie();
  constructor() {
    this.routerHandler = Router();
    this.create();
    this.findMany();
    this.update();
    this.findOne();
    this.delete();
  }

  async delete() {
    this.routerHandler.delete(
      "/contacts/:id",
      authorization,
      async (req: IGetUserAuthInfoRequest, res: Response) => {
        const cid = req.params.id;
        try {
          const contact = await this.service.delete({
            filters: {
              uid: req.user.id,
              cid,
            },
          });
          res.send(contact);
        } catch (error: any) {
          console.log(error);
          res.sendStatus(400);
        }
      }
    );
  }

  async update() {
    this.routerHandler.put(
      "/contacts/:id",
      authorization,
      validate(IUpdateContact),
      async (req: IGetUserAuthInfoRequest, res: Response) => {
        const { ...data } = req.body;
        const cid = req.params.id;
        try {
          const contact = await this.service.update({
            filters: {
              uid: req.user.id,
              cid,
            },
            data,
          });
          res.send(contact);
        } catch (error: any) {
          console.log(error);
          res.sendStatus(400);
        }
      }
    );
  }

  async findOne() {
    this.routerHandler.get(
      "/contacts/:id",
      authorization,
      async (req: IGetUserAuthInfoRequest, res: Response) => {
        const cid = req.params.id;
        try {
          const contact = await this.service.findUnique({
            filters: {
              uid: req.user.id,
              cid,
            },
          });
          res.send(contact);
        } catch (error: any) {
          console.log(error);
          res.sendStatus(400);
        }
      }
    );
  }

  async findMany() {
    this.routerHandler.get(
      "/contacts",
      authorization,
      async (req: IGetUserAuthInfoRequest, res: Response) => {
        let limit = 10;
        let page = 1;
        if (req.query) {
          if (req.query.limit) limit = +req.query.limit;
          if (req.query.page) page = +req.query.page;
        }
        try {
          const contacts = await this.service.findUserContacts({
            filters: {
              uid: req.user.id,
            },
            pagination: {
              limit,
              page,
            },
          });
          res.send(contacts);
        } catch (error: any) {
          console.log(error);
          res.sendStatus(400);
        }
      }
    );
  }
  async create() {
    this.routerHandler.post(
      "/contacts",
      authorization,
      validate(ICreateContact),
      async (req: IGetUserAuthInfoRequest, res: Response) => {
        try {
          const newContact = await this.service.create({
            data: {
              ...req.body,
              uid: req.user.id,
            },
          });
          res.send(newContact);
        } catch (error: any) {
          res.status(400).send(error);
        }
      }
    );
  }
}

export default ContactsController;
