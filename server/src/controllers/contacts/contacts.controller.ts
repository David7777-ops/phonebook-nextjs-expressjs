import { Response, Router } from "express";
import ContactsServie from "../../services/contacts/contacts.service";
import { validate } from "../../middlewares/zod";
import { ICreateContact } from "../../dto/contacts.dto";
import { IGetUserAuthInfoRequest, authorization } from "../../middlewares/auth";

class ContactsController {
  public routerHandler;
  private service = new ContactsServie();
  constructor() {
    this.routerHandler = Router();
    this.create();
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
