import Nav from "./Nav/Nav";
import s from "./Home.module.css";
import UserHome from "./UserHome/UserHome";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserInfo } from "../../actions/index";
import axios from "axios";

interface Info {
  firstName: any;
  lastName: any;
}

export default function Home(): JSX.Element {
    const activeUser = useSelector((state: any) => state.user);
    const response = useSelector((state: any) => state.userInfo);
    const dispatch = useDispatch();
    const [myInfo, setMyInfo] = useState<Info>({
        firstName: "",
        lastName: "",
    });
    const updateAppointment = async (activeUser: any, id: number, data: any) => {
        const headers = {
          headers: {
            Authorization: activeUser.token,
            Accept: "aplication/json",
          },
        };
        const authAxios = axios.create(headers);
        try {
          const response = await authAxios.put(`http://localhost:3001/appointments/${id}`, data)
        } catch (error) {
            console.log(error)
        }
    }
      
    
    useEffect(() => {
        let url = new URL(window.location.href)
        let params = new URLSearchParams(url.search)
        let status = params.get("status")
        if (status === "approved") {
            let appointmentId = parseInt(params.get("external_reference")!)    
            updateAppointment(activeUser, appointmentId, {pay: true})
        }
        console.log(status)
        if (response) {
            setMyInfo({
                firstName: response.firstName,
                lastName: response.lastName,
            });
        }
        if (activeUser.email && !myInfo.firstName) {
            dispatch(getUserInfo(activeUser));
        }

    }, [response, activeUser]);

  if (myInfo.firstName) {
    return (
      <div className={s.home}>
        <div className={s.nav}>
          <Nav />
        </div>
        <div className={s.main}>
          <UserHome id={response.id} userName={myInfo.firstName} />
        </div>
      </div>
    );
  } else {
    return <div>NO USER LOGGED.</div>;
  }
}
