import { useState } from "react";
import "./StatusField.scss";

const StatusField = ({ text }) => {
  return (
    <div
      className={`status ${
        text.toLowerCase() === "in stock"
          ? "status--in-stock"
          : "status--out-of-stock"
      }`}
    >
      <h4
        className={`status__content ${
          text.toLowerCase() === "in stock"
            ? "status__content--in-stock"
            : "status__content--out-of-stock"
        }`}
      >
        {text}
      </h4>
    </div>
  );
};

export default StatusField;
