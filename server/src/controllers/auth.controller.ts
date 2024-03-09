import { Request, Response, Router } from "express";
import { AuthService } from "../services/auth/auth.service";
import { validate } from "../middlewares/zod";
import { ILoginUser, ISignupUser } from "../dto/auth.dto";

class AuthController {
  public routerHandler;
  private service = new AuthService();
  constructor() {
    this.routerHandler = Router();
    this.signUp();
    this.login();
    this.logout();
  }

  logout() {
    this.routerHandler.post(
      "/auth/logout",
      async (req: Request, res: Response) => {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).send({
          message: "Success",
        });
      }
    );
  }

  login() {
    this.routerHandler.post(
      "/auth/login",
      validate(ILoginUser),
      async (req: Request, res: Response) => {
        try {
          const token = await this.service.login(req.body);
          res.cookie("jwt", token, {
            maxAge: 24 * 60 * 60 * 1000, // 1d
            httpOnly: true,
            secure: true,
          });
          res.status(200).send({
            message: "Success",
          });
        } catch (error: any) {
          console.error(error);
          res.status(401).send(error.message);
        }
      }
    );
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
          res.status(401).send(error);
        }
      }
    );
  }
}

export default AuthController;
