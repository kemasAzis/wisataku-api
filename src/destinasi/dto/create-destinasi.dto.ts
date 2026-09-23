import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsNotEmpty, Min } from 'class-validator';

export class CreateDestinasiDto {
  @ApiProperty({ example: 'Pantai Kuta Mandalika' })
  @IsString()
  @IsNotEmpty()
  nama: string;

  @ApiProperty({ example: 'Pantai' })
  @IsString()
  @IsNotEmpty()
  kategori: string;

  @ApiProperty({ example: 15000 })
  @IsNumber()
  @Min(0)
  hargaTiket: number;
}