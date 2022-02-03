import Nav from "./Nav/Nav";
import s from "./Home.module.css";
import UserHome from "./UserHome/UserHome";
import { useSelector } from "react-redux";

export default function Home(): JSX.Element {

  const activeUser = useSelector((state: any) => state.user);
  const patient = useSelector((state: any) => state.patientInfo);
  const medic = useSelector((state: any) => state.medicInfo);


  if (activeUser.role === "patient") {
    return (
      <>
        {patient?
          <div className={s.home}>
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
  } else if (activeUser.role === "medic") {
    return (
      <>
        {medic?
          <div className={s.home}>
            <div className={s.nav}>
              <Nav />
            </div>
            <div className={s.main}>
              <h2>PAGINA DE: {medic.firstName}</h2>
            </div>
          </div> :
          <h3>Loading...</h3>
        }
      </>
    );
  } else {
    return (
      <h4>Algo salio mal :( </h4>
    )
  }
}
