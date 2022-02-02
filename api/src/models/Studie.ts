import {Model, Column,Default, Table, CreatedAt,DataType,  UpdatedAt} from 'sequelize-typescript';
// testeo de var enum  sin valores asignados


@Table
export class Studie extends Model {

    @Default('ACTIVE')
	@Column(DataType.ENUM('ACTIVE','COMPLETED'))
	state!: 'ACTIVE'|'COMPLETED';

	@Column(DataType.TEXT)
	diagnosis!: string;

    @Column
	studyPDF!: string;

    @CreatedAt
	@Column
	createdAt!: Date;

	@UpdatedAt
	@Column
	updatedAt!: Date;
}