import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { Prisma } from 'generated/prisma';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    createUserDto: CreateUserDto,
  ): Promise<{ id: number; email: string }> {
    try {
      return await this.prismaService.user.create({
        data: {
          ...createUserDto,
          password: await bcrypt.hash(createUserDto.password, 10),
        },
        select: {
          email: true,
          id: true,
        },
      });
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (error?.code === 'P2002') {
        throw new UnprocessableEntityException(
          'User already exists with this email',
        );
      }
      throw error;
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(id: number) {
    return await this.prismaService.user.findUniqueOrThrow({
      where: { id },
      include: { roles: true },
    });
  }

  async findByEmail(email: string) {
    return this.prismaService.user.findUnique({
      where: { email },
    });
  }

  async filter(filter: Prisma.UserWhereUniqueInput) {
    return this.prismaService.user.findUnique({
      where: filter,
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
