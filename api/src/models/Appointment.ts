import {Model, Column, Table, CreatedAt, UpdatedAt, DataType, Default} from 'sequelize-typescript';


@Table
export class Appointment extends Model {//<Appointment>
    @Column
	date!: Date;

	@Column
	time!: Date;

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