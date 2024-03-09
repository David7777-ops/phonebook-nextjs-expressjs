import { z } from "zod";
import { UsersService } from "../users/users.service";
import { ISignupUser } from "../../dto/auth.dto";

export class AuthService {
  private service = new UsersService();
  async signUp(data: z.infer<typeof ISignupUser>) {
    const result = await this.service.create({
      data,
    });

    return {
      ...result,
      password: undefined,
    };
  }
}
