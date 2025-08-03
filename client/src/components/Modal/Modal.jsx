import { useEffect } from "react";
import CloseIcon from "../../assets/icons/close-24px.svg";
import Button from "../Button/Button";
import "./Modal.scss";

const Modal = ({ setIsOpen, title, listName, type, onClick }) => {
  const handleDelete = () => {
    setIsOpen(false);
    onClick();
  };
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="wrapper">
      <div className="modal">
        <div className="modal__inner">
          <button
            className="modal__popup-button"
            onClick={() => setIsOpen(false)}
          >
            <img
              onClick={() => setIsOpen(false)}
              className="modal__close-icon"
              src={CloseIcon}
              alt="close icon"
            />
          </button>
          <div className="modal__container">
            <h1 className="modal__heading">
              Delete {title} {type}?
            </h1>
            <p className="body-large">
              Please confirm that you'd like to delete the {title} from the{" "}
              {listName}. You won't be able to undo this action.
            </p>
          </div>
          <div className="modal__buttons">
            <div
              className="modal__button modal__button--cancel"
              onClick={() => setIsOpen(false)}
            >
              <Button text="Cancel" />
            </div>
            <div
              className="modal__button modal__button--delete"
              onClick={handleDelete}
            >
              <Button text="Delete" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
