import { ObjectType, Field, Int } from '@nestjs/graphql';

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

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}