import React, { FunctionComponent, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPreferenceId } from "../../actions/index";

const PrePago: FunctionComponent = () => {
  let dispatch = useDispatch();
  let quantity = "1";
  let unit_price = "550";
  let title = "Appointment with Dr Barallobre";
  useEffect(() => {
    dispatch(getPreferenceId(quantity, unit_price, title));
  }, []);

  return (
    <Link to="/mercadopago">
      <p>Checkout</p>
    </Link>
  );
};
export default PrePago;
