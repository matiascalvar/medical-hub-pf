import React, { FunctionComponent, useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import style from "./NewReviewAppointment.module.css";
import { Link, useParams } from "react-router-dom";
import {
  getPreferenceId,
  getAppointmentsPatients,
} from "../../../actions/index";
import Nav from "../../Home/Nav/Nav";
import Header from "../../Home/UserHome/Header/Header";

export interface IUserPublicProfileRouteParams {
  id: string;
  name: string;
}

const NewReviewAppointment: FunctionComponent = () => {
  let dispatch = useDispatch();
  const userActive = useSelector((state: any) => state.userInfo);
  const activeUser = useSelector((state: any) => state.user);
  const appointments: any[] = useSelector(
    (state: any) => state.appointmentsPatients
  );
  const { id, name } = useParams<IUserPublicProfileRouteParams>();
  const [appointmentDetail, setAppointmentDetail] = useState<any>("");

  useEffect(() => {
    if (!appointments.length) dispatch(getAppointmentsPatients(42)); // Cambiar ID sin hardcodear cuando podamos sacar la ID de la info del medico
    setAppointmentDetail(
      appointments.find((a) => {
        return a.id == id;
      })
    );
    console.log(appointments);
    console.log("app", appointmentDetail);
  }, [appointments]);

  return (
    <div className={style.bigContainer}>
      <div className={style.navContainer}>
        <Nav />
      </div>
      <div className={style.aside}>
        <div>
          <Header userName="Asd" title="Add Review" />
        </div>
        <div className={style.reviewContainer}>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus
            beatae ipsam fugit maiores iste excepturi, distinctio blanditiis
            voluptate quisquam reprehenderit commodi sunt. Accusantium at
            dignissimos tenetur ipsam quo, vero nihil.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NewReviewAppointment;
