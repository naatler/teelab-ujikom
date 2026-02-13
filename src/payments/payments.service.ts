import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PaymentsService {
  private xenditClient: any;

  constructor(private prisma: PrismaService) {
    // Only initialize Xendit if key is provided
    if (process.env.XENDIT_SECRET_KEY && process.env.XENDIT_SECRET_KEY.startsWith('xnd_')) {
      const Xendit = require('xendit-node');
      this.xenditClient = new Xendit({
        secretKey: process.env.XENDIT_SECRET_KEY,
      });
    } else {
      console.warn('⚠️  Xendit not configured. Payment features will be limited.');
    }
  }

  async createInvoice(orderId: string, userId: string) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: {
        user: true,
        address: true,
        items: {
          include: { product: true },
        },
      },
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    if (order.userId !== userId) {
      throw new NotFoundException('Order not found');
    }

    if (order.status !== 'PENDING') {
      throw new BadRequestException('Order is not pending');
    }

    // Check if payment already exists
    const existingPayment = await this.prisma.payment.findUnique({
      where: { orderId },
    });

    if (existingPayment && existingPayment.status === 'PAID') {
      throw new BadRequestException('Order already paid');
    }

    const externalId = `ORDER-${orderId}-${Date.now()}`;

    // If Xendit is not configured, create mock payment
    if (!this.xenditClient) {
      const payment = await this.prisma.payment.upsert({
        where: { orderId },
        create: {
          orderId,
          xenditExternalId: externalId,
          amount: order.totalAmount,
          status: 'PENDING',
        },
        update: {
          xenditExternalId: externalId,
          status: 'PENDING',
        },
      });

      return {
        payment,
        invoiceUrl: `http://localhost:4000/api/payments/mock/${payment.id}`,
        message: 'Mock payment created (Xendit not configured)',
      };
    }

    // Create Xendit Invoice
    const { Invoice } = this.xenditClient;
    const invoice = await Invoice.createInvoice({
      externalID: externalId,
      amount: Number(order.totalAmount),
      payerEmail: order.user.email,
      description: `Payment for Order #${orderId}`,
      customer: {
        given_names: order.user.name,
        email: order.user.email,
        mobile_number: order.user.phone || '',
      },
      successRedirectURL: `${process.env.FRONTEND_URL}/orders/${orderId}?payment=success`,
      failureRedirectURL: `${process.env.FRONTEND_URL}/orders/${orderId}?payment=failed`,
    });

    // Save or update payment
    const payment = await this.prisma.payment.upsert({
      where: { orderId },
      create: {
        orderId,
        xenditInvoiceId: invoice.id,
        xenditExternalId: externalId,
        amount: order.totalAmount,
        status: 'PENDING',
      },
      update: {
        xenditInvoiceId: invoice.id,
        xenditExternalId: externalId,
        status: 'PENDING',
      },
    });

    return {
      payment,
      invoiceUrl: invoice.invoice_url,
    };
  }

  async handleWebhook(body: any) {
    const externalId = body.external_id;
    const status = body.status;

    const payment = await this.prisma.payment.findUnique({
      where: { xenditExternalId: externalId },
      include: { order: true },
    });

    if (!payment) {
      throw new NotFoundException('Payment not found');
    }

    let paymentStatus: 'PENDING' | 'PAID' | 'FAILED' | 'EXPIRED' = 'PENDING';
    let orderStatus: 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED' = 'PENDING';

    if (status === 'PAID') {
      paymentStatus = 'PAID';
      orderStatus = 'PROCESSING';
    } else if (status === 'EXPIRED') {
      paymentStatus = 'EXPIRED';
      orderStatus = 'CANCELLED';
    }

    await this.prisma.$transaction(async (tx) => {
      await tx.payment.update({
        where: { id: payment.id },
        data: {
          status: paymentStatus,
          paymentMethod: body.payment_method,
          paidAt: status === 'PAID' ? new Date() : null,
        },
      });

      await tx.order.update({
        where: { id: payment.orderId },
        data: { status: orderStatus },
      });
    });

    return { message: 'Webhook processed' };
  }

  async getPaymentStatus(orderId: string, userId: string) {
    const payment = await this.prisma.payment.findUnique({
      where: { orderId },
      include: {
        order: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!payment) {
      throw new NotFoundException('Payment not found');
    }

    if (payment.order.userId !== userId) {
      throw new NotFoundException('Payment not found');
    }

    return payment;
  }

  // Mock payment for testing
  async mockPaymentSuccess(paymentId: string) {
    const payment = await this.prisma.payment.findUnique({
      where: { id: paymentId },
      include: { order: true },
    });

    if (!payment) {
      throw new NotFoundException('Payment not found');
    }

    await this.prisma.$transaction(async (tx) => {
      await tx.payment.update({
        where: { id: paymentId },
        data: {
          status: 'PAID',
          paymentMethod: 'MOCK_PAYMENT',
          paidAt: new Date(),
        },
      });

      await tx.order.update({
        where: { id: payment.orderId },
        data: { status: 'PROCESSING' },
      });
    });

    return { message: 'Payment marked as paid (mock)' };
  }
}