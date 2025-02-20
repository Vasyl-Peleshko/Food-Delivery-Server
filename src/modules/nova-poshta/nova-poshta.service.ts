/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class NovaPoshtaService {
  private readonly apiUrl = 'https://api.novaposhta.ua/v2.0/json/';
  private readonly apiKey: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.apiKey = this.configService.get<string>('NOVA_POSHTA_API_KEY', '');
    if (!this.apiKey) {
      throw new Error('API key for Nova Poshta is missing in .env');
    }
  }

  private createRequestBody(cityName: string, searchQuery: string): any {
    return {
      apiKey: this.apiKey,
      modelName: 'Address',
      calledMethod: 'getWarehouses',
      methodProperties: {
        CityName: cityName,
        FindByString: searchQuery,
      },
    };
  }

  async getWarehouses(
    cityName: string,
    searchQuery: string = '',
  ): Promise<any> {
    try {
      const body = this.createRequestBody(cityName, searchQuery);
      const response = await firstValueFrom(
        this.httpService.post(this.apiUrl, body, {
          headers: { 'Content-Type': 'application/json' },
        }),
      );
      return response.data ?? [];
    } catch (error) {
      throw new HttpException(
        'Error fetching warehouses from Nova Poshta',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
