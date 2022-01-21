import {Model, Column, Table, CreatedAt,AllowNull, UpdatedAt, DataType} from 'sequelize-typescript';

@Table
export class AppointmentDetail extends Model {
   
	@AllowNull(false)
	@Column(DataType.TEXT)
	details!: string;

	@CreatedAt
	@Column
	createdAt!: Date;

	@UpdatedAt
	@Column
	updatedAt!: Date;
}