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
    const [errors, setErrors] = useState<any> ({
        firstName: false,
        lastName: false,
        dni: false,
        phone: false
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
           const newState = {
                ...data,
                [e.target.name] : e.target.value
            }
            validate(newState, e);

            return newState
        })
    }

    function validate(state: any, e : any){

        const name: any = e.target.name
        if(state[name].length === 0){
            setErrors((data : any) =>{
                return{
                    ...data,
                    [name]:true
                }
            })
        }else{
            setErrors((data : any) =>{
                return{
                    ...data,
                    [name]:false
                }
            })
        }
        if(!/^([0-9])*$/.test(state.dni)){
            setErrors((data : any) =>{
                return{
                    ...data,
                    dni:true
                }
            })
        }
        if(!/^([0-9])*$/.test(state.phone)){
            setErrors((data : any) =>{
                return{
                    ...data,
                    phone:true
                }
            })
        }
        if(!/^[A-Z]+$/i.test(state.firstName)){
            setErrors((data : any) =>{
                return{
                    ...data,
                    firstName:true
                }
            })
        }
        if(!/^[A-Z]+$/i.test(state.lastName)){
            setErrors((data : any) =>{
                return{
                    ...data,
                    lastName:true
                }
            })
        }
    }

    function handleSubmit(e : any){
        if(!loading.loading && 
            !errors.firstName && 
            !errors.lastName &&
            !errors.dni &&
            !errors.phone){
            dispatch(updatePatientInfo(activeUser, myInfo));
            setLoading((data:any)=>{
                return{
                    ...data,
                    loading:true
                }
            });
           
            
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className={s.form}>
                <div className={s.inputContainer}>
                    <label className={s.label}>FirstName:</label>
                    <input className={s.input} name="firstName" type="text" onChange={handleOnChangeInfo} value={myInfo.firstName} />
                    {
                        errors.firstName ? 
                        <span className={s.inputError}>* (this field is required only letters)</span> 
                        : ""
                    }
                </div>
                <div className={s.inputContainer}>
                    <label className={s.label}>LastName</label>
                    <input className={s.input} name="lastName" type="text" onChange={handleOnChangeInfo} value={myInfo.lastName} />
                    {
                        errors.lastName ? 
                        <span className={s.inputError}>* (this field is required only letters)</span> 
                        : ""
                    }
                </div>
                <div className={s.inputContainer}>
                    <label className={s.label}>Email</label>
                    <span className={s.inputEmail}>{myInfo.email}</span>
                </div>
                
                <ChangePass activeUser={activeUser}/>
                
                <div className={s.inputContainer}>
                    <label className={s.label}>Dni</label>
                    <input className={s.input} name="dni" type="text" onChange={handleOnChangeInfo} value={myInfo.dni} />
                    {
                        errors.dni ? 
                        <span className={s.inputError}>* (this field is required only numbers)</span> 
                        : ""
                    }
                </div>
                <div className={s.inputContainer}>
                    <label className={s.label}>Phone</label>
                    <input className={s.input} name="phone" type="text" onChange={handleOnChangeInfo} value={myInfo.phone} />
                    {
                        errors.phone ? 
                        <span className={s.inputError}>* (this field is required only numbers)</span> 
                        : ""
                    }
                </div>
                {
                    response.message ? <div className={s.alert}>Data updated</div> : ""
                }
                <button type='submit' className={s.saveButton}>{loading.loading ? <div className={s.loading}></div> : "Save Changes"}</button>
            </form>
        </div>
    )
}