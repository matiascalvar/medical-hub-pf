import {Model, Column, Table, CreatedAt, UpdatedAt, DataType} from 'sequelize-typescript';

@Table
export class AppointmentDetail extends Model {
    @Column(DataType.TEXT)
	details!: string;

	@CreatedAt
	@Column
	createdAt!: Date;

	@UpdatedAt
	@Column
	updatedAt!: Date;
}