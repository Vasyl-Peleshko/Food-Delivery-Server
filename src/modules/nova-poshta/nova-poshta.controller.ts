/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Controller, Get, Query } from '@nestjs/common';
import { NovaPoshtaService } from './nova-poshta.service';

@Controller('nova-poshta')
export class NovaPoshtaController {
  constructor(private readonly novaPoshtaService: NovaPoshtaService) {}

  @Get('warehouses')
  async getWarehouses(
    @Query('city') city: string,
    @Query('search') search?: string,
  ) {
    return this.novaPoshtaService.getWarehouses(city, search);
  }
}
