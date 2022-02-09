import React, { FunctionComponent, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
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
import { getPlans } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { URL_DEPLOY } from "../../actions/index";

const CreatePage: FunctionComponent = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const plans = useSelector((state: any) => state.plans);
  const [errorRegister, setErrorRegister] = React.useState(''); 

  
  const registerUser = async function (user: any) {
    try {
      const response = await axios.post(`${URL_DEPLOY}/register`, user);
      setErrors(emptyInput);
      return response;
    } catch (error:any) {
      setErrorRegister(error.response.data.error);
      console.log(error.response.data.error);
      return error;
    }
  };

  const emptyInput = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    dni: "",
    phone: "",
    planId: "1",
  };

  const [errors, setErrors] = React.useState(emptyInput);
  const [input, setInput] = React.useState(emptyInput);

  const handleInputChange = function (e: any) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    validateForm();
  };

  function handleChangePlan(e: { target: any }) {
    setInput({
      ...input,
      planId: e.target.value,
    });
  }

  const handleSubmit = async function (e: any) {
    e.preventDefault();
    const newUser: any = await registerUser(input);
    if (newUser.status === 201) {
      // Agregar cartel de: Agregado con exito
      history.push("/login");
    } else {
      console.log("No se pudo agregar:");
      console.log(newUser);
    }
    setInput(emptyInput);
  };

  const validateForm = () => {
    let errors: any = {};
    if (!input.email) {
      errors.email = "Email is required";
    } else if (
      !/^([\w\d._\-#])+@([\w\d._\-#]+[.][\w\d._\-#]+)+$/.test(input.email)
    ) {
      errors.email = "Must be a valid email";
    }
    if (!input.password) {
      errors.password = "Password is required";
    } else if (!/(?=.{7,})/.test(input.password)) {
      errors.password = "Should have 8 or more characters";
    }
    if (input.firstName.length < 4) {
      errors.firstName = "First Name is required";
    } else if (/[^a-zA-Z ]/g.test(input.firstName)) {
      errors.firstName = "Only text";
    }
    if (input.lastName.length < 4) {
      errors.lastName = "Last Name is required";
    } else if (/[^a-zA-Z ]/g.test(input.lastName)) {
      errors.lastName = "Only text";
    }
    if (input.dni.length < 3) {
      errors.dni = "DNI is required";
    } else if (/[^0-9]/g.test(input.dni)) {
      errors.dni = "Received only numbers";
    }
    if (input.phone.length < 3) {
      errors.phone = "Phone is required";
    } else if (/[^0-9]/g.test(input.phone)) {
      errors.phone = "Received only numbers";
    }
    setErrors(errors);
  };

  useEffect(() => {
    dispatch(getPlans());
  }, []);
 
  return (
    <div className="containerCreate">
      <div className="containerCreate__register">
        <h2 className="register__title">Create Account</h2>
        <div className="createRegister__redes">
          <div className="redes">
            <FaGoogle className="redes__item" />
          </div>
          <p className="redes__title">
            Please complete the fields to use our services
          </p>
        </div>
        <form onSubmit={handleSubmit} className="container__register">
          <div className="register__item">
            <div className="item__container">
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
            {errors.email && <p className="registerErrors">{errors.email}</p>}
          </div>
          <div className="register__item">
            <div className="item__container">
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
            {errors.password && (
              <p className="registerErrors">{errors.password}</p>
            )}
          </div>
          <div className="register__item">
            <div className="item__container">
              <input
                type="text"
                className="register__input"
                name="firstName"
                value={input.firstName}
                onChange={handleInputChange}
                placeholder="Name"
              />
              <FaUserAlt className="register__icons" />
            </div>
            {errors.firstName && (
              <p className="registerErrors">{errors.firstName}</p>
            )}
          </div>
          <div className="register__item">
            <div className="item__container">
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
            {errors.lastName && (
              <p className="registerErrors">{errors.lastName}</p>
            )}
          </div>
          <div className="register__item">
            <div className="item__container">
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
            {errors.dni && <p className="registerErrors">{errors.dni}</p>}
          </div>
          <div className="register__item">
            <div className="item__container">
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
            {errors.phone && <p className="registerErrors">{errors.phone}</p>}
          </div>
          <div className="register__item register__select">
            <label className="plan__title">Plan:</label>
            <select
              onChange={handleChangePlan}
              name="planId"
              className="register__plan"
            >
              {plans && plans.map((e: any) => (
                <option value={e.id} key={e.id} className="plan__option">
                  {e.name}
                </option>
              ))}
            </select>
          </div>

          <div className="register__button register__item">
            <button type="submit" className="button__btnRegister">
              REGISTER
            </button>
            {errorRegister ? (
              <p className="errorRegister">{errorRegister}</p>
            ) : null}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePage;
