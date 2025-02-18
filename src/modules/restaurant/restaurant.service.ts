import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, SortOrder } from 'mongoose';
import { Restaurant } from 'src/schemas/restaurant.schema';

interface RestaurantFilter {
  name?: string;
  categories?: string;
  rating?: number;
  priceFrom?: number;
  priceTo?: number;
  sortBy?: string;
}

@Injectable()
export class RestaurantService {
  constructor(
    @InjectModel(Restaurant.name) private restaurantModel: Model<Restaurant>,
  ) {}

  async findAll(filters: RestaurantFilter): Promise<Restaurant[]> {
    const query = this.buildFilterQuery(filters);
    const sortQuery = this.buildSortQuery(filters.sortBy);

    return this.restaurantModel.find(query).sort(sortQuery).exec();
  }

  async findById(id: string): Promise<Restaurant | null> {
    return this.restaurantModel.findOne({ id }).exec();
  }

  private buildFilterQuery(filters: RestaurantFilter): FilterQuery<Restaurant> {
    const query: FilterQuery<Restaurant> = {};

    if (filters.name) {
      query.name = { $regex: filters.name, $options: 'i' };
    }
    if (filters.categories) {
      query.categories = { $in: filters.categories.split(',') };
    }
    if (filters.rating !== undefined) {
      const ratingValue = Number(filters.rating);
      if (!isNaN(ratingValue)) {
        query.rating = { $gte: ratingValue, $lte: 5 };
      }
    }
    if (filters.priceFrom || filters.priceTo) {
      query.price = {};
      if (filters.priceFrom) query.price.$gte = filters.priceFrom;
      if (filters.priceTo) query.price.$lte = filters.priceTo;
    }

    return query;
  }

  private buildSortQuery(
    sortBy?: string,
  ): { [key: string]: SortOrder } | undefined {
    const sortOptions: Record<string, { [key: string]: SortOrder }> = {
      feedbacks: { feedbacks: -1 },
      quickestDelivery: { 'delivery.time': 1 },
      costLowToHigh: { 'delivery.cost': 1 },
      costHighToLow: { 'delivery.cost': -1 },
    };

    return sortBy && sortOptions[sortBy] ? sortOptions[sortBy] : undefined;
  }
}
