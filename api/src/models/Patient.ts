import {
  Model,
  Column,
  Table,
  CreatedAt,
  UpdatedAt,
} from "sequelize-typescript";
import { DataType, DataTypes } from "sequelize/types";
@Table
export class Patient extends Model {
  //<Patient>
  @Column
  firstName!: string;

  @Column
  lastName!: string;

  @Column
  phone!: bigint;

  @Column
  dni!: bigint;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;
}
