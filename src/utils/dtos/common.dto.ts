import { IsInt, IsPositive, Max } from 'class-validator';

export class PageOptionsDto {
  @IsInt()
  @IsPositive()
  page: number;

  @IsInt()
  @IsPositive()
  @Max(100)
  limit: number;

  constructor(page: number, limit: number) {
    this.page = page;
    this.limit = limit;
  }

  get skip(): number {
    return (this.page - 1) * this.limit;
  }
}
