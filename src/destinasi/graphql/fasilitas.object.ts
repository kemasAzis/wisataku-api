import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class FasilitasModel {
  @Field(() => Int)
  id: number;

  @Field()
  namaFasilitas: string;
}
