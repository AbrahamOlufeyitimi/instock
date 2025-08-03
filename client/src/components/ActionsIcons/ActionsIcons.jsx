import { Link } from "react-router-dom";
import deleteIcon from "../../assets/icons/delete_outline-24px.svg";
import editIcon from "../../assets/icons/edit-24px.svg";
import { useState } from "react";
import Modal from "../../components/Modal/Modal";
import "./ActionsIcons.scss";

const ActionsIcons = ({ editPath, title, onClick, listName, type }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="actions">
      <button className="actions__button">
        <img
          className="actions__img"
          onClick={() => setIsOpen(true)}
          src={deleteIcon}
          alt="Delete icon"
        />
      </button>
      {isOpen && (
        <Modal
          setIsOpen={setIsOpen}
          listName={listName}
          title={title}
          onClick={onClick}
          type={type}
        />
      )}
      <Link className="actions__button" to={editPath}>
        <img className="actions__img" src={editIcon} alt="Edit icon" />
      </Link>
    </div>
  );
};

export default ActionsIcons;
