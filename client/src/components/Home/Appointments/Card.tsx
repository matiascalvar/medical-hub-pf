import React, { FunctionComponent } from "react";
import style from "./Card.module.css";

interface CardProps {
  date: any;
  hours: any;
}

export const Card = ({ date, hours }: CardProps): JSX.Element => {
  console.log(date, hours);
  return (
    <div className={style.cardContainer}>
      <p>{date}</p>
      <div className={style.hoursContainer}>
        {hours &&
          hours.map((hour: any, index: any) => {
            return (
              <label>
                <input
                  type="button"
                  value={hour.slice(0, -3)}
                  key={index}
                ></input>
              </label>
            );
          })}
      </div>
    </div>
  );
};

export default Card;
