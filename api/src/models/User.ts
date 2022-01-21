import {Model, Column, Table, CreatedAt, UpdatedAt, Default, AllowNull} from 'sequelize-typescript';
@Table
export class User extends Model {//<User>
    
   @AllowNull(false)  
	@Column
	email!: string;

   @AllowNull(false)
	@Column
	hashedPass!: string;

   @AllowNull(false)
	@Default(true)
	@Column
	active!: boolean;

   @AllowNull(false)
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