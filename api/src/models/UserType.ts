import {Model, Column, Table, CreatedAt, UpdatedAt , AllowNull} from 'sequelize-typescript';
@Table
export class UserType extends Model {//<UserType>
	@AllowNull(false)
	@Column
	typeName!: string;

	
	@CreatedAt
	@Column
	createdAt!: Date;

	
	@UpdatedAt
	@Column
	updatedAt!: Date;
}
