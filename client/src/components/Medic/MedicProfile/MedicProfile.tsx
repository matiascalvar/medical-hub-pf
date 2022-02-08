import Nav from "../MedicHome/Nav/Nav"
import s from "./MedicProfile.module.css";
import userPhoto from "../../Home/userLogo.png";
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import {getSpecialities} from "../../../actions/index";
import DataProfile from "./DataProfile/DataProfile";
import EditDataProfile from "./EditDataProfile/EditDataPofile";

interface Info{
    firstName: any;
    lastName: any;
    id : any,
    idNumber: any,
    availability: any,
    speciality: any
}
interface EditState{
    edit : any
}

export default function MedicProfile () : JSX.Element {

    const activeUser = useSelector((state: any) => state.user);
    const response = useSelector((state: any) => state.medicInfo);
    const specialities = useSelector((state: any) => state.specialities);
    const dispatch = useDispatch();
    const [ myInfo, setMyInfo ] = useState<Info> ({
        firstName: "",
        lastName: "",
        id: "",
        idNumber: "",
        availability: "",
        speciality: ""
    });
    const [editState , setEditState] = useState<EditState>({
        edit: false
    })
    
    console.log(response);
    useEffect ( () => {
        if (response) {
            setMyInfo((data : any) =>{
                return {
                    ...data,
                    firstName: response.firstName,
                    lastName: response.lastName,
                    id: response.id,
                    idNumber: response.idNumber,
                    availability: response.availability
                }
                })
            }  
        if(specialities && specialities.length === 0){
            dispatch(getSpecialities());
        }else{
            setMyInfo((data : any) =>{
                return{
                    ...data,
                    speciality: specialities.filter((sp: any) => sp.id === response.SpecialitieId)
                }
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
                    availability={myInfo.availability}
                    speciality={myInfo.speciality[0].name}
                    /> : 
                    <EditDataProfile 
                    firstName={myInfo.firstName} 
                    lastName={myInfo.lastName}
                    dni={myInfo.idNumber}
                    id={myInfo.id}
                    email={activeUser.email}
                    activeUser = {activeUser}
                    speciality={myInfo.speciality[0].name}
                    />
                
                   }

                </div>
            </div>
        </div>
    )

}