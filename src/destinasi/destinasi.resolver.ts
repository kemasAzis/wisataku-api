import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { DestinasiService } from './destinasi.service';
import { DestinasiModel } from './graphql/destinasi.object';
import { UlasanModel } from './graphql/ulasan.object';
import { FasilitasModel } from './graphql/fasilitas.object';
import { TambahUlasanInput } from './dto/tambah-ulasan.input';
import { PrismaService } from '../prisma.service';

@Resolver(() => DestinasiModel)
export class DestinasiResolver {
  constructor(
    private readonly destinasiService: DestinasiService,
    private readonly prisma: PrismaService,
  ) {}

  // Query untuk mengambil semua daftar destinasi
  @Query(() => [DestinasiModel], { name: 'destinasiList' })
  findAll() {
    return this.destinasiService.findAll();
  }

  // Query untuk mengambil satu destinasi berdasarkan ID
  @Query(() => DestinasiModel, { name: 'destinasi' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.destinasiService.findOne(id);
  }

  // Mutasi untuk menambah destinasi
  @Mutation(() => DestinasiModel, { name: 'createDestinasi' })
  create(
    @Args('nama') nama: string,
    @Args('kategori') kategori: string,
    @Args('hargaTiket', { type: () => Int }) hargaTiket: number,
  ) {
    return this.destinasiService.create({
      nama,
      kategori,
      hargaTiket,
    });
  }

  // Mutasi untuk menambah ulasan pada suatu destinasi
  @Mutation(() => UlasanModel, { name: 'tambahUlasan' })
  tambahUlasan(@Args('input') input: TambahUlasanInput) {
    return this.destinasiService.tambahUlasan(input);
  }

  // Resolver bertingkat untuk nilai rata-rata rating ulasan
  @ResolveField('ratingRata', () => Number)
  async getRatingRata(@Parent() destinasi: DestinasiModel): Promise<number> {
    const agregat = await this.prisma.ulasan.aggregate({
      where: { destinasiId: destinasi.id },
      _avg: { rating: true },
    });

    // Belum ada ulasan -> 0, dibulatkan 1 angka desimal
    return Math.round((agregat._avg.rating ?? 0) * 10) / 10;
  }

  // Resolver bertingkat untuk field ulasan
  @ResolveField('ulasan', () => [UlasanModel])
  async getUlasan(@Parent() destinasi: DestinasiModel) {
    return this.prisma.ulasan.findMany({
      where: { destinasiId: destinasi.id },
      orderBy: { createdAt: 'desc' },
    });
  }

  // Resolver bertingkat untuk field fasilitas
  @ResolveField('fasilitas', () => [FasilitasModel])
  async getFasilitas(@Parent() destinasi: DestinasiModel) {
    return this.prisma.fasilitas.findMany({
      where: { destinasiId: destinasi.id },
      orderBy: { namaFasilitas: 'asc' },
    });
  }
}
