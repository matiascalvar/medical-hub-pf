import {Model, Column,Default, Table, CreatedAt,DataType,  UpdatedAt} from 'sequelize-typescript';
// testeo de var enum  sin valores asignados


@Table
export class Studie extends Model {

    @Column
	state!: string;

    @Column
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