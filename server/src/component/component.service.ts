import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ComponentEntity } from 'src/entitles/component.entity';
import { ComponentResponse, ComponentsListResponse, CreateComponentDTO, UpdateComponentDTO } from 'src/model/component.model';
import { Repository } from 'typeorm';

@Injectable()
export class ComponentService {
  constructor(@InjectRepository(ComponentEntity) private ComponentRepo: Repository<ComponentEntity>) { }
  
  async findAll():Promise<ComponentsListResponse> {
    const components = await this.ComponentRepo.find()
    let componentsList = {
      header:  [],
      banner: [],
      about: [],
      product: [],
      news: [],
      partner: [],
      footer:[],
      other: [],
      plugins: [],
    }
    components.forEach(component => {
      for (const key in componentsList) {
        if (key === component.category) {
          componentsList[key].push(
            {
              id: component._id,
              title: component.title
            }
          )
        }
      }
    })
    return {componentsList}
  }

  async findOne(id):Promise<ComponentResponse> {
    const component =  (await this.ComponentRepo.findOne(id)).toObj()
    Object.assign(component,{id})
    return component
  }

  async createComponent(data:CreateComponentDTO):Promise<ComponentResponse> {
    const component = this.ComponentRepo.create(data)
    return (await this.ComponentRepo.save(component)).toObj()
  }

  async updateComponent(data: UpdateComponentDTO): Promise<ComponentResponse> {
    await this.ComponentRepo.update(data.id, data)
    return (await this.ComponentRepo.findOne(data.id)).toObj()
  }

  async deleteComponent(id:string) {
    const component = await this.ComponentRepo.findOne(id)
    await this.ComponentRepo.remove(component)
  }
}
