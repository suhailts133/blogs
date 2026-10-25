import type { IUser } from "../interface/user/user.interface";
import type { IUserRepo } from "../interface/user/user.repo.interface";
import { UserModel } from "../models/user.model";
import { BaseRepository } from "./base.repo";

export class UserRepo extends BaseRepository<IUser> implements IUserRepo {
  constructor() {
    super(UserModel);
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return await this.findOne({ email });
  }
}
