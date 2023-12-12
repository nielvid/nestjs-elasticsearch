import { Controller, Post, Get, Query, Body } from '@nestjs/common';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}
  @Post()
  async createIndex(@Body() data: { index: string }) {
    return await this.searchService.createIndex(data.index);
  }
  @Get()
  async getHello(@Query('q') q: string) {
    return await this.searchService.search(q);
  }
}
