import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupRequestDto } from './dto/signup-request.dto';
import { LoginRequestDto } from './dto/login-request.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() dto: SignupRequestDto) {
    await this.authService.signup(dto);
  }

  @Post('login')
  async login(@Body() dto: LoginRequestDto) {
    return await this.authService.login(dto);
  }

  @Post('logout')
  async logout() {
    return await this.authService.logout();
  }
}
