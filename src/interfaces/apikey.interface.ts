export interface ApiKey {
  id: string;
  userId: string;
  key: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ApiKeyCreate {
  userId: string;
  key: string;
}

export interface ApiKeyRepository {
  create(data: ApiKeyCreate): Promise<ApiKey>;
  findByUserId(userId: string): Promise<ApiKey | null>;
}