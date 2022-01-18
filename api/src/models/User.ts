import {Model, Column, Table, CreatedAt, UpdatedAt} from 'sequelize-typescript';
@Table
export class User extends Model<User> {
    @Column
	email!: string;

	@Column
	hashedPass!: string;

	@Column
	active!: boolean;

	@Column
	isStaff!: boolean;

	@CreatedAt
	@Column
	createdAt!: Date;

	@UpdatedAt
	@Column
	updatedAt!: Date;
}