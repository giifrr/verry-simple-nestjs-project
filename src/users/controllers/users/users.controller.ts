import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CreateUserDto, CreateUserPostDto, UpdateUserDto, UpdateUserProfileDto } from 'src/users/dtos/User.dto';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('users')
export class UsersController {

  constructor(private userService: UsersService) {}

  @Get()
  getUsers() {
    return this.userService.index();
  }

  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.show(id);
  }

  @Post()
  createUser(@Body() body: CreateUserDto) {
    return this.userService.create(body);
  }

  @Put(':id')
  updateUser(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateUserDto) {
    return this.userService.update(id, body);
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.destroy(id);
  }

  @Post(':id/profiles')
  updateUserProfile(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateUserProfileDto) {
    return this.userService.updateUserProfile(id, body);
  }

  @Post(':id/posts')
  createUserPost(@Param('id', ParseIntPipe) id: number, @Body() body: CreateUserPostDto) {
    return this.userService.createUserPost(id, body);
  }
}
