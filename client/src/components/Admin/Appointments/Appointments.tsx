import { useState, useEffect } from "react";
import style from "./Appointments.module.css";
import { getAppointments } from "../requests";
import AppointmentsDetail from "./AppointmentsDetail";

export default function Appointments(): JSX.Element {
  class Appointment {
    id: number;
    patient: string;
    medic: string;
    date: number;
    time: number;
    state: string;
    pay: boolean;

    constructor(
      id: number,
      patient: string,
      medic: string,
      date: number,
      time: number,
      state: string,
      pay: boolean
    ) {
      this.id = id;
      this.patient = patient;
      this.medic = medic;
      this.date = date;
      this.time = time;
      this.state = state;
      this.pay = pay;
    }
  }
  const [appointmentList, setAppointmentList] = useState<any>();
  const [toDisplay, setToDisplay] = useState<any>();
  const [searchInput, setSearchInput] = useState("");
  const [filterDate, serFilterDate] = useState("");
  const [filterState, setFilterState] = useState("");
  const [detailed, setDetailed] = useState<number>();

  const createList = async () => {
    console.log("entra a CreateList");
    const response: any = await getAppointments();
    if (response) {
      const appointmentList: any[] = [];
      response.data.forEach((appointment: any) =>
        appointmentList.push(
          new Appointment(
            appointment.id,
            `${appointment.Patient.firstName}, ${appointment.Patient.lastName}`,
            `${appointment.MedicalStaff.firstName}, ${appointment.MedicalStaff.lastName}`,
            appointment.date,
            appointment.time,
            appointment.state,
            appointment.pay
          )
        )
      );
      setAppointmentList(appointmentList);
      setToDisplay(appointmentList);
    }
  };

  const handleSearch = (e: any) => {
    setSearchInput(e.target.value);
    updateDisplay(e.target.value, "search");
  };

  const filterByState = (e: any) => {
    setFilterState(e.target.value);
    updateDisplay(e.target.value, "state");
  };

  const filterByDate = (e: any) => {
    serFilterDate(e.target.value);
    updateDisplay(e.target.value, "date");
  };

  const updateDisplay = (input: string, toUpdate: string) => {
    const filters = {
      search: searchInput,
      state: filterState,
      date: filterDate,
    };
    if (toUpdate === "search") filters.search = input;
    if (toUpdate === "state") filters.state = input;
    if (toUpdate === "date") filters.date = input;

    let display = appointmentList;

    if (filters.search)
      display = display.filter((a: any) => a.medic.includes(filters.search) || a.patient.includes(filters.search));
    if (filters.state && filters.state != "ALL")
      display = display.filter((a: any) => a.state === filters.state);
    if (filters.date)
      display = display.filter((a: any) => a.date === filters.date);

    setToDisplay(display);
  };

  const reload = () => {
    createList();
    setDetailed(undefined);
  };

  useEffect(() => {
    createList();
  }, []);

  return (
    <div className={style.appointmentsContainer}>
      <h2>Appointments</h2>
      {detailed ? (
        <AppointmentsDetail
          id={detailed}
          return={() => setDetailed(undefined)}
          reolad={() => reload()}
        />
      ) : (
        <div>
          <div>
            <label htmlFor="state"></label>
            <select onChange={filterByState} name="state">
              <option value="ALL">All</option>
              <option value="ACTIVE">Active</option>
              <option value="COMPLETED">Completed</option>
            </select>
            <label htmlFor="date"></label>
            <input onChange={filterByDate} name="date" type="date" />
            <input
              onChange={handleSearch}
              type="text"
              placeholder="Search by patient or medic..."
              name="search"
              value={searchInput}
            />
          </div>
          {toDisplay && toDisplay.length > 0 ? (
            <table>
              <tbody>
                <tr>
                  <th>ID</th>
                  <th>Patient</th>
                  <th>Medic</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Status</th>
                  <th>Pay</th>
                </tr>
                {toDisplay.map((appointment: any) => (
                  <tr>
                    <td>{appointment.id}</td>
                    <td>{appointment.patient}</td>
                    <td>{appointment.medic}</td>
                    <td>{appointment.date}</td>
                    <td>{appointment.time}</td>
                    <td>{appointment.state.toLowerCase()}</td>
                    <td>{appointment.pay}</td>

                    <td
                      onClick={() => setDetailed(appointment.id)}
                      className={style.details}
                    >
                      Details
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <h3>No hay appointments para mostrar</h3>
          )}
        </div>
      )}
    </div>
  );
}
