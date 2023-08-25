import React from "react";
import "./Modal.css";
import { format } from "date-fns";
import { ru } from 'date-fns/locale';

const Modal = ({ data, date }) => {
  function formatDate(inputDate) {
    const date = new Date(inputDate);
    const formattedDate = format(date, "EEEE, MMMM d, yyyy", {
      locale: ru,
    });
    return formattedDate;
  }
  return (
    <div className="modal">
      <p>{data} contributions </p>
      <p style={{textTransform: "capitalize"}}>{formatDate(date)}</p>
    </div>
  );
};
export default Modal;
