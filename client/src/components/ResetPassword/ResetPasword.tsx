import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changePassword, logout } from "../../actions/index";

export default function ResetPassword(): JSX.Element {

    const activeUser = useSelector((state: any) => state.user);
    const response = useSelector((state: any) => state.changePassResponse);
    const dispatch = useDispatch();

    const [ error, setError ] = React.useState("")
    const [ input, setInput ] = React.useState({
        password_1: "",
        password_2: ""
    })

    const handleInputChange = (e: any) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e: any) => {
        e.preventDefault()
        if (error) {
            return null
        } else if (input.password_1 !== input.password_2) {
            setError("Password's dont match.")
        } else {
            submitPassword(input)
        }
    }

    const submitPassword = async (input: any) => {
        const data = {
            password: input.password_1
        }
        dispatch(changePassword(activeUser, data))
    }

    return (
        <div>
            <h4>Change Password</h4>
            <form onSubmit={handleSubmit}>
                <div>
                <label htmlFor="password_1">New Password: </label>
                    <input 
                        type="password"
                        name="password_1"
                        value={input.password_1}
                        autoComplete="off"
                        onChange={handleInputChange}
                        />
                </div>
                <div>
                    <label htmlFor="password_2">Repeat Password: </label>
                    <input 
                        type="password"
                        name="password_2"
                        value={input.password_2}
                        autoComplete="off"
                        onChange={handleInputChange}
                        />
                </div>
                <input type="submit"/>
            </form>
            {response.message ?
                <div>
                    <p>Successfully modified password</p>
                    <button onClick={() => dispatch(logout())}>Return</button>
                </div>
                : null}
        </div>
    )
}