import React, { FunctionComponent } from "react";
import style from "./Us.module.css";
import { BsWalletFill } from "react-icons/bs";
import { BiPlusMedical } from "react-icons/bi";
import { RiSecurePaymentLine } from "react-icons/ri";
import { FaHandHoldingMedical } from "react-icons/fa";

const Us: FunctionComponent = () => {
  return (
    <div className={style.container}>
      <h1>Why us?</h1>
      <div className={style.text}>
        <div className={style.column}>
          <span className={style.icons}>
            <BsWalletFill />
          </span>
          <div>
            <h2>All in one place</h2>
            <p>
              Have your appointments and your medical records together. <br />{" "}
              No more need to carry with you your records every time you go to a
              new doctor.
            </p>
          </div>
        </div>
        <div className={style.column}>
          <span className={style.icons}>
            <RiSecurePaymentLine />
          </span>
          <h2>Secure payment</h2>
          <p>
            Pay your appointments with any doctor of our staff with a robust
            payment system using your credit card, cash or MercadoPago account.
          </p>
        </div>
        <div className={style.column}>
          <span className={style.icons}>
            <FaHandHoldingMedical />
          </span>
          <h2>Medical plans</h2>
          <p>
            If you have health coverage, your payments will be adjusted to it.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Us;
