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

	@Default(false)
	@Column
	isAdmin!: boolean;

	@Default(false)
	@Column
	resetPass!: boolean;

	@CreatedAt
	@Column
	createdAt!: Date;

	@UpdatedAt
	@Column
	updatedAt!: Date;
}