import { db } from "@database/db";
import { User, UserCreate, UserRepository } from "@interfaces/user.interface";

class UserRepositoryPrisma implements UserRepository {
  async create(data: UserCreate): Promise<User> {
    const user = await db.user.create({ data });
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await db.user.findUnique({ where: { email }, select: { id: true, email: true, password: false, name: true, createdAt: true, updatedAt: true, photo: true, role: true, apiKeys: false } });
    return user;
  }

  async findById(id: string): Promise<User | null> {
    const user = await db.user.findUnique({ where: { id } });
    return user;
  }

  async update(id: string, data: UserCreate): Promise<User> {
    const user = await db.user.update({ where: { id }, data });
    return user;
  }

  async delete(id: string): Promise<User> {
    const user = await db.user.delete({ where: { id } });
    return user;
  }

  async findAll(): Promise<User[]> {
    const users = await db.user.findMany({
      select: { id: true, email: true, name: true, createdAt: true, updatedAt: true, photo: true, role: true, apiKeys: false }
    });
    return users;
  }
}

export { UserRepositoryPrisma };

