import {Model, Column, Table, CreatedAt, UpdatedAt, DataType, AllowNull} from 'sequelize-typescript';

@Table
export class AppointmentDetail extends Model {
    @AllowNull(false)
	@Column(DataType.TEXT)
	details!: string;

	@AllowNull(false)
	@CreatedAt
	@Column
	createdAt!: Date;

	@AllowNull(false)
	@UpdatedAt
	@Column
	updatedAt!: Date;
}