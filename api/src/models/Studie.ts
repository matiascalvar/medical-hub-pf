import {Model, Column,Default, Table,AllowNull, CreatedAt,DataType,  UpdatedAt} from 'sequelize-typescript';
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

    @CreatedAt
	@Column
	createdAt!: Date;

	@UpdatedAt
	@Column
	updatedAt!: Date;
}