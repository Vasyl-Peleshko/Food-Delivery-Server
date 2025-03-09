import { Injectable, Logger } from '@nestjs/common';
import { Client, TravelMode } from '@googlemaps/google-maps-services-js';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MapsService {
  private readonly logger = new Logger(MapsService.name);
  private googleMaps: Client;

  constructor(private configService: ConfigService) {
    this.googleMaps = new Client({});
  }

  async getRoute(start: string, end: string): Promise<any> {
    try {
      const response = await this.googleMaps.directions({
        params: {
          origin: start,
          destination: end,
          key: this.configService.get<string>('GOOGLE_MAPS_API_KEY') ?? '',
          mode: TravelMode.driving,
        },
      });

      return response.data.routes[0].legs[0];
    } catch (error) {
      this.logger.error('Error getting route:', error);
      throw error;
    }
  }
}
