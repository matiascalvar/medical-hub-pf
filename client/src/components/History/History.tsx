import React, { FunctionComponent, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Nav from "../Home/Nav/Nav";
import userLogo from "../Home/userLogo.png";
import "../../styles/History/History.css";
import { BiFilter, BiDownload } from "react-icons/bi";
import { useHistory } from "react-router-dom";
import { filterHistoryStatus, getHistory, getPatientInfo } from "../../actions";
import axios from "axios";
import Header from "../Home/UserHome/Header/Header";

const History: FunctionComponent = () => {
  const dispatch = useDispatch();
  const urlHome = useHistory();
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
  }, []);

  const [isOpen, setIsOpen] = React.useState(false);
  const [info, setInfo] = React.useState({
    firstName: "",
    lastName: "",
  });
  const [file, setFile] = React.useState<any>(null)

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

  const uploadFiles = (e:any) => {
    setFile(e[0]);
  }

  const insertFiles = async(e:any, historyId:any) => {
    e.preventDefault();
    const f = new FormData();
    f.append("studyPDF", file);
    await axios.post(`http://localhost:3001/studies/${historyId}`, f, {headers:{'Content-Type':"multipart/form-data"}})
    .then(response => {
      if(response.status === 200){
        urlHome.push('/home');
      }
    })
    .catch(error => console.log(error))
  }

  return (
    <div className="containerHistory">
      <div className="containerHistory__nav">
        <Nav />
      </div>
      <div className="containerHistory__contenedor">
        <div className="contenedor__header">
          <Header title="Study History" userName={patient.firstName}/>
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
                  {
                    history.state === 'COMPLETED' 
                    ? <a 
                        href={`/storage/${history.studyPDF}`} 
                        target="_blank"
                        className="cardHistory__bottom--down"
                      ><BiDownload /></a>
                    : <form 
                        onSubmit={(e) => insertFiles(e, history.id)}
                        className="cardHistory__bottom--up"
                      >
                        <input 
                          type="file" 
                          name="studyPDF" 
                          onChange={(e) => uploadFiles(e.target.files)}
                          className="bottom__up--input"
                        />
                        <button 
                          type="submit"
                          className="bottom__up--button"
                        >Insert</button>
                      </form>
                  }
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
