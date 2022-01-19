import {Model, Column, Table, CreatedAt, UpdatedAt, Default} from 'sequelize-typescript';
@Table
export class User extends Model {//<User>
    @Column
	email!: string;

	@Column
	hashedPass!: string;

	@Default(true)
	@Column
	active!: boolean;

	@Default(false)
	@Column
	isStaff!: boolean;

	@CreatedAt
	@Column
	createdAt!: Date;

	@UpdatedAt
	@Column
	updatedAt!: Date;
}