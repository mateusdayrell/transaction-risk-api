import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from 'generated/prisma';
import { Response } from 'express';
import ms, { StringValue } from 'ms';
import { ConfigService } from '@nestjs/config';
import { TokenPayload } from './token-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: User, response: Response) {
    const expiresInMs = ms(
      this.configService.getOrThrow<string>('JWT_EXPIRATION') as StringValue,
    );
    const expiresDate = new Date(Date.now() + expiresInMs);

    const userWithRoles = await this.usersService.findOne(user.id);

    const tokenPayload: TokenPayload = {
      id: user.id,
      email: user.email,
      roles: userWithRoles.roles.map((role) => role.name),
    };

    const token = this.jwtService.sign(tokenPayload);

    response.cookie('Authentication', token, {
      secure: true,
      httpOnly: true,
      expires: expiresDate,
    });

    return { tokenPayload };
  }

  async validateUser(email: string, password: string): Promise<User> {
    try {
      const user = await this.usersService.filter({ email });

      if (!user) throw new UnauthorizedException();

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        throw new UnauthorizedException();
      }

      return user;
    } catch {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  verifyToken(token: string) {
    this.jwtService.verify(token);
  }
}
