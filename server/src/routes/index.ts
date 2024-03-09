import { Router } from "express";
import AuthController from "../controllers/auth/auth.controller";

const routes = Router();

routes.get("/api", async (req, res) => {
  res.send("This is route api version 1");
});

routes.use("/api", [new AuthController().routerHandler]);

export default routes;
