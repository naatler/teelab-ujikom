import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { CartService } from './cart.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('cart')
@UseGuards(JwtAuthGuard)
export class CartController {
  constructor(private cartService: CartService) {}

  @Get()
  getCart(@Request() req) {
    return this.cartService.getOrCreateCart(req.user.id);
  }

  @Post('items')
  addItem(@Request() req, @Body() body: { productId: string; quantity: number }) {
    return this.cartService.addItem(req.user.id, body.productId, body.quantity);
  }

  @Patch('items/:id')
  updateItem(@Request() req, @Param('id') id: string, @Body() body: { quantity: number }) {
    return this.cartService.updateItemQuantity(req.user.id, id, body.quantity);
  }

  @Delete('items/:id')
  removeItem(@Request() req, @Param('id') id: string) {
    return this.cartService.removeItem(req.user.id, id);
  }

  @Delete()
  clearCart(@Request() req) {
    return this.cartService.clearCart(req.user.id);
  }
}