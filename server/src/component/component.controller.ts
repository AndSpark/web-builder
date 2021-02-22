import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOkResponse, ApiParam } from '@nestjs/swagger';
import { ComponentResponse, ComponentsListResponse, CreateComponentBody, UpdateComponentBody } from 'src/model/component.model';
import { ComponentService } from './component.service';

@Controller('Component')
export class ComponentController {
  constructor(private readonly ComponentService: ComponentService) { }
  
  @ApiOkResponse({ description: '所有组件列表' })
  @Get()
  async findAll():Promise<ComponentsListResponse> {
    const componentsList = await this.ComponentService.findAll();
    return componentsList
  }

  @ApiOkResponse({ description: '获得指定组件' })
  @ApiParam({name:"id"})
  @Get('/:id')
  async findOne(@Param('id') id:string):Promise<ComponentResponse> {
    const component = await this.ComponentService.findOne(id);
    return component
  }

  @ApiOkResponse({ description: '创建组件' })
  @Post()
  async create(@Body() data:CreateComponentBody): Promise<ComponentResponse>{
    const component = await this.ComponentService.createComponent(data.component)
    return component
  }

  @ApiOkResponse({ description: '更新组件' })
  @Put()
  async updateComponent(@Body() data: UpdateComponentBody): Promise<ComponentResponse>{
    const component = await this.ComponentService.updateComponent(data.component)
    return component
  }

  @ApiOkResponse({ description: '删除组件' })
  @ApiParam({name:"id"})
  @Delete('/:id')
  async deleteComponent(@Param('id') id: string){
    await this.ComponentService.deleteComponent(id)
    return {msg:'success'}
  }
}
