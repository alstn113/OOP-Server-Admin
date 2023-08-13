import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupRequestDto } from './dto/signup-request.dto';
import { LoginRequestDto } from './dto/login-request.dto';
import { Response } from 'express';
import { clearTokenCookie, setTokenCookie } from 'src/lib/cookie';
import { ApiTags } from '@nestjs/swagger';

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
