import React, { FunctionComponent, useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getPreferenceId } from "../../actions/index";
import style from "./MercadoPago.module.css";
import ReactDOM from "react-dom";
import Logo from "./mercadoLogo.png";


const MercadoPago: FunctionComponent<{ price:number, open: boolean, onClose:any }> = ({price, open, onClose}) => {
  let unit_price = "500";

  const paymentInfo = useSelector((state: any) => state.paymentInfo);
  
  // useEffect(() => {
  //   let script = document.createElement("script");
  //   script.type = "text/javascript";
  //   script.src =
  //     "https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js";
  //   script.setAttribute("data-preference-id", paymentInfo.preferenceId);
  //   let form: any = document.getElementById(FORM_ID);
  //   form.appendChild(script);
  // }, []);

  if (!open) {
    return null
  }
  
  return ReactDOM.createPortal(
    <div className={style.body}>
      <div className={style.card}>
        <div className={style.logoContainer}>
        <button className={style.btnClose} onClick={onClose}>
          x
        </button>
          <img className={style.logo} src={Logo} alt="mercadologo" />
          <span className={style.title}>Pay with Mercado Pago</span>
        </div>
        
        <span className={style.subtitle}>Appointment with:</span>
        <span className={style.name}>{paymentInfo.medic}</span>
        <span className={style.price}>${price}</span>
        <a href={paymentInfo.preferenceId}>
          <button className={style.btn}>
            <span className={style.btnText}>Pay</span>
          </button>
        </a>
      </div>
    </div>,
    document.getElementById("portal")!
  );

};

export default MercadoPago;
