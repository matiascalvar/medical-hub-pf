import userLogo from "../userLogo.png";
import s from "./UserHome.module.css";

export default function UserHome() : JSX.Element {


    return (
        <div className={s.mainContainer}>
            <div className={s.userName}>
                  <span className={s.userNameText}>UserName</span>
                  <img className={s.userLogo} src={userLogo} alt="" />
            </div>
            <h1 className={s.title}>Home</h1>
            <div className={s.cardsContainer}>
                <div className={s.shiftCard}>
                    <span>
                        Shifts
                    </span>
                </div>
            </div>

        </div>
    )



}