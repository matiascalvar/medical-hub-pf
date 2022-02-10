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
    speciality: "",
  };


  function validate(input: any) {
    let errors: any = {};
    if (!input.email) {
      errors.email = 'empty';
    } else if (!/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(input.email)) {
      errors.email = 'error';
    }
    if (!input.firstName) {
      errors.firstName = 'empty';
    } else if (!/^[A-Za-z\s]+$/.test(input.firstName)) {
      errors.firstName = 'error';
    }
    if (!input.lastName) {
      errors.lastName = 'empty';
    } else if (!/^[A-Za-z\s]+$/.test(input.lastName)) {
      errors.lastName = 'error';
    }
    if (!input.avbFrom) {
      errors.avbFrom = 'empty';
    } else if (!/^(((([0-1][0-9])|(2[0-3])):?[0-5][0-9]:?[0-5][0-9]+$))/.test(input.avbFrom)) {
      errors.avbFrom = 'error';
    }
    if (!input.avbTo) {
      errors.avbTo = 'empty';
    } else if (!/^(((([0-1][0-9])|(2[0-3])):?[0-5][0-9]:?[0-5][0-9]+$))/.test(input.avbTo)) {
      errors.avbTo = 'error';
    }
    if (!input.idNumber) {
      errors.idNumber = 'empty';
    } else if (!(parseInt(input.idNumber) > 0)) {
      errors.idNumber = 'error';
    }
    return errors;
  };
  
  const [specialities, setSpecialities] = useState<any>();
  const [input, setInput] = useState(emptyInput);
  const [newSpec, setNewSpec] = useState<string>();
  const [ errors, setErrors ] = useState<any>();

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
      setNewSpec("New Speciality");
    } else {
      setNewSpec("");
    }
  }

  function handleSubmit(e: any) {
    e.preventDefault();
    let errors = validate(input)
    if (Object.keys(errors).length > 0) {
      console.log(errors)
      setErrors(errors)
    } else {
      addMedic(input)
      setInput(emptyInput)
    }
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
        {newSpec ? <h5>{newSpec}</h5> : null}
        <div className={style.formBtn}>
          <button type="submit">Submit </button>
        </div>
        {errors? "Invalid input" : null}
      </form>
    </div>
  );
}
