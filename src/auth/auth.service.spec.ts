import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma.service'; // <-- Jalur impor ini sudah diperbaiki
import { JwtService } from '@nestjs/jwt';
import { ConflictException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  const prismaMock = {
    user: { findUnique: jest.fn(), create: jest.fn() },
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: PrismaService, useValue: prismaMock },
        { provide: JwtService, useValue: { sign: jest.fn(() => 'fake-token') } },
      ],
    }).compile();
    service = module.get(AuthService);
  });

  it('harus menolak registrasi jika email sudah terdaftar', async () => {
    prismaMock.user.findUnique.mockResolvedValue({ id: 1, email: 'ada@example.com' });
    await expect(
      service.register('Budi', 'ada@example.com', 'rahasia123'),
    ).rejects.toThrow(ConflictException);
  });
});