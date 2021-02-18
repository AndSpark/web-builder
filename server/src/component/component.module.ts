import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComponentEntity } from 'src/entitles/component.entity';
import { ComponentController } from './component.controller';
import { ComponentService } from './component.service';

@Module({
  imports:[TypeOrmModule.forFeature([ComponentEntity])],
  controllers: [ComponentController],
  providers: [ComponentService]
})
export class ComponentModule {}
