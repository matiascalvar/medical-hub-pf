import {Model, Column, Table, CreatedAt, UpdatedAt, AllowNull} from 'sequelize-typescript';
@Table
export class Plan extends Model {//<Plan>
    
	@AllowNull(false)
	@Column
	name!: string;

	@AllowNull(false)
	@Column
	coveragePercentage!: number;

	@AllowNull(false)
	@CreatedAt
	@Column
	createdAt!: Date;

	@AllowNull(false)
	@UpdatedAt
	@Column
	updatedAt!: Date;
}