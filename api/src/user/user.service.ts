import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client'; // Prisma エラーの型をインポート

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(data: { name: string; email: string }) {
    try {
      return await this.prisma.user.create({ data });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new HttpException(
          `User with email '${data.email}' already exists.`,
          HttpStatus.CONFLICT,
        );
      }
      throw new HttpException(
        `Failed to create user. ${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getUserList() {
    return this.prisma.user.findMany();
  }
}