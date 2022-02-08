import { useState, useEffect } from 'react';
import s from "./EditDataProfile.module.css";
import { useSelector, useDispatch } from 'react-redux';
import { updateMedicInfo, getSpecialities } from "../../../../actions/index";
import ChangePass from "./ChangePass/ChangePass";

interface EditDataProfileProps {
  firstName: any;
  lastName: any;
  id: any,
  dni: any,
  email: any,
  activeUser: any,
  speciality: any
}

interface Info {
  firstName: any;
  lastName: any;
  id: any,
  dni: any,
  email: any,
  password: any,
  specialitie : any
}

export default function EditDataProfile({ firstName, lastName, id, dni, email, activeUser, speciality}: EditDataProfileProps): JSX.Element {

  const [myInfo, setMyInfo] = useState<Info>({
    firstName: firstName,
    lastName: lastName,
    id: id,
    dni: dni,
    email: email,
    password: "",
    specialitie: speciality
  });
  const [loading, setLoading] = useState<any>({
    loading: false
  })
  const [errors, setErrors] = useState<any> ({
    firstName: false,
    lastName: false,
    dni: false,
    specialitie: false
})
  const response = useSelector((state: any) => state.updateResponse);
  const specialitie = useSelector((state: any) => state.specialities);
  const dispatch = useDispatch();
  useEffect(() => {
    if (response) {
      setLoading((data: any) => {
        return {
          ...data,
          loading: false
        }
      })
    }
    if (specialitie.length === 0) {
      dispatch(getSpecialities());
    }
  }, [response, specialitie]);

  function handleOnChangeInfo(e: any) {
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
    if(state.specialitie.length > 0){
      setLoading((data: any) => {
        return {
          ...data,
          specialityError: false
        }
      })
    }
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

  function handleSubmit(e: any) {
    if (!loading.loading &&
      !errors.firstName && 
      !errors.lastName &&
      !errors.dni &&
      myInfo.specialitie.length > 0) {
      dispatch(updateMedicInfo(activeUser, myInfo, id));
      setLoading((data: any) => {
        return {
          ...data,
          loading: true
        }
      })
    }else if(myInfo.specialitie.length === 0){
      setErrors((data: any) => {
        return {
          ...data,
          specialitie: true
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

        <ChangePass activeUser={activeUser} />

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
          <label className={s.label}>Specialitie</label>
          <input className={s.input} name="specialitie" type="text" list='specialities'onChange={handleOnChangeInfo} value={myInfo.specialitie} />
          {
            errors.specialitie ? 
            <span className={s.inputError}>* This field is required</span>
            : ""
          }
          <datalist id="specialities">
            {
              specialitie && specialitie.length > 0 ? specialitie.map((data: any) =>(
                <option key={data.id} value={data.name} />
              )) : ""
            }
          </datalist>
        </div>
        {
          response.message ? <div className={s.alert}>Datos actualizados</div> : ""
        }
        <button type='submit' className={s.saveButton}>{loading.loading ? <div className={s.loading}></div> : "Save Changes"}</button>
      </form>
    </div>
  )
}