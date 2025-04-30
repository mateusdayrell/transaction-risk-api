import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { TokenPayload } from './token-payload.interface';

// export interface ICurrentUser {
//   id: number;
//   email: string;
//   roles?: string[];
// }

const getCurrentUser = (context: ExecutionContext): TokenPayload => {
  const request = context.switchToHttp().getRequest<{ user?: TokenPayload }>();
  if (!request.user) {
    throw new Error('getCurrentUser');
  }
  console.log('getCurrentUser', request.user);
  return request.user;
};

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => getCurrentUser(context),
);
