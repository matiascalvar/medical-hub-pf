import {Model, Column, Table, CreatedAt, UpdatedAt, AllowNull} from 'sequelize-typescript';

@Table
export class Specialitie extends Model {

	@AllowNull(false)
	@Column
	name!: string;     

	@AllowNull(false)
	@CreatedAt
	@Column
	createdAt!: Date;

	@AllowNull(false)
	@UpdatedAt
	@Column
	updatedAt!: Date;

}