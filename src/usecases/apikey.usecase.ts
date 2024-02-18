import { ErrorREST, ErrorsAPI } from '@errors/error';
import { ApiKey, ApiKeyCreate, ApiKeyRepository } from '@interfaces/apikey.interface';
import { UserRepository } from '@interfaces/user.interface';
import { ApiKeyRepositoryPrisma } from '@repositories/apikey.repository';
import { UserRepositoryPrisma } from '@repositories/user.repository';
import crypto from 'crypto';

class ApiKeyUseCase {
  private userRepository: UserRepository;
  private apiKeyRepository: ApiKeyRepository;

  constructor() {
    this.apiKeyRepository = new ApiKeyRepositoryPrisma();
    this.userRepository = new UserRepositoryPrisma();
  }

  async create(userId: string): Promise<ApiKey> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new ErrorREST(ErrorsAPI.NotFound);
    }
    if (user.role !== 'ADMIN') {
      throw new ErrorREST(ErrorsAPI.Unauthorized);
    }
    const apiKeyKey = this.generateRandomApiKey();
    const apiKeyData: ApiKeyCreate = {
      key: apiKeyKey,
      userId: userId
    };
    const apiKey = await this.apiKeyRepository.create(apiKeyData);
    return apiKey;
  }

  private generateRandomApiKey(): string {
    const length = 32; // Define o comprimento da chave de API
    const apiKey = crypto.randomBytes(length).toString('hex');
    return 'APISECRET-' + apiKey;
  }
}

export { ApiKeyUseCase };

