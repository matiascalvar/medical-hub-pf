import {
  Model,
  Column,
  Table,
  CreatedAt,
  UpdatedAt,
  DataType,
  Default,
} from "sequelize-typescript";

@Table
export class Appointment extends Model {
  //<Appointment>
  @Column(DataType.DATEONLY)
  date!: number;

  @Column(DataType.TIME)
  time!: number;

  @Default("ACTIVE")
  @Column(DataType.ENUM("ACTIVE", "CANCELLED", "COMPLETED"))
  state!: "ACTIVE" | "CANCELLED" | "COMPLETED";

  @Default(false)
  @Column
  pay!: boolean;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;
}
