import {Model, Column, Table, CreatedAt, UpdatedAt} from 'sequelize-typescript';




export class MedicalStaff_Specialities extends Model<MedicalStaff_Specialities> {

    @CreatedAt
	@Column
	createdAt!: Date;

	@UpdatedAt
	@Column
	updatedAt!: Date;
}
	