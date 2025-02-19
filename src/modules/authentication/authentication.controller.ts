import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { RegisterUserDto } from 'src/dtos/register-user.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RequestWithUser } from 'src/dtos/request-with-user.dto';
import { UpdateUserDto } from 'src/dtos/update-user.dto';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('register')
  async register(@Body() dto: RegisterUserDto) {
    return this.authenticationService.register(dto);
  }

  @Post('login')
  async login(@Body() dto: { email: string; password: string }) {
    return this.authenticationService.login(dto.email, dto.password);
  }

  @UseGuards(JwtAuthGuard)
  @Get('user')
  async getLoggedUser(@Req() req: RequestWithUser) {
    if (!req.user) {
      throw new UnauthorizedException('User not found');
    }
    return this.authenticationService.getLoggedUser(req.user.sub);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('user')
  async updateUser(@Req() req: RequestWithUser, @Body() dto: UpdateUserDto) {
    if (!req.user) {
      throw new UnauthorizedException('User not found');
    }

    return this.authenticationService.updateUser(req.user.sub, dto);
  }
}
