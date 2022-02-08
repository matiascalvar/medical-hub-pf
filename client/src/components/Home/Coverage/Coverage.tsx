import React, { FunctionComponent, useEffect } from "react";
import ReactDOM from "react-dom";
import { useSelector } from "react-redux";
import style from "./Coverage.module.css";

const Coverage: FunctionComponent<{ open: boolean, onClose: any }> = ({ open, onClose }) => {

  let plan = useSelector((state: any) => state.patientInfo.Plan);

  let coveragePercentage, name : any;
  plan
    ? ({ coveragePercentage, name } = plan)
    : ({ coveragePercentage, name } = { coveragePercentage: 0, name: "" });

  if (!open) {
    return null;
  }

  function colorPlan(){
    if(name === "Particular"){
      return style.particular
    }
    if(name === "Silver"){
      return style.silver
    }
    if(name === "Gold"){
      return style.gold
    }
    if(name === "Platinum"){
      return style.platinum
    }
  }

  return ReactDOM.createPortal(
    <div onClick={onClose} className={style.body}>
      <div className={style.card}>
              <span className={style.text}>Your plan is</span>
              <span className={colorPlan()}>
                {name}
              <span className={style.coverage}>Coverage:</span>
              <span className={style.text1}>{ coveragePercentage }%</span>
              </span>
      </div>
    </div>,
    document.getElementById("portal")!
  );
};

export default Coverage;