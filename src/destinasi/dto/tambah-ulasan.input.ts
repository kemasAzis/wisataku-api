import { InputType, Field, Int } from '@nestjs/graphql';
import { IsInt, IsString, IsNotEmpty, Min, Max } from 'class-validator';

@InputType()
export class TambahUlasanInput {
  @Field(() => Int)
  @IsInt()
  @Min(1)
  destinasiId: number;

  @Field(() => Int)
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @Field()
  @IsString()
  @IsNotEmpty()
  komentar: string;
}
