import {Model, Column, Table, CreatedAt, UpdatedAt , AllowNull} from 'sequelize-typescript';
@Table
export class UserType extends Model {//<UserType>
	@AllowNull(false)
	@Column
	typeName!: string;

	@AllowNull(false)
	@CreatedAt
	@Column
	createdAt!: Date;

	@AllowNull(false)
	@UpdatedAt
	@Column
	updatedAt!: Date;
}