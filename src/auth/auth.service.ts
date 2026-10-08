import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma.service'; // Sesuaikan path PrismaService Anda

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async register(nama: string, email: string, password: string) {
    const existing = await this.prisma.user.findUnique({ where: { email } });
    if (existing) throw new ConflictException('Email sudah terdaftar');

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await this.prisma.user.create({
      data: { nama, email, passwordHash, role: 'wisatawan' },
    });
    return { id: user.id, nama: user.nama, email: user.email };
  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      throw new UnauthorizedException('Email atau password salah');
    }

    const payload = { sub: user.id, role: user.role };
    return { access_token: this.jwtService.sign(payload), token_type: 'Bearer' };
  }
}