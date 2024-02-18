import { ErrorREST, ErrorsAPI } from "@errors/error";
import { User, UserCreate, UserRepository } from "@interfaces/user.interface";
import { UserRepositoryPrisma } from "@repositories/user.repository";
import bcrypt from 'bcrypt';

class UserUseCase {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepositoryPrisma();
  }
  async create(data: UserCreate): Promise<Omit<User, 'password'>> {
    const verifyIfUserExists = await this.userRepository.findByEmail(data.email);
    if (verifyIfUserExists) {
      throw new ErrorREST(ErrorsAPI.Conflict);
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const userToCreate: UserCreate = {
      ...data,
      password: hashedPassword
    };
    const user = await this.userRepository.create(userToCreate);
    return user;
  }

  async getAll(): Promise<User[]> {
    const users = await this.userRepository.findAll();
    return users;
  }
  async findByEmail(email: string): Promise<User | null> {
    const user = await this.userRepository.findByEmail(email);
    return user;
  }
}

export { UserUseCase };

