import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CheckoutService } from './checkout.service';
import { CreateSessionDto } from './dto/create-session.dto';

@Controller('checkout')
export class CheckoutController {
  constructor(private readonly checkoutService: CheckoutService) {}

  @Post('session')
  @UseGuards(JwtAuthGuard)
  async createSession(@Body() body: CreateSessionDto) {
    return this.checkoutService.createSession(body.productId);
  }

  @Post('webhook')
  async webhook(@Body() body: any) {
    return this.checkoutService.handleWebhook(body);
  }
}
