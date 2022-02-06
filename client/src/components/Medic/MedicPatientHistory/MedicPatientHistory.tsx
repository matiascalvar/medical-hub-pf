import React, {FunctionComponent} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Nav from '../MedicHome/Nav/Nav';
import userLogo from '../../Home/userLogo.png';
import Header from '../../Home/UserHome/Header/Header';
import "../../../styles/Medic/MedicPatientHistory/MedicPatientHistory.css";

const MedicPatientHistory:FunctionComponent = () => {
  return(
    <div className="containerPatientHistory">
      <div className="containerPatientHistory__nav">
        <Nav />
      </div>
      <div className="containerPatientHistory__container">
        <div className="patHst__header">
          <h3 className="contenedor__header--name">Dr</h3>
          <img
            src={userLogo}
            alt="user_logo"
            className="contenedor__header--logo"
          />
        </div>
        <h3 className="patHst__title">Patient History</h3>
        <div className="patHst__section">
          <div className="patHst__section--patient">
            <h4 className="section__patient--title">Patient:</h4>
            <p className="section__patient--item">Name: Fulano</p>
            <p className="section__patient--item">Age: 30</p>
            <p className="section__patient--item">Sex: Male</p>
          </div>
          <div className="patHst__section--appoints">
            <h4 className="section__appoints--title">Appointments:</h4>
            <div className="section__appoints--desc">
              <p className='appoints__desc--date'>Date</p>
              <p className='appoints__desc--doc'>Doctor</p>
            </div>
            {
              <div className='section__appoints--apps'></div>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicPatientHistory;
