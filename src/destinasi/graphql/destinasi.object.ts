import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { UlasanModel } from './ulasan.object';
import { FasilitasModel } from './fasilitas.object';

@ObjectType()
export class DestinasiModel {
  @Field(() => Int)
  id: number;

  @Field()
  nama: string;

  @Field()
  kategori: string;

  @Field(() => Int)
  hargaTiket: number;

  // Diisi oleh @ResolveField, dihitung dari agregasi tabel Ulasan
  @Field(() => Float)
  ratingRata: number;

  @Field(() => [UlasanModel])
  ulasan: UlasanModel[];

  @Field(() => [FasilitasModel])
  fasilitas: FasilitasModel[];

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}