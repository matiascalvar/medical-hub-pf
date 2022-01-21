import {Model, Column,Default,AllowNull, Table, CreatedAt,DataType,  UpdatedAt} from 'sequelize-typescript';
// testeo de var enum  sin valores asignados


@Table
export class StudyType extends Model {
   
   @AllowNull(false) 
    @Column 
	name!: string;
	
   @AllowNull(false)
	@Column(DataType.TEXT)
	neededPreparation!: string;

    @CreatedAt
	@Column
	createdAt!: Date;

	@UpdatedAt
	@Column
	updatedAt!: Date;
}