import {Model, Column, Table, CreatedAt, UpdatedAt} from 'sequelize-typescript';

@Table
export class Specialitie extends Model {

	@Column
	name!: string;     

	@CreatedAt
	@Column
	createdAt!: Date;

	@UpdatedAt
	@Column
	updatedAt!: Date;

}