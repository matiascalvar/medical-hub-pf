import {Model, Column, Table, CreatedAt, UpdatedAt, AllowNull} from 'sequelize-typescript';
@Table
export class Administrator extends Model {
    
	@AllowNull(false)
	@Column
	firstName!: string;

	@AllowNull(false)
	@Column
	lastName!: string;

	@AllowNull(false)
	@Column
	email!: string;

	@AllowNull(false)
	@Column
	phone!: number;

	@AllowNull(false)
	@Column
	dni!: number;

	@CreatedAt
	@Column
	createdAt!: Date;

	@UpdatedAt
	@Column
	updatedAt!: Date;
}