import {Model, Column, Table, CreatedAt, UpdatedAt} from 'sequelize-typescript';


export class Specialities extends Model<Specialities> {

    
	@CreatedAt
	@Column
	createdAt!: Date;

	@UpdatedAt
	@Column
	updatedAt!: Date;

}