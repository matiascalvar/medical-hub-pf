import s from "./UserHome.module.css";
import * as iconsb from "react-icons/md";
import * as icons from "react-icons/bi";
import { payments} from "./data";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAppointments, getHistory } from "../../../actions/index";
import Header from "./Header/Header";
import {Link} from "react-router-dom";


interface UserHomeProps {
  userName: string;
  id: number;
}

export default function UserHome({ userName, id }: UserHomeProps): JSX.Element {
  const appoinments: any[] = useSelector((state: any) => state.appointments);
  const history: any[] = useSelector((state: any) => state.history);
  const dispatch = useDispatch();

  function stateColor(state: string): any {
    let color = state.toLowerCase() === "active" ? s.active : s.complete;
    return color;
  }
  function payState(pay: boolean): any {
    if (!pay) {
      return {
        text: "Pending",
        style: s.pending,
      };
    }
    return {
      text: "Paid out",
      style: s.paidOut,
    };
  }

  useEffect(() => {
    if (id) {
      dispatch(getAppointments(id));
      dispatch(getHistory(id));
    }
  }, [id]);

  return (
    <div className={s.mainContainer}>
      <div className={s.section}>
        <div className={s.header}>
          <Header userName={userName} title="Home" />
        </div>
        <div className={s.cardsContainer}>
          <div>
            <div className={s.shiftCard}>
              <span className={s.cardTitle}>
                <iconsb.MdComputer className={s.icon} />
                Appointments
              </span>
              <div className={s.subtitlesContainer}>
                <span className={s.appointmentBox}>Time</span>
                <span className={s.appointmentBox}>Date</span>
                <span className={s.appointmentBox}>Medic</span>
                <span className={s.appointmentBox}>Specialitie</span>
                <span className={s.appointmentBox}>Pay</span>
                <span className={s.appointmentBox}>State</span>
              </div>
              <div className={s.dataContainer}>
                {appoinments && appoinments.length > 0
                  ? appoinments.map((data) => (
                      <div className={s.appointment} key={data.id}>
                        <span className={s.appointmentBox}>{data.time}</span>
                        <span className={s.appointmentBox}>{data.date}</span>
                        <span className={s.appointmentBox}>
                          {data.MedicalStaff.firstName +
                            " " +
                            data.MedicalStaff.lastName}
                        </span>
                        <span className={s.appointmentBox}>
                          {data.MedicalStaff.Specialitie
                            ? data.MedicalStaff.Specialitie.name
                            : "None"}
                        </span>
                        <div className={s.appointmentBox}>
                          <span className={payState(data.pay).style}>
                            {payState(data.pay).text}
                          </span>
                        </div>
                        <div className={s.appointmentBox}>
                          <span className={stateColor(data.state)}>
                            {data.state.toLowerCase()}
                          </span>
                          <Link className={s.link} to="/home/appointments">
                          <button className={s.appointmentButton} type="button">
                            <icons.BiChevronRight />
                          </button>
                          </Link>
                        </div>
                      </div>
                    ))
                  : "There are no appointments"}
              </div>
            </div>
            <div className={s.historyCard}>
              <span className={s.cardTitle}>
                <icons.BiHistory className={s.icon} />
                Study History
              </span>
              <div className={s.subtitlesHistory}>
                <span>Date</span>
                <span>Study</span>
                <span>Medic</span>
                <span>Detail</span>
              </div>
              <div className={s.dataContainer}>
                {history && history.length > 0
                  ? history.map((data) => (
                      <div className={s.history} key={data.id}>
                        <span className={s.hBox}>{data.Appointment.date}</span>
                        <span className={s.hBox}>
                          {data.StudyType.name.toLowerCase()}
                        </span>
                        <span className={s.hBox}>
                          {data.MedicalStaff.firstName +
                            " " +
                            data.MedicalStaff.lastName}
                        </span>
                        <div className={s.hBox}>
                          <span className={s.historyIcon}>
                            <icons.BiHistory className={s.iconH} />
                          </span>
                        </div>
                      </div>
                    ))
                  : "No studies done"}
              </div>
            </div>
          </div>
          <div className={s.paymentsCard}>
            <span className={s.cardTitle}>
              <icons.BiMoney className={s.icon} />
              Payments
            </span>
            <div className={s.subtitlesPayments}>
              <span>Study</span>
              <span>Amount</span>
              <span>State</span>
              <span>Detail</span>
            </div>
            <div className={s.dataContainer}>
              {payments &&
                payments.map((data) => (
                  <div key={data.amount} className={s.payments}>
                    <span className={s.paymentsBox}>{data.pay}</span>
                    <span className={s.paymentsBox}>${data.amount}</span>
                    <span className={s.paymentsBox}>
                      {data.pending ? (
                        "Pending"
                      ) : (
                        <span className={s.paidOut2}>
                          paid out
                          <icons.BiCheck />
                        </span>
                      )}
                    </span>
                    <div className={s.paymentsBox}>
                      <icons.BiDetail className={s.detailIcon} />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
