import {Model, Column,Default, Table, CreatedAt,DataType,  UpdatedAt, AllowNull} from 'sequelize-typescript';
// testeo de var enum  sin valores asignados


@Table
export class Studie extends Model {

	@AllowNull(false)
    @Default('ACTIVE')
	@Column(DataType.ENUM('ACTIVE', 'PAYED', 'COMPLETED'))
	state!: 'ACTIVE'|'PAYED'|'COMPLETED';

	@AllowNull(false)
	@Column(DataType.TEXT)
	diagnosis!: string;

	@AllowNull(false)
    @Column
	studyPDF!: string;

	@AllowNull(false)
    @CreatedAt
	@Column
	createdAt!: Date;

	@AllowNull(false)
	@UpdatedAt
	@Column
	updatedAt!: Date;
}