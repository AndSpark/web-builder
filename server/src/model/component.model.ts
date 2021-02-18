import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'
export class CreateComponentDTO {
  @IsString()
  @ApiProperty()
  title: string;

  @IsString()
  @ApiProperty()
  category: string;

  @IsString()
  @ApiProperty()
  html: string;
  
  @IsString()
  @ApiProperty()
  css: string;

  @IsString()
  @ApiProperty()
  js: string;

  @IsString()
  @ApiProperty()
  ast: JSON;
}

export class CreateComponentBody {
  @ApiProperty()
  component: CreateComponentDTO
}

export class UpdateComponentDTO {
  @ApiProperty()
  @IsString()
  id: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  title: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  category: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  html: string;
  
  @IsString()
  @IsOptional()
  @ApiProperty()
  css: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  js: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  ast: JSON;
}

export class UpdateComponentBody {
  @ApiProperty()
  component:UpdateComponentDTO
}

export interface ComponentBaseInfo {
  id: string;
  title: string;
}

export interface ComponentsListResponse {
  componentsList : {
    header: ComponentBaseInfo [];
    banner: ComponentBaseInfo[];
    about: ComponentBaseInfo[];
    product: ComponentBaseInfo[];
    news: ComponentBaseInfo[];
    partner: ComponentBaseInfo[];
    other: ComponentBaseInfo[];
    plugins: ComponentBaseInfo[];
  }
}

export interface ComponentResponse {
  id: string;
  title: string;
  category: string;
  html: string;
  css: string;
  js: string;
  ast: JSON;
}