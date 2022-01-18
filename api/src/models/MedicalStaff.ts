import {Model, Column,Default, Table, CreatedAt,DataType,  UpdatedAt} from 'sequelize-typescript';
// testeo de var enum  sin valores asignados


@Table
export class MedicalStaff extends Model {
	
    
    @Column
	name!: string;

    @Column
	idNumber!: number;

	@Default('enable')
	@Column(DataType.ENUM('enable', 'not available'))
    availability!: "enable"| "not available";


    @Column
	avbFrom!: Date ;

    @Column
	avbTo!: Date ;

    @Column
	appointmentDuration!: Date ;


	@CreatedAt
	@Column
	createdAt!: Date;

	@UpdatedAt
	@Column
	updatedAt!: Date;
}