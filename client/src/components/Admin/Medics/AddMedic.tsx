import { useState, useEffect } from "react";
import { addMedic, getSpecialities } from "../requests";
import style from "./AddMedic.module.css";

export default function AddMedic(): JSX.Element {
  const emptyInput = {
    email: "",
    firstName: "",
    lastName: "",
    idNumber: "",
    avbFrom: "",
    avbTo: "",
    appointmentDuration: "",
    speciality: "",
  };

  const [specialities, setSpecialities] = useState<any>();
  const [input, setInput] = useState(emptyInput);
  const [error, setError] = useState<string>();

  async function loadSpecialites() {
    const response: any = await getSpecialities();
    if (response) setSpecialities(response.data);
  }

  function handleInputChange(e: any) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    if (e.target.name === "speciality") verifySpeciality(e.target.value);
  }

  function verifySpeciality(input: string) {
    if (!specialities.find((s: any) => s.name === input) && input != "") {
      setError("New Speciality");
    } else {
      setError("");
    }
  }

  function handleSubmit(e: any) {
    e.preventDefault();
    addMedic(input);
    setInput(emptyInput);
  }

  useEffect(() => {
    loadSpecialites();
  }, []);

  return (
    <div className={style.formContainer}>
      <h2>New Medic</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            value={input.email}
            autoComplete="off"
            onChange={handleInputChange}
            placeholder="admin@gmail.com"
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
            placeholder="Dr.John"
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
          <label htmlFor="idNumber">ID</label>
          <input
            type="text"
            name="idNumber"
            value={input.idNumber}
            autoComplete="off"
            onChange={handleInputChange}
            placeholder="1"
          />
        </div>
        <div>
          <label htmlFor="avbFrom">AVB from</label>
          <input
            type="text"
            name="avbFrom"
            value={input.avbFrom}
            autoComplete="off"
            onChange={handleInputChange}
            placeholder="9"
          />
        </div>
        <div>
          <label htmlFor="avbTo">AVB to</label>
          <input
            type="text"
            name="avbTo"
            value={input.avbTo}
            autoComplete="off"
            onChange={handleInputChange}
            placeholder="18"
          />
        </div>
        <div>
          <label htmlFor="appointmentDuration">APP duration</label>
          <input
            type="text"
            name="appointmentDuration"
            value={input.appointmentDuration}
            autoComplete="off"
            onChange={handleInputChange}
            placeholder="30"
          />
        </div>
        <div>
          <label htmlFor="speciality">Speciality</label>
          <input
            name="speciality"
            list="speciality"
            onChange={handleInputChange}
            autoComplete="off"
            placeholder="Select an speciality"
          />
          <datalist id="speciality">
            {specialities ? (
              specialities.map((s: any) => (
                <option value={s.name}>{s.name}</option>
              ))
            ) : (
              <option></option>
            )}
          </datalist>
        </div>
        {error ? <h5>{error}</h5> : null}
        <div className={style.formBtn}>
          <button type="submit">Submit </button>
        </div>
      </form>
    </div>
  );
}
