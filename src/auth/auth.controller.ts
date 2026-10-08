import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation, ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty } from 'class-validator'; // Tambahkan impor ini

// Menambahkan tag validasi agar data tidak dibuang oleh ValidationPipe
class RegisterDto {
  @ApiProperty({ example: 'Admin Satu' })
  @IsString()
  @IsNotEmpty()
  nama: string;

  @ApiProperty({ example: 'admin@wisataku.id' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'admin123' })
  @IsString()
  @IsNotEmpty()
  password: string;
}

class LoginDto {
  @ApiProperty({ example: 'admin@wisataku.id' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'admin123' })
  @IsString()
  @IsNotEmpty()
  password: string;
}

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Mendaftar sebagai wisatawan baru' })
  register(@Body() body: RegisterDto) {
    return this.authService.register(body.nama, body.email, body.password);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login untuk mendapatkan token JWT' })
  login(@Body() body: LoginDto) {
    return this.authService.login(body.email, body.password);
  }
}