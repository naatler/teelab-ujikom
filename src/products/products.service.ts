import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(data: {
    categoryId: string;
    name: string;
    slug: string;
    description?: string;
    price: number;
    stock: number;
    imageUrl?: string;
  }) {
    return this.prisma.product.create({
      data: {
        ...data,
        price: data.price,
      },
      include: { category: true },
    });
  }

  async findAll(params?: { categoryId?: string; search?: string }) {
    return this.prisma.product.findMany({
      where: {
        isActive: true,
        ...(params?.categoryId && { categoryId: params.categoryId }),
        ...(params?.search && {
          OR: [
            { name: { contains: params.search } },
            { description: { contains: params.search } },
          ],
        }),
      },
      include: { category: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: { category: true },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  async update(id: string, data: any) {
    return this.prisma.product.update({
      where: { id },
      data,
      include: { category: true },
    });
  }

  async remove(id: string) {
    return this.prisma.product.delete({ where: { id } });
  }
}