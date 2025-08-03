import "./NoRecords.scss";

const NoRecords = ({ text }) => {
  return <p className="no-records body-large">There are no {text}</p>;
};

export default NoRecords;
