import { Module } from '@nestjs/common';
import { UserService } from '@/modules/user/application/services/user.service';
import { UserController } from './api/user.controller';
import { UserRepository } from '@/modules/user/repositories/user.repository.impl';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@/domain/entities/user.entity';
import { UserCreatedListener } from '@/domain/listeners/user/user-created.listener';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService, UserRepository, UserCreatedListener],
  exports: [UserService],
})
export class UserModule {}
