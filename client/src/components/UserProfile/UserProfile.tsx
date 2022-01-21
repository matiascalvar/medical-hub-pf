import s from "./UserProfile.module.css";
import userPhoto from "../Home/userLogo.png";

export default function UserProfile() : JSX.Element{

    return(
        <div className={s.mainContainer}> 
            <div className={s.profileCard}>
                <div className={s.userPhoto}>
                    <img className={s.photo} src={userPhoto} alt="profile" />
                </div>

            </div>

        </div>
    )

}