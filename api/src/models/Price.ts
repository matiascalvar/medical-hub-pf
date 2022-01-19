import { Model, Column, Table, CreatedAt, UpdatedAt } from 'sequelize-typescript';

@Table
export class Price extends Model {

    @Column
	price!: number;

	@CreatedAt
	@Column
	createdAt!: Date;

	@UpdatedAt
	@Column
	updatedAt!: Date;
}