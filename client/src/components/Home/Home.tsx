import Nav from "./Nav/Nav";
import s from "./Home.module.css";
import UserHome from "./UserHome/UserHome";
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios';

interface Info{
    firstName: any;
    lastName: any;
}


export default function Home() : JSX.Element{

    const activeUser = useSelector((state: any) => state.user) 
    
    const [ myInfo, setMyInfo ] = useState<Info> ({
        firstName: "",
        lastName: ""
    })
    
    useEffect ( () => {
        const getUserInfo = async function () {
            const headers = {
                headers: {
                    Authorization: activeUser.token,
                    Accept: 'aplication/json'
                },
            }
            const authAxios = axios.create(headers)
            try {
                const response = await authAxios.get('http://localhost:3001/users')
                if (response) {
                    setMyInfo({
                        firstName: response.data.firstName,
                        lastName: response.data.lastName
                    })
                }
            } catch(error) {
                console.log(error)
            }
        }
        if (activeUser.email) {
            getUserInfo()
        }    
    }, [])
    if (myInfo.firstName) {
        return (
            <div className={s.home}>
                <div className={s.nav}>
                    <Nav/>
                </div>
                <div className={s.main}>
                  <UserHome /> 
                </div>
                <div>YO SOY: {myInfo.firstName}</div>
            </div>
        )
    } else {
        return (
            <div>Loading...</div>
        )
    }
}

