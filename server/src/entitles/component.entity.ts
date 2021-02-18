import { Column, Entity } from "typeorm";
import { AbstractEntity } from "./abstract-entity";
import { classToPlain } from 'class-transformer';
import { ComponentResponse } from "src/model/component.model";

@Entity('component')
export class ComponentEntity extends AbstractEntity {
  @Column()
  title: string;

  @Column()
  category: string;

  @Column()
  html: string;
  
  @Column()
  css: string;

  @Column()
  js: string;

  @Column()
  ast: JSON;

  toObj():ComponentResponse {
    return  <ComponentResponse>classToPlain(this)
  }
}