import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Response } from 'express';

import { AuthService } from './auth.service';
import { LoginRequestDto } from './dto/login-request.dto';
import { SignupRequestDto } from './dto/signup-request.dto';

import { clearTokenCookie, setTokenCookie } from 'src/lib/cookie';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signup(@Body() dto: SignupRequestDto) {
    await this.authService.signup(dto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Res({
      passthrough: true,
    })
    res: Response,
    @Body() dto: LoginRequestDto,
  ) {
    const token = await this.authService.login(dto);
    setTokenCookie(res, token);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(
    @Res({
      passthrough: true,
    })
    res: Response,
  ) {
    clearTokenCookie(res);
  }
}
