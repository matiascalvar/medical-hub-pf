import React, { FunctionComponent, useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getPreferenceId } from "../../actions/index";
import style from "./MercadoPago.module.css";
import ReactDOM from "react-dom";


const MercadoPago: FunctionComponent<{ open: boolean, onClose:any }> = ({open, onClose}) => {
  const FORM_ID = "payment-form";
  let dispatch = useDispatch();

  let unit_price = "500";

  // BUG: El componente se renderiza varias veces. Puede ser debido al append
  // Al enviar el mismo id varias veces al backend, esto genera un error y mercadopago no funciona
  // Una opcion es que el useSelector se haga en otra pagina y me pasen por props el id
  // Sin embargo si quiero llamar a la store aca voy a tener problemas
  //   useEffect(() => {
  //     dispatch(getPreferenceId(quantity, unit_price, title));
  //   }, []);

  const paymentInfo = useSelector((state: any) => state.paymentInfo);
  console.log("pref id from store outside useEffect: ", paymentInfo);

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
          <button className={style.btnClose} onClick={onClose}>X</button>
          <p className={style.title}>Pay with Mercado Pago</p>
          <p>
            Appointment with: <br /> {paymentInfo.medic}
          </p>
          <p>Price: ${unit_price}</p>
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
