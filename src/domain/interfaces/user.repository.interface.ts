import { UserEntity } from '../entities/user.entity';

export interface UserRepositoryInterface {
  getUsers(): Promise<UserEntity[]>;
  getUser(id: string): Promise<UserEntity>;
  createUser(entity: UserEntity): Promise<void>;
  updateUser(id: string, entity: UserEntity): Promise<void>;
  deleteUser(id: string): Promise<void>;
}
