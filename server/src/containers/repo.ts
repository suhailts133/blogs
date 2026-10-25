import { BlogRepo } from "../repo/blog.repo";
import { RedisRepository } from "../repo/redis.repo";
import { UserRepo } from "../repo/user.repo";

export const redisRepo = new RedisRepository();
export const userRepo = new UserRepo();
export const blogRepo = new BlogRepo();
