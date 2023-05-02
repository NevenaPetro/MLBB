import React from "react";

function Modal({ setModalData, children }) {

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
