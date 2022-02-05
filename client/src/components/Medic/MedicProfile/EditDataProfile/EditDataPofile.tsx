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
  activeUser: any
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

export default function EditDataProfile({ firstName, lastName, id, dni, email, activeUser }: EditDataProfileProps): JSX.Element {

  const [myInfo, setMyInfo] = useState<Info>({
    firstName: firstName,
    lastName: lastName,
    id: id,
    dni: dni,
    email: email,
    password: "",
    specialitie: ""
  });
  const [loading, setLoading] = useState<any>({
    loading: false,
    specialityError : false
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
    setMyInfo((data: any) => {
      const newState = {
        ...data,
        [e.target.name]: e.target.value
      }
      if(newState.specialitie.length > 0){
        setLoading((data: any) => {
          return {
            ...data,
            specialityError: false
          }
        })
      }

      return newState
    })
   
  }

  function handleSubmit(e: any) {
    e.preventDefault();
    if (!loading.loading && myInfo.specialitie.length > 0) {
      dispatch(updateMedicInfo(activeUser, myInfo, id));
      setLoading((data: any) => {
        return {
          ...data,
          loading: true
        }
      })
    }else{
      setLoading((data: any) => {
        return {
          ...data,
          specialityError: true
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

        <ChangePass activeUser={activeUser} />

        <div className={s.inputContainer}>
          <label className={s.label}>Dni</label>
          <input className={s.input} name="dni" type="text" onChange={handleOnChangeInfo} value={myInfo.dni} />
        </div>
        <div className={s.inputContainer}>
          <label className={s.label}>Specialitie</label>
          <input className={s.input} name="specialitie" type="text" list='specialities'onChange={handleOnChangeInfo} value={myInfo.specialitie} />
          {
            loading.specialityError ? 
            <span className={s.error}>Este campo es obligatorio</span>
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