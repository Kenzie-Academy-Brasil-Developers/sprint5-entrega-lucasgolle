import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
} from "typeorm";
import { v4 as uuid } from "uuid";


@Entity()
@Unique(["email"])
export class User {
  @PrimaryColumn("uuid")
  readonly id: string;
  @Column()
  email: string;
  @Column()
  name: string;
  @Column()
  age: number;
  @Column()
  password: string;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
