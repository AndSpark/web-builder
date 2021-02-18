import { ApiProperty } from '@nestjs/swagger'
import { IsObject, IsOptional, IsString } from 'class-validator'
export class CreateTemplateDTO {
  @IsObject()
  @ApiProperty()
  options: Object;

  @IsString()
  @ApiProperty()
  html: string;
  @IsString()
  @ApiProperty()
  style: string;
  @IsString()
  @ApiProperty()
  js: string;
}

export class CreateTemplateBody {
  @ApiProperty()
  template: CreateTemplateDTO
}

