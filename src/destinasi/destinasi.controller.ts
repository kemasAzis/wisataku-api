import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateDestinasiDto } from './dto/create-destinasi.dto';
import { UpdateDestinasiDto } from './dto/update-destinasi.dto';

@ApiTags('Destinasi')
@Controller('destinasi')
export class DestinasiController {
  
  @Get()
  @ApiOperation({ summary: 'Menampilkan daftar destinasi wisata' })
  @ApiResponse({ status: 200, description: 'Daftar destinasi berhasil diambil' })
  findAll() {
    return 'Daftar destinasi wisata akan tampil di sini';
  }

  @Get(':id')
  @ApiOperation({ summary: 'Menampilkan detail destinasi' })
  findOne(@Param('id') id: string) {
    return `Detail destinasi ID: ${id}`;
  }

  @Post()
  @ApiOperation({ summary: 'Menambahkan destinasi baru (khusus admin)' })
  @ApiResponse({ status: 201, description: 'Destinasi berhasil dibuat' })
  @ApiResponse({ status: 400, description: 'Data tidak valid' })
  create(@Body() dto: CreateDestinasiDto) {
    return dto;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mengubah sebagian data destinasi (khusus admin)' })
  update(@Param('id') id: string, @Body() dto: UpdateDestinasiDto) {
    return { id, ...dto };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Menghapus destinasi (khusus admin)' })
  remove(@Param('id') id: string) {
    return `Destinasi ID: ${id} berhasil dihapus`;
  }
}