import { PostStatusEnum } from '../enums/post-status.enum';
import { EntityBase } from '../../common/entity.base';
import { UserEntity } from './user.entity';

export class PostEntity extends EntityBase {
  title: string;
  description: string;
  poststatus: PostStatusEnum;
  createdbyid: string;
  updatedbyid?: string;
  createdby?: UserEntity;
  updatedby?: UserEntity;
}
