import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ComponentModule } from './component/component.module';
import { DatabaseConnectionService } from './database-connection.service';
import { TemplateModule } from './template/template.module';
import {ConfigModule} from '@nestjs/config'
import * as path from 'path'
import { StsController } from './sts/sts.controller';

@Module({
  controllers: [StsController,AppController],
  providers: [AppService],
  imports: [ConfigModule.forRoot({
    envFilePath: path.join(__dirname,'../.env'),
    isGlobal:true
  }),TypeOrmModule.forRootAsync({useClass:DatabaseConnectionService}),ComponentModule, TemplateModule],
})
export class AppModule {}
