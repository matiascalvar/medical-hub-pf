import {Model, Column, Table, CreatedAt, UpdatedAt, AllowNull} from 'sequelize-typescript';
@Table
export class Plan extends Model {//<Plan>
    
	@AllowNull(false)
	@Column
	name!: string;

	@AllowNull(false)
	@Column
	coveragePercentage!: number;

	
	@CreatedAt
	@Column
	createdAt!: Date;

	
	@UpdatedAt
	@Column
	updatedAt!: Date;
}
