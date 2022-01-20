import {Model, Column, Table, CreatedAt, UpdatedAt, DataType, Default, AllowNull} from 'sequelize-typescript';


@Table
export class Appointment extends Model {//<Appointment>
    
	@AllowNull(false)
	@Column
	date!: Date;

	@AllowNull(false)
	@Column
	time!: Date;

	@AllowNull(false)
	@Default('ACTIVE')
    @Column(DataType.ENUM('ACTIVE', 'PAYED', 'COMPLETED'))
    state!: 'ACTIVE'|'PAYED'|'COMPLETED';

	@AllowNull(false)
	@CreatedAt
	@Column
	createdAt!: Date;

	@AllowNull(false)
	@UpdatedAt
	@Column
	updatedAt!: Date;
}