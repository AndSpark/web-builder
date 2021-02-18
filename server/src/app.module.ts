import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ComponentModule } from './component/component.module';
import { DatabaseConnectionService } from './database-connection.service';
import { TemplateModule } from './template/template.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [TypeOrmModule.forRootAsync({useClass:DatabaseConnectionService}),ComponentModule, TemplateModule],
})
export class AppModule {}
