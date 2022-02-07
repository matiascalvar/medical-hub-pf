import React from "react";
import style from "./AddPatient.module.css";
import { addPatient, getPlans } from "../requests";

export default function AddPatient(): JSX.Element {

  const emptyInput = {
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    dni: "",
    planId: "",
    resetPass: true
  };

  const [ plans, setPlans] = React.useState<any[]>()
  const [ input, setInput] = React.useState(emptyInput);


  async function loadPlans() {
    const response = await getPlans()
    if(response) {
      setPlans(response.data)
    }
  }

  function handleInputChange(e: any) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e: any) {
    e.preventDefault();
    addPatient(input);
    setInput(emptyInput);
  }

  React.useEffect(()=> {
    loadPlans()
  }, [])

  return (
    <div className={style.formContainer}>
      <h2>New patient</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            value={input.email}
            autoComplete="off"
            onChange={handleInputChange}
            placeholder="patient@gmail.com"
          />
        </div>
        <div>
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            name="firstName"
            value={input.firstName}
            autoComplete="off"
            onChange={handleInputChange}
            placeholder="John"
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={input.lastName}
            autoComplete="off"
            onChange={handleInputChange}
            placeholder="Doe"
          />
        </div>
        <div>
          <label htmlFor="idNumber">Phone</label>
          <input
            type="text"
            name="phone"
            value={input.phone}
            autoComplete="off"
            onChange={handleInputChange}
            placeholder="1542612402"
          />
        </div>
        <div>
          <label htmlFor="dni">DNI</label>
          <input
            type="text"
            name="dni"
            value={input.dni}
            autoComplete="off"
            onChange={handleInputChange}
            placeholder="20145292"
          />
        </div>
        <div>
          <label htmlFor="planId">Plan</label>
          <select
            name="planId"
            onChange={handleInputChange}
            placeholder="Particular">
            {plans? plans.map((p: any) => <option value={p.id}>{p.name}</option>) : null}
          </select>
        </div>
        <div className={style.formBtn}>
          <button type="submit">Submit </button>
        </div>
      </form>
    </div>
  );
}
