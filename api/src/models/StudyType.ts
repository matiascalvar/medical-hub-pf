import {Model, Column,Default, Table, CreatedAt,DataType,  UpdatedAt, AllowNull} from 'sequelize-typescript';
// testeo de var enum  sin valores asignados


@Table
export class StudyType extends Model {
   
	@AllowNull(false)
    @Column
	name!: string;
	
	@AllowNull(false)
	@Column(DataType.TEXT)
	neededPreparation!: string;

	@AllowNull(false)
    @CreatedAt
	@Column
	createdAt!: Date;

	@AllowNull(false)
	@UpdatedAt
	@Column
	updatedAt!: Date;
}