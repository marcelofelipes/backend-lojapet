import { z } from 'zod';
export const UserSchema = z.object({
  id: z.string(),
  email: z.string().email({ message: "Invalid email address" }),
  name: z.string(),
  photo: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  role: z.string(),
});
export type User = z.infer<typeof UserSchema>;
export interface Users {
  id: z.infer<typeof UserSchema>['id'];
  email: z.infer<typeof UserSchema>['email'];
  name: z.infer<typeof UserSchema>['name'];
  createdAt: z.infer<typeof UserSchema>['createdAt'];
  updatedAt: z.infer<typeof UserSchema>['updatedAt'];
  photo: z.infer<typeof UserSchema>['photo'];
  role: z.infer<typeof UserSchema>['role'];
  password: string;
}

export interface UserCreate {
  email: z.infer<typeof UserSchema>['email'];
  name: z.infer<typeof UserSchema>['name'];
  password: string
}
export interface UserRepository {
  create(data: UserCreate): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  update(id: string, data: UserCreate): Promise<User>;
  delete(id: string): Promise<User>;
  findAll(): Promise<User[]>;
}