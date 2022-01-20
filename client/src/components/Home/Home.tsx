import Nav from "./Nav/Nav";
import s from "./Home.module.css";
import UserHome from "./UserHome/UserHome";

export default function Home() : JSX.Element{

    return (
        <div className={s.home}>
            <div className={s.nav}>
                <Nav/>
            </div>
            <div className={s.main}>
              <UserHome/> 
            </div>
        </div>
    )

}