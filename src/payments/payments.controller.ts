import { Controller, Get, Post, Body, Param, UseGuards, Request, HttpCode } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('payments')
export class PaymentsController {
  constructor(private paymentsService: PaymentsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create/:orderId')
  createInvoice(@Param('orderId') orderId: string, @Request() req) {
    return this.paymentsService.createInvoice(orderId, req.user.id);
  }

  @Post('webhook')
  @HttpCode(200)
  handleWebhook(@Body() body: any) {
    return this.paymentsService.handleWebhook(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('status/:orderId')
  getPaymentStatus(@Param('orderId') orderId: string, @Request() req) {
    return this.paymentsService.getPaymentStatus(orderId, req.user.id);
  }

  // Mock payment endpoint for testing
  @Post('mock/:paymentId/success')
  @HttpCode(200)
  mockPaymentSuccess(@Param('paymentId') paymentId: string) {
    return this.paymentsService.mockPaymentSuccess(paymentId);
  }
}