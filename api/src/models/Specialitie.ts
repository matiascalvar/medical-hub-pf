import {Model, Column, Table, CreatedAt, UpdatedAt, AllowNull} from 'sequelize-typescript';

@Table
export class Specialitie extends Model {

	@AllowNull(false)
	@Column
	name!: string;     

	
	@CreatedAt
	@Column
	createdAt!: Date;

	
	@UpdatedAt
	@Column
	updatedAt!: Date;

}
