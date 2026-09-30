import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class UlasanModel {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  rating: number;

  @Field()
  komentar: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
