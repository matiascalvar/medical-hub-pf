import {Model, Column,Default, Table, CreatedAt,DataType,  UpdatedAt} from 'sequelize-typescript';
// testeo de var enum  sin valores asignados


@Table
export class StudyType extends Model {
   
    @Column
	name!: string;
	
	@Column(DataType.TEXT)
	neededPreparation!: string;

    @CreatedAt
	@Column
	createdAt!: Date;

	@UpdatedAt
	@Column
	updatedAt!: Date;
}