import {Model, Column, Table, CreatedAt, UpdatedAt , AllowNull} from 'sequelize-typescript';
@Table
export class Patient extends Model {//<Patient>
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

	@AllowNull(false)
	@CreatedAt
	@Column
	createdAt!: Date;

	@AllowNull(false)
	@UpdatedAt
	@Column
	updatedAt!: Date;
}