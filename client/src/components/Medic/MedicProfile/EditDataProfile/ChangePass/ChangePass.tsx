import s from "./ChangePass.module.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { changePassword } from "../../../../../actions/index";



interface ChangePassProps {
  activeUser: any
}

export default function ChangePass({ activeUser }: ChangePassProps): JSX.Element {

  const [changePass, setChangePass] = useState<any>({
    password: ""
  })
  const [tooltipState, setTooltip] = useState<any>({
    tooltip: false,
    loading: false,
    error: false
  })
  const response = useSelector((state: any) => state.changePassResponse);
  const dispatch = useDispatch();

  useEffect(() =>{
    if(response.message){
      setTooltip((data: any) => {
        return {
          ...data,
          loading: false,
          tooltip:false
        }
      })
    }
  },[response])

  function handleOnChangePass(e: any) {
    setChangePass((data: any) => {
      return {
        ...data,
        [e.target.name]: e.target.value
      }
    })
  }

  function tooltip(e: any) {
    if (e.target.name === "cancel") {
      setTooltip((data: any) => {
        return {
          ...data,
          tooltip: false,
          error: false
        }
      })
    } else {
      setTooltip((data: any) => {
        return {
          ...data,
          tooltip: true
        }
      })
    }
  }

  function sendNewPassword() {
    if(!tooltipState.loading && changePass.password.length > 0){
      dispatch(changePassword(activeUser, changePass));
      setTooltip((data: any) => {
        return {
          ...data,
          loading: true,
          error: false
        }
      })
    }else{
      setTooltip((data: any) => {
        return {
          ...data,
          error: true
        }
      })
    }

  }

  return (
    <div className={s.inputContainer}>
      <label className={s.label}>Password</label>
      <input onFocus={tooltip} className={s.input} name="password" type="password" placeholder='********' onChange={handleOnChangePass} value={changePass.password} />
      {
        tooltipState.loading ?
        <div className={s.buttonsContainer}>
          <button type="button" className={s.saveButton}>
            <div className={s.loading}></div>
          </button>
        </div>
        :
        <div className={s.dataContainer}>
          <span className={tooltipState.error ? s.errorText : s.none}>* This field is required</span>
          <div className={s.buttonsContainer}>
            <button type="button" onClick={sendNewPassword} className={tooltipState.tooltip ? s.saveButton : s.none}>Save Password</button>
            <button type="button" name="cancel" onClick={tooltip} className={tooltipState.tooltip ? s.cancelButton : s.none}>Cancel</button>
          </div>
        </div>
      }
      {
        response.message ?
          <div className={s.alertOk}>
            successfully modified password
          </div>
          : ""
      }
    </div>
  )

}