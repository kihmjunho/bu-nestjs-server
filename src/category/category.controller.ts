import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './entities/category.entity';
import { SubCategory } from './entities/subCategory.entity';

@Controller('categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  async getAllCategoriesWithSubCategories(): Promise<Category[]> {
    return await this.categoryService.getAllCategoriesWithSubCategories();
  }
  @Post()
  async createCategory(@Body('name') name: string): Promise<Category> {
    return await this.categoryService.createCategory(name);
  }

  @Post(':categoryId')
  async createSubCategory(
    @Param('categoryId') categoryId: number,
    @Body('name') name: string,
  ): Promise<SubCategory> {
    return await this.categoryService.createSubCategory(categoryId, name);
  }
}
