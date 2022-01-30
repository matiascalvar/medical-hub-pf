import React, { FunctionComponent, useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getPreferenceId } from "../../actions/index";
import style from "./MercadoPago.module.css";

const MercadoPago: FunctionComponent = () => {
  const FORM_ID = "payment-form";
  let dispatch = useDispatch();

  let quantity = "1";
  let unit_price = "noprice";
  let title = "Dr John Doe";

  // BUG: El componente se renderiza varias veces. Puede ser debido al append
  // Al enviar el mismo id varias veces al backend, esto genera un error y mercadopago no funciona
  // Una opcion es que el useSelector se haga en otra pagina y me pasen por props el id
  // Sin embargo si quiero llamar a la store aca voy a tener problemas
  //   useEffect(() => {
  //     dispatch(getPreferenceId(quantity, unit_price, title));
  //   }, []);

  const preferenceIdFromStore = useSelector((state: any) => state.preferenceId);
  console.log("pref id from store outside useEffect: ", preferenceIdFromStore);

  useEffect(() => {
    // console.log("useEffect called");
    // dispatch(getPreferenceId(quantity, unit_price, title));
    // console.log("quantity: ", quantity);
    // console.log("unit price: ", unit_price);
    // console.log("title: ", title);
    // console.log("prefID from store: ", preferenceIdFromStore);
    // console.log("prefID from store: ", typeof preferenceIdFromStore);
    //
    let script = document.createElement("script");
    script.type = "text/javascript";
    script.src =
      "https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js";
    script.setAttribute("data-preference-id", preferenceIdFromStore);
    let form: any = document.getElementById(FORM_ID);
    form.appendChild(script);
  }, []);

  return (
    <>
      <div className={style.card}>
        <p className={style.title}>Pay with Mercado Pago</p>
        <p>
          Appointment with: <br /> {title}
        </p>
        <p>Price: ${unit_price}</p>
        <form
          style={{ display: "flex", justifyContent: "center" }}
          id={FORM_ID}
          method="GET"
        />
      </div>
    </>
  );
};

export default MercadoPago;
