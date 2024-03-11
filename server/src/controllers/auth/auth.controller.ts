import { NextFunction, Request, Response, Router } from "express";
import { AuthService } from "../../services/auth/auth.service";
import { validate } from "../../middlewares/zod";
import { ILoginUser, ISignupUser } from "../../dto/auth.dto";
import { Get, Post, Route, Tags } from "tsoa";
import errorHandler from "../../middlewares/errors";
import { authorization } from "../../middlewares/auth";

@Route("auth")
@Tags("Auth")
class AuthController {
  public routerHandler;
  private service = new AuthService();
  constructor() {
    this.routerHandler = Router();
    this.signUp();
    this.login();
    this.logout();
    this.verifyToken();
  }

  @Get("/verifyToken")
  verifyToken() {
    this.routerHandler.get(
      "/auth/verifyToken",
      authorization,
      async (req: Request, res: Response) => {
        res.status(200).send({
          message: "Success",
          success: true,
        });
      }
    );
  }

  @Post("/logout")
  logout() {
    this.routerHandler.post(
      "/auth/logout",
      async (req: Request, res: Response) => {
        res.cookie("accessToken", "", { maxAge: 0 });
        res.cookie("refreshToken", "", { maxAge: 0 });
        res.status(200).send({
          message: "Success",
          success: true,
        });
      }
    );
  }

  @Post("/login")
  login() {
    this.routerHandler.post(
      "/auth/login",
      validate(ILoginUser),
      async (req: Request, res: Response) => {
        try {
          const token = await this.service.login(req.body);
          res.cookie("accessToken", token, {
            maxAge: 24 * 60 * 60 * 1000,
            sameSite: false,
          });
          res.status(200).send({
            message: "Success",
            success: true,
            accessToken: token,
            refreshToken: token,
          });
        } catch (error: any) {
          console.error(error);
          res.status(401).send({
            message: "Invalid Credentials",
            success: false,
          });
        }
      }
    );
  }

  @Post("/signUp")
  signUp() {
    this.routerHandler.post(
      "/auth/signUp",
      validate(ISignupUser),
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const newUser = await this.service.signUp(req.body);
          res.send({
            message: "Success",
            success: true,
            results: {
              ...newUser,
            },
          });
        } catch (error) {
          next(error);
        }
      },
      errorHandler
    );
  }
}

export default AuthController;
