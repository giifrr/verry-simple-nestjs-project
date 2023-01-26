import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { CreateUserDto, UpdateUserDto } from 'src/users/dtos/User.dto';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  index() {
    return this.userRepository.find();
  }

  show(id: number) {
    return this.userRepository.findOneBy({id});
  }

  create(body: CreateUserDto) {
    let user = this.userRepository.create(body);
    return this.userRepository.save(user);
  }

  update(id: number, body: UpdateUserDto) {
    let user = this.userRepository.findOneBy({id});

    if (user) {
      this.userRepository
          .createQueryBuilder()
          .update(User)
          .set(
            {...body}
          )
          .where("id = :id", { id: id})
          .execute()
    } else {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }

  destroy(id: number) {
    let user = this.userRepository.findOneBy({id: id});

    if (user) {
      this.userRepository
          .createQueryBuilder()
          .delete()
          .from(User)
          .where("id = :id", { id: id })
          .execute();
    } else {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }
}
