import React, { FunctionComponent, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Nav from "../Home/Nav/Nav";
import userLogo from "../Home/userLogo.png";
import "../../styles/History/History.css";
import { BiFilter, BiDownload } from "react-icons/bi";
import { Link } from "react-router-dom";
import { filterHistoryStatus, getHistory, getPatientInfo } from "../../actions";

const History: FunctionComponent = () => {
  const dispatch = useDispatch();
  const activeUser = useSelector((state: any) => state.user);
  const user = useSelector((state: any) => state.userInfo);
  const userHistory: any | any[] = useSelector(
    (state: any) => state.filterHistory
  );
  const patient = useSelector((state: any) => state.patientInfo);

  useEffect(() => {
    if (patient.id) {
      dispatch(getHistory(patient.id));
    }
  }, [patient]);

  const [isOpen, setIsOpen] = React.useState(false);
  const [info, setInfo] = React.useState({
    firstName: "",
    lastName: "",
  });

  useEffect(() => {
    if (user) {
      setInfo({
        firstName: user.firstName,
        lastName: user.lastName,
      });
    }
    if (activeUser.email && !info.firstName) {
      dispatch(getPatientInfo(activeUser));
    }
  }, [user, dispatch, userHistory]);

  const getFilterStatus = (e: any) => {
    dispatch(filterHistoryStatus(e.target.value));
    if (e.target.value === "ALL") {
      dispatch(getHistory(user.id));
    }
  };

  return (
    <div className="containerHistory">
      <div className="containerHistory__nav">
        <Nav />
      </div>
      <div className="containerHistory__contenedor">
        <div className="contenedor__header">
          <h3 className="contenedor__header--name">{patient.firstName}</h3>
          <img
            src={userLogo}
            alt="user_logo"
            className="contenedor__header--logo"
          />
        </div>
        <div className="contenedor__sectionTitle">
          <h3 className="sectionTitle__title">Study History</h3>
          <div className="sectionTitle__sectionFilter">
            <h3 className="sectionFilter__title">
              Lorem ipsum dolor sit amet consectetur adipisicing.
            </h3>
            <div className="sectionFilter__buttom">
              <button
                className="buttom__history"
                onClick={() => {
                  setIsOpen(!isOpen);
                }}
              >
                Filters
              </button>
              <BiFilter className="buttom__iconHistory" />
            </div>
          </div>
          {isOpen && (
            <div className="filterButtom">
              <div className="filterButtom__top">
                <h3 className="filterButtom__top--item">Estado:</h3>
                <h3 className="filterButtom__top--item">Tipo de estudio:</h3>
              </div>
              <div className="filterButtom__center">
                <select
                  className="center__izq"
                  onChange={(e) => getFilterStatus(e)}
                >
                  <option value="ALL">All</option>
                  <option value="PENDING">Pending</option>
                  <option value="COMPLETE">Complete</option>
                  <option value="ACTIVE">Active</option>
                </select>
                <select className="center__der">
                  <option value="LAB">Laboratorio</option>
                  <option value="IMAGE">Imagenes</option>
                  <option value="WELL">Welltest</option>
                </select>
              </div>
            </div>
          )}
          <div className="sectionTitle__name">
            To: <strong>{`${patient.firstName}, ${patient.lastName}`}</strong>
          </div>
        </div>
        <div className="contenedor__sectionCards">
          {userHistory && userHistory.length > 0 ? (
            userHistory.map((history: any) => (
              <div className="cardHistory__container">
                <div className="cardHistory__top">
                  <h4 className="cardHistory__top--date">
                    {history.Appointment.date}
                  </h4>
                  <h4 className="cardHistory__top--numberApp">{`N° ${history.Appointment.id}`}</h4>
                </div>
                <div className="cardHistory__center">
                  <h4 className="cardHistory__center--studie">
                    {history.StudyType.name}
                  </h4>
                  <h4 className="cardHistory__center--doc">{`${history.MedicalStaff.firstName} ${history.MedicalStaff.lastName}`}</h4>
                </div>
                <div className="cardHistory__bottom">
                  <h4 className="cardHistory__bottom--state">
                    {history.state}
                  </h4>
                </div>
              </div>
            ))
          ) : (
            <h3 className="cardHistory__message">{userHistory.message}</h3>
          )}
        </div>
      </div>
    </div>
  );
};

export default History;
