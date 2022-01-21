import {Model, Column, Table,AllowNull, CreatedAt, UpdatedAt, DataType, Default} from 'sequelize-typescript';


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

	@CreatedAt
	@Column
	createdAt!: Date;

	@UpdatedAt
	@Column
	updatedAt!: Date;
}