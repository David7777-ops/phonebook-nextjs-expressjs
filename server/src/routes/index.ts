import { Router } from "express";

const routes = Router();

routes.get("/api", (req, res) => {
  res.send("This is route api version 1");
});

export default routes;
