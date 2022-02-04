import s from "./DataProfile.module.css";

interface DataProfileProps{
    firstName: any;
    lastName: any;
    id : any,
    dni: any,
    email : any
}

export default function DataProfile ({firstName, lastName, id, dni, email} : DataProfileProps) : JSX.Element {

    

    return(
        <div>
            <div className={s.dataContainer}>
                
                <span className={s.fullName}>{firstName + " " + lastName}</span>
                <span className={s.planText}>Plan</span>
                <div className={s.planContainer}>
                    <span>Gold</span>
                </div>
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
            </div>
            
        </div>
    )


}