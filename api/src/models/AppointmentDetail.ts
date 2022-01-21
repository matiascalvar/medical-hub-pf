import {Model, Column, Table, CreatedAt, UpdatedAt, DataType , AllowNull} from 'sequelize-typescript';

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