import {Model, Column, Table, CreatedAt, UpdatedAt} from 'sequelize-typescript';
// testeo de var enum  sin valores asignados
enum E1 {
    X,
    Y,
    Z,
  }

@Table
export class MedicalStaff extends Model<MedicalStaff> {
	
    
    @Column
	name!: string;

    @Column
	idNumber!: number;

    @Column
	availability!: E1 ;

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