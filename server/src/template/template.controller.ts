import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateTemplateBody } from 'src/model/template.model';
import {TemplateService} from 'src/template/template.service'
@Controller('template')
export class TemplateController {
  constructor(private TemplateService: TemplateService){}

  @Post()
  async createTemplate(@Body() data: CreateTemplateBody) {
    if(!data.template){return ''}
    return this.TemplateService.createTemplate(data.template)
  }
}
