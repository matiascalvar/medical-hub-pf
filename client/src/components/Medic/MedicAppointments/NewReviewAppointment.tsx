import React, { FunctionComponent, useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import style from "./NewReviewAppointment.module.css";
import { Link, useParams, useHistory } from "react-router-dom";
import {
  getPreferenceId,
  getAppointmentsPatients,
  addReview,
} from "../../../actions/index";
import Nav from "../MedicHome/Nav/Nav";
import Header from "../../Home/UserHome/Header/Header";


export interface IUserPublicProfileRouteParams {
  id: string;
  name: string;
}

const NewReviewAppointment: FunctionComponent = () => {
  const history = useHistory();
  let dispatch = useDispatch();
  const medicInfo = useSelector((state: any) => state.medicInfo);
  const review = useSelector((state: any) => state.postReview);

  const { id, name } = useParams<IUserPublicProfileRouteParams>();
  const [input, setInput] = useState<any>({
    details: "",
  });

  const handleChange = (e: any) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    console.log(input);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!input.details) return;
    dispatch(addReview(id, input));
  };

  return (
    <div className={style.bigContainer}>
      <div className={style.navContainer}>
        <Nav />
      </div>
      <div className={style.aside}>
        <div className={style.header}>
          <Header userName={medicInfo.firstName} title="Add Review"/>
          </div>
          <div className={style.btnContainer}>
          <p className={style.btnReturn} onClick={() => history.goBack()}>Return</p>
          </div>
        <div className={style.reviewContainer}>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="details"
              value={input.details}
              onChange={handleChange}
              placeholder="Write your review here.."
            ></input>
            {!input.details ? (
              <button disabled className={style.errorBtn} type="submit">
                Please complete the form
              </button>
            ) : (
              <button type="submit">Submit</button>
            )}
          </form>
          {review && <p>Your review was send</p>}
        </div>
      </div>
    </div>
  );
};

export default NewReviewAppointment;
