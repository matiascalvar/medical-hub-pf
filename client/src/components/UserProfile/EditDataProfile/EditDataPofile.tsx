import { useState } from 'react';
import s from "./EditDataProfile.module.css";
interface EditDataProfileProps{
    firstName: any;
    lastName: any;
    id : any,
    dni: any,
    phone: any,
    planId : any,
    email : any
}
interface Info{
    firstName: any;
    lastName: any;
    id : any,
    dni: any,
    phone: any,
    planId : any,
    email : any,
    password : any
}

export default function EditDataProfile ({firstName, lastName, id, dni, phone, planId, email} : EditDataProfileProps) : JSX.Element {

    const [ myInfo, setMyInfo ] = useState<Info> ({
        firstName: firstName,
        lastName: lastName,
        id: id,
        dni: dni,
        phone: phone,
        planId : planId,
        email: email,
        password: "******"
    });

    function handleOnChangeInfo(e : any){
        setMyInfo((data : any) =>{
            return {
                ...data,
                [e.target.name] : e.target.value
            }
        })
    }

    return (
        <div>
            <form className={s.form}>
                <div className={s.inputContainer}>
                    <label className={s.label}>FirstName:</label>
                    <input className={s.input} name="firstName" type="text" onChange={handleOnChangeInfo} value={myInfo.firstName} />
                </div>
                <div className={s.inputContainer}>
                    <label className={s.label}>LastName</label>
                    <input className={s.input} name="lastName" type="text" onChange={handleOnChangeInfo} value={myInfo.lastName} />
                </div>
                <div className={s.inputContainer}>
                    <label className={s.label}>Email</label>
                    <input className={s.input} name="email" type="text" onChange={handleOnChangeInfo} value={myInfo.email} />
                </div>
                <div className={s.inputContainer}>
                    <label className={s.label}>Password</label>
                    <input className={s.input} name="password" type="text" onChange={handleOnChangeInfo} value={myInfo.password} />
                </div>
                <div className={s.inputContainer}>
                    <label className={s.label}>Dni</label>
                    <input className={s.input} name="dni" type="text" onChange={handleOnChangeInfo} value={myInfo.dni} />
                </div>
                <div className={s.inputContainer}>
                    <label className={s.label}>Phone</label>
                    <input className={s.input} name="phone" type="text" onChange={handleOnChangeInfo} value={myInfo.phone} />
                </div>
                <button type='submit' className={s.saveButton}>Save changes</button>
            </form>
        </div>
    )
}