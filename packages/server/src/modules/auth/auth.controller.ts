import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup() {
    return 'signup';
  }

  @Post('login')
  async login() {
    return 'login';
  }

  // @Post('github')
  // async github() {
  //   return 'github';
  // }

  // @Post('github/callback')
  // async githubCallback() {
  //   return 'githubCallback';
  // }

  @Post('logout')
  async logout() {
    return 'logout';
  }
}
