import { useState , useEffect } from 'react';
import s from "./EditDataProfile.module.css";
import { useSelector, useDispatch } from 'react-redux';
import {updatePatientInfo} from "../../../actions/index";
import ChangePass from "./ChangePass/ChangePass";

interface EditDataProfileProps{
    firstName: any;
    lastName: any;
    id : any,
    dni: any,
    phone: any,
    planId : any,
    email : any,
    activeUser : any
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

export default function EditDataProfile ({firstName, lastName, id, dni, phone, planId, email, activeUser} : EditDataProfileProps) : JSX.Element {

    const [ myInfo, setMyInfo ] = useState<Info> ({
        firstName: firstName,
        lastName: lastName,
        id: id,
        dni: dni,
        phone: phone,
        planId : planId,
        email: email,
        password: ""
    });
    const [loading, setLoading] = useState<any> ({
        loading: false
    })
    const response = useSelector((state :any) => state.updateResponse);
    const dispatch = useDispatch();

    useEffect(() =>{
        if(response){
            setLoading((data:any)=>{
                return{
                    ...data,
                    loading:false
                }
            })
        }
    }, [response]);

    function handleOnChangeInfo(e : any){
        setMyInfo((data : any) =>{
            return {
                ...data,
                [e.target.name] : e.target.value
            }
        })
    }

    function handleSubmit(e : any){
        e.preventDefault();
        if(!loading.loading){
            dispatch(updatePatientInfo(activeUser, myInfo));
            setLoading((data:any)=>{
                return{
                    ...data,
                    loading:true
                }
            })
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className={s.form}>
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
                    <span className={s.inputEmail}>{myInfo.email}</span>
                </div>
                
                <ChangePass activeUser={activeUser}/>
                
                <div className={s.inputContainer}>
                    <label className={s.label}>Dni</label>
                    <input className={s.input} name="dni" type="text" onChange={handleOnChangeInfo} value={myInfo.dni} />
                </div>
                <div className={s.inputContainer}>
                    <label className={s.label}>Phone</label>
                    <input className={s.input} name="phone" type="text" onChange={handleOnChangeInfo} value={myInfo.phone} />
                </div>
                {
                    response.message ? <div className={s.alert}>Datos actualizados</div> : ""
                }
                <button type='submit' className={s.saveButton}>{loading.loading ? <div className={s.loading}></div> : "Save Changes"}</button>
            </form>
        </div>
    )
}