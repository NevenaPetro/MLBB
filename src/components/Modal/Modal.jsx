import React from "react";
import { useEffect } from "react";
import "../Modal/_modal.scss";

function Modal({ setModalData, children }) {
  function handleEsc(event) {
    if (event.keyCode === 27) {
      setModalData(null);
    }
  }
  useEffect(() => {
    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, []);
  return (
    <div className="modal-wrapper">
      <div
        className="modal-bg"
        onClick={() => {
          setModalData(null);
        }}
      >
        <div
          className="modal"
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
         
            <button
              className="close-btn"
              type={"button"}
              onClick={() => setModalData(null)}
            >
              X
            </button>
          

          {children}
          <div className="big-buttons">
            {" "}
            <button
              className="big-btn"
              type="button"
              onClick={() => {
                setModalData(null);
              }}
            >
              Odustani
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
