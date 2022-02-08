import { useState, useEffect } from "react";
import style from "./PatientsDetail.module.css";
import { getPatientDetails, updatePatient, getPlans } from "../requests";
import { FiEdit } from "react-icons/fi";

export default function MedicsDetail(props: any): JSX.Element {
  const getDetails = async (id: number) => {
    try {
      const response: any = await getPatientDetails(id);
      setPatient({
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        phone: response.data.phone,
        dni: response.data.dni,
        createdAt: response.data.createdAt,
        PlanId: response.data.PlanId
      });
      let planes = await getPlans()
      if(planes) {
        setPlans(planes.data)
        let plan = planes.data!.find((p: any) => p.id == response.data.PlanId)
        if (plan) setSelectedPlan(plan.name)
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [ plans, setPlans] = useState<any[]>()
  const [ editable, setEditable] = useState("");
  const [ patient, setPatient] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    dni: "",
    createdAt: "",
    PlanId: 1
  });
  const [ selectedPlan, setSelectedPlan ] = useState("")

  function getSelectedPlan (id: number) {
    let plan = plans!.find((p: any) => p.id == id)
    console.log("plan")
    if (plan) setSelectedPlan(plan.name)
  }

  function handleInputChange(e: any) {
    setPatient({
      ...patient,
      [e.target.name]: e.target.value,
    });
    if (e.target.name === "PlanId") {
      getSelectedPlan(e.target.value)
    }
  }

  function handleSubmit(e: any) {
    e.preventDefault();
  }

  async function acceptChanges(e: any) {
    e.preventDefault();
    await updatePatient(props.id, patient);
    props.reolad();
  }

  useEffect(() => {
    getDetails(props.id)
  }, []);

  return (
    <div className={style.formContainer}>
      <h2>Details</h2>
      <form onSubmit={handleSubmit}>
        <div className={style.inputs}>
          <label htmlFor="firstName">First Name</label>
          {editable === "firstName" ? (
            <>
              <input
                type="text"
                name="firstName"
                value={patient.firstName}
                autoComplete="off"
                onChange={handleInputChange}
              />
              <button onClick={() => setEditable("")} className={style.btnEdit}>
                Accept
              </button>
            </>
          ) : (
            <div>
              <span>{patient.firstName}</span>
              <button
                onClick={() => setEditable("firstName")}
                className={style.btnEdit}
              >
                <FiEdit />
              </button>
            </div>
          )}
        </div>
        <div>
          <label htmlFor="lastName">Last Name</label>
          {editable === "lastName" ? (
            <>
              <input
                type="text"
                name="lastName"
                value={patient.lastName}
                autoComplete="off"
                onChange={handleInputChange}
              />
              <button onClick={() => setEditable("")} className={style.btnEdit}>
                Accept
              </button>
            </>
          ) : (
            <div>
              <span>{patient.lastName}</span>
              <button
                onClick={() => setEditable("lastName")}
                className={style.btnEdit}
              >
                <FiEdit />
              </button>
            </div>
          )}
        </div>
        <div>
          <label htmlFor="phone">Phone</label>
          {editable === "phone" ? (
            <>
              <input
                type="text"
                name="phone"
                value={patient.phone}
                autoComplete="off"
                onChange={handleInputChange}
              />
              <button onClick={() => setEditable("")} className={style.btnEdit}>
                Accept
              </button>
            </>
          ) : (
            <div>
              <span>{patient.phone}</span>
              <button
                onClick={() => setEditable("phone")}
                className={style.btnEdit}
              >
                <FiEdit />
              </button>
            </div>
          )}
        </div>
        <div>
          <label htmlFor="dni">DNI</label>
          {editable === "dni" ? (
            <>
              <input
                type="text"
                name="dni"
                value={patient.dni}
                autoComplete="off"
                onChange={handleInputChange}
              />
              <button onClick={() => setEditable("")} className={style.btnEdit}>
                Accept
              </button>
            </>
          ) : (
            <div>
              <span>{patient.dni}</span>
              <button
                onClick={() => setEditable("dni")}
                className={style.btnEdit}
              >
                <FiEdit />
              </button>
            </div>
          )}
        </div>
        <div>
          <label htmlFor="PlanId">Plan</label>
          {editable === "PlanId" ? (
            <>
              <select
                name="PlanId"
                onChange={handleInputChange}>
                {plans? plans.map((p: any) => <option value={p.id}>{p.name}</option>) : null}
              </select>
              <button onClick={() => setEditable("")} className={style.btnEdit}>
                Accept
              </button>
            </>
          ) : (
            <div>
              <span>{selectedPlan}</span>
              <button
                onClick={() => setEditable("PlanId")}
                className={style.btnEdit}
              >
                <FiEdit />
              </button>
            </div>
          )}
        </div>
        <div>
          <label>Created at</label>
          <span>{patient.createdAt}</span>
        </div>
      </form>
      <div className={style.endBtn}>
        <button onClick={acceptChanges} className={style.btnEdit}>
          Accept changes
        </button>
        <button onClick={() => props.return()} className={style.btnEdit}>
          Go back
        </button>
      </div>
    </div>
  );
}
