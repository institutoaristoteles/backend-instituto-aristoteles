import { Injectable } from '@nestjs/common';
import slugify from 'slugify';
import { ReadCategoryDto } from '../dtos/read-category.dto';
import { UpdateCategoryDto } from '../dtos/update-category.dto';
import { CreateCategoryDto } from '../dtos/create-category.dto';
import { CategoryRepository } from '@/modules/category/repositories/category.repository.impl';
import { BulkDeleteCategoryDto } from '@/modules/category/application/dtos/bulk-delete-category.dto';
import { CategoryNotFoundError } from '@/common/exceptions/category-not-found.error';

@Injectable()
export class CategoryService {
  constructor(private readonly repository: CategoryRepository) {}

  public async createCategory(category: CreateCategoryDto): Promise<void> {
    await this.repository.save({
      title: category.title,
      slug: slugify(category.title, { lower: true }),
    });
  }

  public async deleteCategory(id: string): Promise<void> {
    const category = await this.repository.findOneById(id);
    if (!category) throw new CategoryNotFoundError('Category not found.');

    await this.repository.remove(id);
  }

  public async getCategories(): Promise<ReadCategoryDto[]> {
    const categories = await this.repository.findAll({
      order: {
        createdAt: 'DESC',
      },
    });
    return categories.map((c) => {
      return {
        id: c.id,
        title: c.title,
        slug: c.slug,
        createdAt: c.createdAt,
        updatedAt: c.updatedAt,
      };
    });
  }

  public async getCategory(id: string): Promise<ReadCategoryDto> {
    const category = await this.repository.findOneById(id);
    if (!category) throw new CategoryNotFoundError('Category not found');

    return {
      id: category.id,
      title: category.title,
      slug: category.slug,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
    };
  }

  public async updateCategory(
    id: string,
    entity: UpdateCategoryDto,
  ): Promise<void> {
    const category = await this.repository.findOneById(id);
    if (!category) throw new CategoryNotFoundError('Category not found.');

    await this.repository.update(id, {
      title: entity.title,
      slug: slugify(entity.title, { lower: true }),
    });
  }

  public async bulkDeleteCategory(categoryIds: BulkDeleteCategoryDto) {
    await this.repository.deleteMany(categoryIds.ids);
  }
}
