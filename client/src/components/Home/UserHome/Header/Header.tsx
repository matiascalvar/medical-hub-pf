import userLogo from "../../userLogo.png";
import s from "./Header.module.css";


interface HeaderProps{
    userName: any,
    title: any
}

export default function Header({userName, title} : HeaderProps) : JSX.Element {

    return(
        <header className={s.header}>
            <div className={s.userName}>
            <span className={s.userNameText}>{userName}</span>
            <img className={s.userLogo} src={userLogo} alt="" />
            </div>
        <h1 className={s.title}>{title}</h1>
        </header>
    )

}