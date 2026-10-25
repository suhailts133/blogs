import type { IBaseRepository } from "../common/base.repo.interface";
import type { IUser } from "./user.interface";

export interface IUserRepo extends IBaseRepository<IUser> {
  findByEmail(email: string): Promise<IUser | null>;
}
