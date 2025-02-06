import { Body, Controller, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { RegisterUserDto } from 'src/dtos/register-user.dto';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('register')
  async register(@Body() dto: RegisterUserDto) {
    return this.authenticationService.register(dto);
  }
}
