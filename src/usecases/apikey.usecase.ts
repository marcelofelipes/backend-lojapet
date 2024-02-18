import { ErrorREST, ErrorsAPI } from '@errors/error';
import { ApiKey, ApiKeyCreate, ApiKeyRepository } from '@interfaces/apikey.interface';
import { UserRepository } from '@interfaces/user.interface';
import { ApiKeyRepositoryPrisma } from '@repositories/apikey.repository';
import { UserRepositoryPrisma } from '@repositories/user.repository';

class ApiKeyUseCase {
  private userRepository: UserRepository;
  private apiKeyRepository: ApiKeyRepository;

  constructor() {
    this.apiKeyRepository = new ApiKeyRepositoryPrisma();
    this.userRepository = new UserRepositoryPrisma();
  }

  async create(key: string, userId: string): Promise<ApiKey> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new ErrorREST(ErrorsAPI.NotFound);
    }
    if (user.role !== 'ADMIN') {
      throw new ErrorREST(ErrorsAPI.Unauthorized);
    }
    const apiKeyData: ApiKeyCreate = {
      key: key,
      userId: userId
    };
    const apiKey = await this.apiKeyRepository.create(apiKeyData);
    return apiKey;
  }
}

export { ApiKeyUseCase };

