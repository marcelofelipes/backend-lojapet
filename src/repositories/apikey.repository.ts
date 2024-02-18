import { db } from "@database/db";
import { ApiKey, ApiKeyCreate, ApiKeyRepository } from "@interfaces/apikey.interface";

class ApiKeyRepositoryPrisma implements ApiKeyRepository {
  async create(data: ApiKeyCreate): Promise<ApiKey> {
    const apiKey = await db.apiKey.create({ data });
    return apiKey;
  }

  async findByUserId(id: string): Promise<ApiKey | null> {
    const apiKey = await db.apiKey.findUnique({ where: { id } });
    return apiKey || null;
  }
}

export { ApiKeyRepositoryPrisma };

