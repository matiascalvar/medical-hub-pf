import {
  Model,
  Column,
  Default,
  Table,
  CreatedAt,
  DataType,
  UpdatedAt,
} from "sequelize-typescript";
// testeo de var enum  sin valores asignados

@Table
export class MedicalStaff extends Model {
  @Column
  firstName!: string;

  @Column
  lastName!: string;

  @Column
  idNumber!: bigint;

  @Default("L a V")
  @Column(DataType.ENUM("L a V", "L M V"))
  availability!: "L a V'|'L M V";

  @Column(DataType.TIME)
  avbFrom!: number;

  @Column(DataType.TIME)
  avbTo!: number;

  @Column(DataType.TIME)
  appointmentDuration!: number;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;
}
