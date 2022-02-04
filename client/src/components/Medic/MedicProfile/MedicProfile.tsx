import Nav from "../MedicHome/Nav/Nav"
import s from "./MedicProfile.module.css";
import userPhoto from "../../Home/userLogo.png";
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import {getPatientInfo} from "../../../actions/index";
import DataProfile from "./DataProfile/DataProfile";
import EditDataProfile from "./EditDataProfile/EditDataPofile";

interface Info{
    firstName: any;
    lastName: any;
    id : any,
    idNumber: any,
}
interface EditState{
    edit : any
}

export default function MedicProfile () : JSX.Element {

    const activeUser = useSelector((state: any) => state.user);
    const response = useSelector((state: any) => state.medicInfo);
    const dispatch = useDispatch();
    const [ myInfo, setMyInfo ] = useState<Info> ({
        firstName: "",
        lastName: "",
        id: "",
        idNumber: "",
    });
    const [editState , setEditState] = useState<EditState>({
        edit: false
    })
    console.log(response);
    useEffect ( () => {
        if (response) {
            setMyInfo({
                firstName: response.firstName,
                    lastName: response.lastName,
                    id: response.id,
                    idNumber: response.idNumber
                })
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
        <div className={s.main}>
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
                    dni={myInfo.idNumber}
                    id={myInfo.id}
                    email={activeUser.email}
                    /> : 
                    <EditDataProfile 
                    firstName={myInfo.firstName} 
                    lastName={myInfo.lastName}
                    dni={myInfo.idNumber}
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