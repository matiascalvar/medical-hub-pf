import Nav from "./Nav/Nav";
import s from "./Home.module.css";
import UserHome from "./UserHome/UserHome";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserInfo } from "../../actions/index";

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
  console.log(activeUser);
  useEffect(() => {
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
