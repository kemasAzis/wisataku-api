import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDestinasiDto } from './dto/create-destinasi.dto';
import { UpdateDestinasiDto } from './dto/update-destinasi.dto';
import { TambahUlasanInput } from './dto/tambah-ulasan.input';
import { PrismaService } from '../prisma.service';

@Injectable()
export class DestinasiService {
  // Memanggil PrismaService agar bisa digunakan di seluruh fungsi
  constructor(private prisma: PrismaService) {}

  async create(createDestinasiDto: CreateDestinasiDto) {
    // Menyimpan data baru ke dalam tabel Destinasi
    return this.prisma.destinasi.create({
      data: createDestinasiDto,
    });
  }

  async findAll() {
    // Mengambil seluruh data dari tabel Destinasi
    return this.prisma.destinasi.findMany();
  }

  async findOne(id: number) {
    // Mengambil satu data berdasarkan ID
    const destinasi = await this.prisma.destinasi.findUnique({
      where: { id },
    });

    // Jika data tidak ditemukan di database, lemparkan error 404
    if (!destinasi) {
      throw new NotFoundException(`Destinasi dengan ID ${id} tidak ditemukan`);
    }

    return destinasi;
  }

  async tambahUlasan(input: TambahUlasanInput) {
    // Pastikan destinasi yang direview benar-benar ada sebelum menyimpan
    await this.findOne(input.destinasiId);

    return this.prisma.ulasan.create({
      data: {
        destinasiId: input.destinasiId,
        rating: input.rating,
        komentar: input.komentar,
      },
    });
  }

  async update(id: number, updateDestinasiDto: UpdateDestinasiDto) {
    // Mengubah data berdasarkan ID
    return this.prisma.destinasi.update({
      where: { id },
      data: updateDestinasiDto,
    });
  }

  async remove(id: number) {
    // Menghapus data berdasarkan ID
    return this.prisma.destinasi.delete({
      where: { id },
    });
  }
}