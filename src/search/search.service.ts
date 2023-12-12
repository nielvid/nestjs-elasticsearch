import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class SearchService {
  constructor(private readonly esService: ElasticsearchService) {}

  async createIndex(index: string) {
    const indexExist = await this.esService.indices.exists({ index });
    if (!indexExist) {
      const result = await this.esService.indices.create({ index });
      return result;
    } else {
      return { message: 'index exist' };
    }
  }

  async indexData(data: any) {
    const result = await this.esService.index({
      index: 'books',
      body: data,
    });

    return result;
  }

  async search(q: string) {
    const result = await this.esService.search({
      index: 'books',
      body: {
        query: {
          multi_match: {
            query: q,
            fields: ['author', 'name'],
          },
          //   match: {
          //     author: q,
          //   },
        },
      },
    });
    const { hits } = result.hits;

    return hits.map((item) => item._source);
  }

  async remove(q: string) {
    const result = await this.esService.deleteByQuery({
      index: 'books',
      body: {
        query: {
          match: {
            author: q,
          },
        },
      },
    });

    return result;
  }
}
