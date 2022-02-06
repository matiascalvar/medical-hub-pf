import React, { FunctionComponent, useEffect } from "react";
import ReactDOM from "react-dom";
import { useSelector } from "react-redux";
import style from "./Coverage.module.css";

const Coverage: FunctionComponent<{ open: boolean, onClose: any }> = ({ open, onClose }) => {

  let plan = useSelector((state: any) => state.patientInfo.Plan);

  if (plan) {
    var {coveragePercentage, name} = plan
  }

  if (!open) {
    return null;
  }

  return ReactDOM.createPortal(
    <div onClick={onClose} className={style.body}>
      <div className={style.card}>
              <p>Your plan is { name }</p>
              <p>Coverage of { coveragePercentage }%</p>
      </div>
    </div>,
    document.getElementById("portal")!
  );
};

export default Coverage;