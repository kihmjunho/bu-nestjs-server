import { Controller, Post, Body, Param, Get, Query } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './entities/category.entity';
import { SubCategory } from './entities/subCategory.entity';
import { GetOneQueryRequestDto } from './dto/getOne.query.request.dto';

@Controller('categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get('/main')
  async getCategories() {
    // console.log('hh');
    return await this.categoryService.getCategories();
  }

  @Get('/sub')
  async getSubCategories(
    @Query() getOneQueryRequestDto: GetOneQueryRequestDto,
  ) {
    return await this.categoryService.getSubCategories(getOneQueryRequestDto);
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
