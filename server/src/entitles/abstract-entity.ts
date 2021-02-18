import { BaseEntity, ObjectIdColumn, ObjectID, CreateDateColumn, UpdateDateColumn, BeforeInsert, Column, AfterInsert } from "typeorm";
import { Exclude, Expose } from 'class-transformer';


export abstract class AbstractEntity extends BaseEntity {
  @ObjectIdColumn()
  @Exclude()
  _id: ObjectID;

  @Expose()
  @Column()
  id: string;

  @Exclude()
  @CreateDateColumn()
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn()
  updatedAt: Date;

  @AfterInsert()
  setId() {
    this.id = this._id.toString()
  }
}
