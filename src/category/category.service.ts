// category.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { SubCategory } from './entities/subCategory.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(SubCategory)
    private subCategoryRepository: Repository<SubCategory>,
  ) {}

  async getAllCategoriesWithSubCategories(): Promise<Category[]> {
    return await this.categoryRepository.find({
      relations: ['subCategories'],
    });
  }
  async createCategory(name: string): Promise<Category> {
    const category = this.categoryRepository.create({ name });
    return this.categoryRepository.save(category);
  }

  async createSubCategory(
    categoryId: number,
    name: string,
  ): Promise<SubCategory> {
    const category = await this.categoryRepository.findOne({
      where: { id: categoryId },
    });

    if (!category) {
      throw new NotFoundException('부모 카테고리를 찾을 수 없습니다.');
    }

    const subCategory = this.subCategoryRepository.create({ name, category });
    return this.subCategoryRepository.save(subCategory);
  }
}
