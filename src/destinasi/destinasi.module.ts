import { Module } from '@nestjs/common';
import { DestinasiService } from './destinasi.service';
import { DestinasiController } from './destinasi.controller';
import { PrismaService } from '../prisma.service'; // 1. Impor jembatan Prisma
import { DestinasiResolver } from './destinasi.resolver';

@Module({
  controllers: [DestinasiController],
  providers: [DestinasiService, PrismaService, DestinasiResolver],
})
export class DestinasiModule {}