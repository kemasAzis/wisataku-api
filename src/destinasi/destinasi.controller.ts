import { Controller, Get, Post, Patch, Delete, Param, Body, ParseIntPipe, HttpCode, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { DestinasiService } from './destinasi.service';
import { CreateDestinasiDto } from './dto/create-destinasi.dto';
import { UpdateDestinasiDto } from './dto/update-destinasi.dto';
// import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@ApiTags('Destinasi')
@Controller('destinasi')
export class DestinasiController {
  constructor(private readonly destinasiService: DestinasiService) {}

  @Get()
  @ApiOperation({ summary: 'Menampilkan daftar destinasi wisata' })
  findAll() {
    return this.destinasiService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Menampilkan detail destinasi berdasarkan ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.destinasiService.findOne(id);
  }

  // --- BAGIAN YANG DILINDUNGI ---

  @Post()
  @ApiBearerAuth() // Opsional: Untuk memunculkan tombol gembok di Swagger
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Menambahkan destinasi baru (khusus admin)' })
  create(@Body() dto: CreateDestinasiDto) {
    return this.destinasiService.create(dto);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Mengubah data destinasi berdasarkan ID (khusus admin)' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateDestinasiDto) {
    return this.destinasiService.update(id, dto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @HttpCode(200)
  @ApiOperation({ summary: 'Menghapus destinasi berdasarkan ID (khusus admin)' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.destinasiService.remove(id);
  }
}