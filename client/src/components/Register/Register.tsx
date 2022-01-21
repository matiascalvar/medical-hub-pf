import React, { FunctionComponent } from "react";
import { useHistory } from "react-router-dom"
import axios from 'axios';
import "../../styles/LoginPage/Register.css";
import {
  FaAt,
  FaLock,
  FaUserAlt,
  FaUserCircle,
  FaRegIdCard,
  FaPhoneSquareAlt,
  FaGoogle,
} from "react-icons/fa";

const CreatePage: FunctionComponent = () => {

    const history = useHistory()

    const registerUser = async function(user: any) {
        try {
            const response = await axios.post('http://localhost:3001/register', user)
            return response
        } catch(error) {
            console.log(error)
            return error
        }
    }

    const emptyInput = {
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        dni: '',
        phone: '',
    }

    const [ input, setInput ] = React.useState(emptyInput)

    const handleInputChange = function(e: any) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async function(e: any) {
        e.preventDefault()
        const newUser: any = await registerUser(input)
        if (newUser.status === 201) {
            // Agregar cartel de: Agregado con exito
            history.push('/login')
        } else {
            console.log('No se pudo agregar:')
            console.log(newUser)
        }
        setInput(emptyInput)
    }

  return (
    <div className="containerCreate">
      <div className="containerCreate__register">
        <h2 className="register__title">Create Account</h2>
        <div className="createRegister__redes">
          <div className="redes">
            <FaGoogle className="redes__item" />
          </div>
          <p className="redes__title">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          </p>
        </div>
        <div className="container__register">
          <div className="register__item">
            <input
              type="text"
              className="register__input"
              name="email"
              value={input.email}
              onChange={handleInputChange}
              placeholder="Email"
            />
            <FaAt className="register__icons" />
          </div>
          <div className="register__item">
            <input
              type="password"
              className="register__input"
              name="password"
              value={input.password}
              onChange={handleInputChange}
              placeholder="Password"
            />
            <FaLock className="register__icons" />
          </div>
          <div className="register__item">
            <input 
              type="text" 
              className="register__input"
              name="firstName"
              value={input.firstName}
              onChange={handleInputChange}
              placeholder="Name" />
            <FaUserAlt className="register__icons" />
          </div>
          <div className="register__item">
            <input
              type="text"
              className="register__input"
              name="lastName"
              value={input.lastName}
              onChange={handleInputChange}
              placeholder="Last Name"
            />
            <FaUserCircle className="register__icons" />
          </div>
          <div className="register__item">
            <input
              type="number"
              className="register__input"
              name="dni"
              value={input.dni}
              onChange={handleInputChange}
              placeholder="DNI"
            />
            <FaRegIdCard className="register__icons" />
          </div>
          <div className="register__item">
            <input
              type="number"
              className="register__input"
              name="phone"
              value={input.phone}
              onChange={handleInputChange}
              placeholder="Phone"
            />
            <FaPhoneSquareAlt className="register__icons" />
          </div>
          <div className="register__item register__select">
            <label className="plan__title">Plans:</label>
            <select name="plan" className="register__plan">
              <option value="particular" className="plan__option">
                Particular
              </option>
              <option value="planA" className="plan__option">
                Plan A
              </option>
              <option value="planB" className="plan__option">
                Plan B
              </option>
            </select>
          </div>
          <button onClick={handleSubmit} className="register__button">REGISTER</button>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
