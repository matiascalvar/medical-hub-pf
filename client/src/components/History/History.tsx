import React, { FunctionComponent, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Nav from "../Home/Nav/Nav";
import userLogo from "../Home/userLogo.png";
import { BsCalendarFill, BsCashStack, BsTrash } from "react-icons/bs";
import "../../styles/History/History.css";
import { BiFilter, BiDownload } from "react-icons/bi";
import { useHistory } from "react-router-dom";
import { getHistory } from "../../actions";
import axios from "axios";
import style from "./History.module.css";
import Header from "../Home/UserHome/Header/Header";
import { URL_DEPLOY } from "../../actions/index";

const History: FunctionComponent = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const activeUser = useSelector((state: any) => state.user);
  const studies: any = useSelector((state: any) => state.history);
  const patient = useSelector((state: any) => state.patientInfo);

  const [file, setFile] = React.useState<any>();

  const uploadFiles = (e: any) => {
    e.preventDefault();
    setFile(e.target.files[0]);
  };

  const insertFiles = async (e: any) => {
    e.preventDefault();
    let id = e.target[1].value;
    const f = new FormData();
    if (file) {
      //console.log(file)
      //prueba(file)
      const { data } = await axios.get('http://localhost:3001/studies/s3/Url')
    console.log(data)

    const uploadStudy = await fetch(data,{
      method:'PUT',
      headers: {
        "Content-Type": "multipart/form-data"
      },
      body: file
    })

    // if(uploadStudy){
    //     const imageUrl = data.split('?')[0]
    //     console.log(data)      

    //     await axios.put(`http://localhost:3001/studies/`,{url:imageUrl, id})
    // }
      f.append("studyPDF", file);
      const response = await axios.post(`${URL_DEPLOY}/studies/${id}`, f, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if(response.status === 200) {
        console.log("Todo ok")
        dispatch(getHistory(patient.id))
      } else {
        console.log("No se puedo agregar archivo");
      }
    } else {
      console.log("Seleccionar arcivho");
    }
  };

  useEffect(() => {
    if (patient.id) {
      dispatch(getHistory(patient.id));
    }
  }, [patient]);

  function handleShowImg(e){
    alert(imgNotShow)
   e.preventDefault()
   imgNotShow === 'style.notShow' ? setImgNotShow ('style.show') : setImgNotShow ('style.notShow');
  }

  const [imgNotShow, setImgNotShow] = useState('style.notShow');

  
  return (
  //   <> <div className={style.modal}> Hola
  //   <div className={style.modalContent}>
  //     Modal Content
  //       <iframe className={style.iframe} src={`/storage/studyPDF-1644451589616-766027643.png`}></iframe> 
  //   </div>
  // </div>
    <div className={style.bigContainer}>
      <div className={style.navContainer}>
        <Nav />
      </div>
      <div className={style.aside}>
        <div>
          <Header userName={patient.firstName} title="Studies" />
        </div>
        <div className={style.shiftCard}>
          <div className={style.subtitlesContainer}>
            <span>Type</span>
            <span>Status</span>
            <span>Medic</span>
            <span>Results</span>
          </div>
          <div className={style.dataContainer}>
            {studies.length > 0 ? (
              studies.map((s: any, i:any) => (
                <div className={style.appointment} key={s.id}>
                  <span className={style.box}>{s.StudyType.name}</span>
                  <span className={style.box}>{s.state.toLowerCase()}</span>
                  <span className={style.box}>
                    Dr. {s.MedicalStaff.lastName}, {s.MedicalStaff.firstName}
                  </span>
                  {s.state !== "COMPLETED" ? (
                    <span>
                      <form onSubmit={insertFiles}>
                        <label className={style.uploadFiles}>
                          <input
                            type="file"
                            name="studyPDF"
                            onChange={uploadFiles}
                          />
                          Upload file
                        </label>
                        <input type="hidden" name="id" value={s.id} />
                        <button type="submit" className={style.uploadFiles}>
                          Submit
                        </button>
                      </form>
                    </span>
                  ) : (
                    <span className={style.downloadFiles}>
                      {/* <img width='350px' height='auto' src={`${s.studyPDF}`}> Download</img> */}
                      <input type='button' value={i} onClick={(e) => handleShowImg(e)} />                      
                        Download                       
                      <img id={i} className={imgNotShow} src={`${s.studyPDF}`} />
                    </span>
                  )}
                </div>
              ))
            ) : (
              <div className={style.noAppointments}>
                <BsCalendarFill />
                <p>No studies available</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
