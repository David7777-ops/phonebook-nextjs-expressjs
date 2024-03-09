import { z } from "zod";
import { UsersService } from "../users/users.service";
import { ISignupUser } from "../../dto/auth.dto";
import bcrypt from "bcrypt";
import { vars } from "../../config/vars";
export class AuthService {
  private service = new UsersService();

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
}
