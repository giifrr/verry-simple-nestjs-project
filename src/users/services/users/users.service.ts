import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/typeorm/entities/Post';
import { Profile } from 'src/typeorm/entities/Profile';
import { User } from 'src/typeorm/entities/User';
import { CreateUserDto, CreateUserPostDto, UpdateUserDto, UpdateUserProfileDto } from 'src/users/dtos/User.dto';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
    @InjectRepository(Post) private postRepository: Repository<Post>
  ) {}

  index() {
    return this.userRepository.find({ relations: ['profile'] });
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

  async updateUserProfile(id: number, body: UpdateUserProfileDto) {
    let user = await this.userRepository.findOneBy({id});

    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    const newProfile =  this.profileRepository.create(body)
    const savedProfile = await this.profileRepository.save(newProfile);

    user.profile = savedProfile;

    return this.userRepository.save(user);
  }

  async createUserPost(id: number, body: CreateUserPostDto) {
    let user = await this.userRepository.findOneBy({id});

    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    let newPost = this.postRepository.create({
      ...body,
      user
    })

    return this.postRepository.save(newPost);
  }
}
