import {Model, Column, Table, CreatedAt, UpdatedAt} from 'sequelize-typescript';



@Table
export class MedicalStaff_Specialities extends Model<MedicalStaff_Specialities> {

	@Column
	name!: string;   

    @CreatedAt
	@Column
	createdAt!: Date;

	@UpdatedAt
	@Column
	updatedAt!: Date;
}
	