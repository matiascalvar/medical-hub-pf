import {Model, Column, Table, CreatedAt, UpdatedAt} from 'sequelize-typescript';
@Table
export class Administrator extends Model {
    @Column
	firstName!: string;

	@Column
	lastName!: string;

	@Column
	email!: string;

	@Column
	phone!: number;

	@Column
	dni!: number;

	@CreatedAt
	@Column
	createdAt!: Date;

	@UpdatedAt
	@Column
	updatedAt!: Date;
}