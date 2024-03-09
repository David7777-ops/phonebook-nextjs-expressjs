import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { vars } from "../config/vars";

export interface IGetUserAuthInfoRequest extends Request {
  user: any;
}

export const authorization = (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.jwt;
  if (!token) {
    return res.sendStatus(403);
  }
  try {
    const data = jwt.verify(token, vars.auth.jwt.secret);
    req.user = data;
    return next();
  } catch {
    return res.sendStatus(403);
  }
};
