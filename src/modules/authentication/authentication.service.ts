import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto } from 'src/dtos/register-user.dto';
import { UpdateUserDto } from 'src/dtos/update-user.dto';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterUserDto): Promise<{ token: string }> {
    const { name, email, password } = dto;

    const existingUser = await this.findByEmail(email);
    if (existingUser) {
      throw new UnauthorizedException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new this.userModel({ name, email, password: hashedPassword });
    await user.save();

    return { token: this.generateToken(user._id as string, user.email) };
  }

  async login(email: string, password: string): Promise<{ token: string }> {
    const user: UserDocument | null = await this.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return { token: this.generateToken(user._id as string, user.email) };
  }

  async getLoggedUser(userId: string): Promise<UserDocument> {
    const user = await this.userModel
      .findById(userId)
      .select('-password')
      .exec();
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return user;
  }

  async updateUser(userId: string, dto: UpdateUserDto): Promise<UserDocument> {
    const user = await this.userModel.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (dto.email && dto.email !== user.email) {
      const existingUser = await this.userModel.findOne({ email: dto.email });
      if (existingUser) {
        throw new BadRequestException('Email is already in use');
      }
    }

    Object.assign(user, dto);
    await user.save();

    return user.toObject({
      versionKey: false,
      transform: (_, ret) => {
        delete ret.password;
      },
    });
  }

  private async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).exec();
  }

  private generateToken(userId: string, email: string): string {
    return this.jwtService.sign({ email, sub: userId });
  }
}
