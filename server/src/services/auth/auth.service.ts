import { z } from "zod";
import { UsersService } from "../users/users.service";
import { ILoginUser, ISignupUser } from "../../dto/auth.dto";
import bcrypt from "bcrypt";
import { vars } from "../../config/vars";
import jwt from "jsonwebtoken";
export class AuthService {
  private service = new UsersService();
  async login(data: z.infer<typeof ILoginUser>) {
    const { email, password } = data;
    const user = await this.service.findUserByEmail(email);
    if (await bcrypt.compare(password, user.password)) {
      return this.generateAccessToken({
        id: user.id,
        email: user.email,
        name: user.name,
      });
    } else throw new Error("Invalid Credentials");
  }
  async signUp(data: z.infer<typeof ISignupUser>) {
    const password = await bcrypt.hash(data.password, vars.auth.hashRounds);
    const result = await this.service.create({
      data: { ...data, password },
    });

    return {
      ...result,
      password: undefined,
    };
  }
  generateAccessToken(payload: string | object) {
    return jwt.sign(payload, vars.auth.jwt.secret, {
      expiresIn: vars.auth.jwt.expiresIn,
    });
  }
}
