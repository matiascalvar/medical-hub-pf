import Nav from "./Nav/Nav";
import s from "./Home.module.css";
import UserHome from "./UserHome/UserHome";
import { useSelector } from "react-redux";

export default function Home(): JSX.Element {

    const patient = useSelector((state: any) => state.patientInfo);

    return (
      <>
        {patient?
          <div className={s.home}>
            <div>{patient.id}</div>
            <div className={s.nav}>
              <Nav />
            </div>
            <div className={s.main}>
              <UserHome id={patient.id} userName={patient.firstName} />
            </div>
          </div> :
        <h3>Loading...</h3>
        }
      </>
    );
}
