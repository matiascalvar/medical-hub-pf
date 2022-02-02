import s from "./UserProfile.module.css";
import userPhoto from "../Home/userLogo.png";
import Nav from "../Home/Nav/Nav";
import DataProfile from "./DataProfile/DataProfile";
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import {getPatientInfo} from "../../actions/index";
import EditDataProfile from "./EditDataProfile/EditDataPofile";

interface Info{
    firstName: any;
    lastName: any;
    id : any,
    dni: any,
    phone: any,
    planId : any
}
interface EditState{
    edit : any
}
export default function UserProfile() : JSX.Element{

    const activeUser = useSelector((state: any) => state.user);
    const response = useSelector((state:any) => state.patientInfo);
    const dispatch = useDispatch();
    const [ myInfo, setMyInfo ] = useState<Info> ({
        firstName: "",
        lastName: "",
        id: "",
        dni: "",
        phone:"",
        planId :""
    });
    const [editState , setEditState] = useState<EditState>({
        edit: false
    })
    useEffect ( () => {
        if (response) {
            setMyInfo({
                firstName: response.firstName,
                    lastName: response.lastName,
                    id: response.id,
                    dni: response.dni,
                    phone: response.phone,
                    planId : response.planId
                })
            }
        if (activeUser.email && !myInfo.firstName) {
            dispatch(getPatientInfo(activeUser));
        }    
    }, [response, activeUser]);

    function editOn(){
        if(editState.edit){
        setEditState({
            edit : false
        })}else{
            setEditState({
                edit : true
            }) 
        }
    }
    return(
        <div className={s.mainContainer}>
            <div>
                <Nav/>
            </div>
            <div className={s.cardContainer}>
                <div className={s.profileCard}>
                <button className={s.editButton} onClick={editOn} type="button">Edit</button>
                    <div className={s.userPhoto}>
                        <img className={s.photo} src={userPhoto} alt="profile" />
                    </div>
                   {
                   !editState.edit ? 
                   <DataProfile 
                    firstName={myInfo.firstName} 
                    lastName={myInfo.lastName}
                    phone={myInfo.phone}
                    dni={myInfo.dni}
                    planId={myInfo.planId}
                    id={myInfo.id}
                    email={activeUser.email}
                    /> : 
                    <EditDataProfile 
                    firstName={myInfo.firstName} 
                    lastName={myInfo.lastName}
                    phone={myInfo.phone}
                    dni={myInfo.dni}
                    planId={myInfo.planId}
                    id={myInfo.id}
                    email={activeUser.email}
                    activeUser = {activeUser}
                    />
                
                   }

                </div>
            </div>
        </div>
    )

}