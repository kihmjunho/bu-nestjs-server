import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  async getAllCategoriesWithSubCategories() {
    return await this.categoryService.getAllCategoriesWithSubCategories();
  }
  @Post()
  async createCategory(@Body('name') name: string) {
    return this.categoryService.createCategory(name);
  }

  @Post(':categoryId')
  async createSubCategory(
    @Param('categoryId') categoryId: number,
    @Body('name') name: string,
  ) {
    return this.categoryService.createSubCategory(categoryId, name);
  }
}
