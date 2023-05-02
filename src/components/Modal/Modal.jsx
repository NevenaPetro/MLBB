import React from "react";
import { useEffect } from "react";
import '../Modal/modal.css'

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
    <>
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
            className={"close-btn"}
            type={"button"}
            onClick={() => setModalData(null)}
          >
            X
          </button>
          {children}
          <button
              className="btn-md"
              type="button"
              onClick={() => {
                setModalData(null);
              }}
            >
              Odustani
            </button>
        </div>
      </div>
    </>
  );
}

export default Modal;
