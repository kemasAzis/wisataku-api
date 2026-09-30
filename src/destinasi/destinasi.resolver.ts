import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { DestinasiService } from './destinasi.service';
import { DestinasiModel } from './graphql/destinasi.object';

@Resolver(() => DestinasiModel)
export class DestinasiResolver {
  constructor(private readonly destinasiService: DestinasiService) {}

  @Query(() => [DestinasiModel], { name: 'destinasiList' })
  findAll() {
    return this.destinasiService.findAll();
  }

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
}