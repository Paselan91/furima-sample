import { Controller, Get, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() userData: { name: string; email: string }) {
    return await this.userService.createUser(userData);
  }

  @Get()
  async getUserList() {
    try {
      const users = await this.userService.getUserList();
      return users;
    } catch (error) {
      throw new HttpException('Failed to fetch users', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}