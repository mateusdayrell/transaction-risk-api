import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, Product } from 'generated/prisma';
import { promises } from 'fs';
import { join } from 'path';
import { PRODUCT_IMAGES } from './product-images';
import { ProductsGateway } from './products.gatewat';

@Injectable()
export class ProductsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly productsGateway: ProductsGateway,
  ) {}

  async create(
    createProductDto: CreateProductDto,
    userId: number,
  ): Promise<Product> {
    const product = await this.prismaService.product.create({
      data: {
        ...createProductDto,
        userId: userId,
        image: '',
      },
    });

    this.productsGateway.handleProductUpdated();

    return product;
  }

  async findAll(status?: string): Promise<Product[]> {
    const args: Prisma.ProductFindManyArgs = {};

    if (status) {
      args.where = {
        soldOut: false, // status === 'sold',
      };
    }

    const products = await this.prismaService.product.findMany(args);
    return Promise.all(
      products.map(async (product) => {
        return {
          ...product,
          imageExists: await this.imageExists(product.id),
        };
      }),
    );
  }

  async findOne(id: number) {
    try {
      const product = await this.prismaService.product.findUniqueOrThrow({
        where: { id },
        include: {
          user: {
            select: {
              id: true,
              email: true,
            },
          },
        },
      });

      return {
        ...product,
        imageExists: await this.imageExists(product.id),
      };
    } catch {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product ${updateProductDto.name}`;
  }

  async markAsSold(id: number, data: Prisma.ProductUpdateInput) {
    try {
      const product = await this.prismaService.product.update({
        where: { id },
        data,
      });

      this.productsGateway.handleProductUpdated();

      return product;
    } catch {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }

  private async imageExists(id: number): Promise<boolean> {
    try {
      await promises.access(
        join(`${PRODUCT_IMAGES}/${id}.png`),
        promises.constants.F_OK,
      );
      return true;
    } catch {
      return false;
    }
  }
}
