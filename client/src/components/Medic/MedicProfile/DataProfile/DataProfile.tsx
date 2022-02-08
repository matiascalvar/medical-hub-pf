import s from "./DataProfile.module.css";

interface DataProfileProps{
    firstName: any;
    lastName: any;
    id : any,
    dni: any,
    email : any,
    availability: any,
    speciality: any
}

export default function DataProfile ({firstName, lastName, id, dni, email, availability, speciality} : DataProfileProps) : JSX.Element {

    
    console.log(speciality)
    return(
        <div>
            <div className={s.dataContainer}>
                
                <span className={s.fullName}>{firstName + " " + lastName}</span>
                <span className={s.planText}>Medic</span>
                <div className={s.labelContainer}>
                    <span className={s.label}>Email:</span>
                    <span className={s.dataLabel}>{email}</span>
                </div>
                <div className={s.labelContainer}>
                    <span className={s.label}>Password:</span>
                    <span className={s.dataLabel}>***********</span>
                </div>
                <div className={s.labelContainer}>
                    <span className={s.label}>DNI:</span>
                    <span className={s.dataLabel}>{dni}</span>
                </div>
                <div className={s.labelContainer}>
                    <span className={s.label}>Availability:</span>
                    <span className={s.dataLabel}>{availability}</span>
                </div>
                <div className={s.labelContainer}>
                    <span className={s.label}>Speciality:</span>
                    <span className={s.dataLabel}>{speciality}</span>
                </div>
            </div>
            
        </div>
    )


}