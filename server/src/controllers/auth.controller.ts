import { Request, Response, Router } from "express";
import { AuthService } from "../services/auth/auth.service";
import { validate } from "../middlewares/zod";
import { ISignupUser } from "../dto/auth.dto";

class AuthController {
  public routerHandler;
  private service = new AuthService();
  constructor() {
    this.routerHandler = Router();
    this.signUp();
  }

  signUp() {
    this.routerHandler.post(
      "/auth/signUp",
      validate(ISignupUser),
      async (req: Request, res: Response) => {
        try {
          const newUser = await this.service.signUp(req.body);
          res.send(newUser);
        } catch (error) {
          console.error(error);
          res.status(400).send(error);
        }
      }
    );
  }
}

export default AuthController;
