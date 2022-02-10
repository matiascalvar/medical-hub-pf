import { useState, useEffect } from "react";
import style from "./MedicsDetail.module.css";
import { getMedicDetail, updateMedic, getSpecialities } from "../requests";
import { FiEdit } from "react-icons/fi";

export default function MedicsDetail(props: any): JSX.Element {
  const loadSpecialites = async () => {
    const response: any = await getSpecialities();
    if (response) setSpecialities(response.data);
  };

  const getDetails = async (id: number) => {
    try {
      const response: any = await getMedicDetail(id);
      setMedic({
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        idNumber: response.data.idNumber,
        avbFrom: response.data.avbFrom,
        avbTo: response.data.avbTo,
        createdAt: response.data.createdAt,
        speciality: response.data.Specialitie.name,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const [ errors, setErrors ] = useState<any>();
  const [editable, setEditable] = useState("");
  const [error, setError] = useState<string>();
  const [specialities, setSpecialities] = useState<any>();
  const [medic, setMedic] = useState({
    firstName: "",
    lastName: "",
    idNumber: "",
    avbFrom: "",
    avbTo: "",
    createdAt: "",
    speciality: "",
  });

  function validate(input: any) {
    let errors: any = {};
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

  function handleInputChange(e: any) {
    setMedic({
      ...medic,
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
  }

  async function AcceptChanges(e: any) {
    e.preventDefault();
    let errors = validate(medic)
    if (Object.keys(errors).length > 0) {
      console.log(errors)
      setErrors(errors)
    } else {
      await updateMedic(props.id, medic);
    props.reolad();
    }
  }

  useEffect(() => {
    getDetails(props.id);
    loadSpecialites();
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
                value={medic.firstName}
                autoComplete="off"
                onChange={handleInputChange}
              />
              <button onClick={() => setEditable("")} className={style.btnEdit}>
                Accept
              </button>
            </>
          ) : (
            <div>
              <span>{medic.firstName}</span>
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
                value={medic.lastName}
                autoComplete="off"
                onChange={handleInputChange}
              />
              <button onClick={() => setEditable("")} className={style.btnEdit}>
                Accept
              </button>
            </>
          ) : (
            <div>
              <span>{medic.lastName}</span>
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
          <label htmlFor="idNumber">ID</label>
          {editable === "idNumber" ? (
            <>
              <input
                type="text"
                name="idNumber"
                value={medic.idNumber}
                autoComplete="off"
                onChange={handleInputChange}
              />
              <button onClick={() => setEditable("")} className={style.btnEdit}>
                Accept
              </button>
            </>
          ) : (
            <div>
              <span>{medic.idNumber}</span>
              <button
                onClick={() => setEditable("idNumber")}
                className={style.btnEdit}
              >
                <FiEdit />
              </button>
            </div>
          )}
        </div>
        <div>
          <label htmlFor="avbFrom">AVB from: </label>
          {editable === "avbFrom" ? (
            <>
              <input
                type="text"
                name="avbFrom"
                value={medic.avbFrom}
                autoComplete="off"
                onChange={handleInputChange}
              />
              <button onClick={() => setEditable("")} className={style.btnEdit}>
                Accept
              </button>
            </>
          ) : (
            <div>
              <span>{medic.avbFrom}</span>
              <button
                onClick={() => setEditable("avbFrom")}
                className={style.btnEdit}
              >
                <FiEdit />
              </button>
            </div>
          )}
        </div>
        <div>
          <label htmlFor="avbTo">AVB to</label>
          {editable === "avbTo" ? (
            <>
              <input
                type="text"
                name="avbTo"
                value={medic.avbTo}
                autoComplete="off"
                onChange={handleInputChange}
              />
              <button onClick={() => setEditable("")} className={style.btnEdit}>
                Accept
              </button>
            </>
          ) : (
            <div>
              <span>{medic.avbTo}</span>
              <button
                onClick={() => setEditable("avbTo")}
                className={style.btnEdit}
              >
                <FiEdit />
              </button>
            </div>
          )}
        </div>
        <div>
          <label htmlFor="speciality">Speciality:</label>
          {editable === "speciality" ? (
            <>
              <input
                name="speciality"
                list="speciality"
                onChange={handleInputChange}
                autoComplete="off"
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
              {error ? <h5>{error}</h5> : null}
              <button onClick={() => setEditable("")} className={style.btnEdit}>
                Accept
              </button>
            </>
          ) : (
            <div>
              <span>{medic.speciality}</span>
              <button
                onClick={() => setEditable("speciality")}
                className={style.btnEdit}
              >
                <FiEdit />
              </button>
            </div>
          )}
        </div>
        <div>
          <label>Created at</label>
          <span>{medic.createdAt}</span>
        </div>
      </form>
      <div className={style.endBtn}>
        <button onClick={AcceptChanges} className={style.btnEdit}>
          Accept changes
        </button>
        <button onClick={() => props.return()} className={style.btnEdit}>
          Go back
        </button>
      </div>
      {errors? "Invalid input" : null}
    </div>
  );
}
