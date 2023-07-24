import React, { useState } from "react";
import { Link } from "react-router-dom";

function Delete({ onClick }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(!open);
  };

  const handleDelete = () => {
    onClick("");
    setOpen(!open);
  };

  return (
    <>
      <Link to="#" className="btn-edt" onClick={handleOpen}>
        <i className="fa fa-trash" aria-hidden="true"></i>
      </Link>

      <div
        className={open ? "modal fade show" : "modal fade"}
        style={{ display: open ? "block" : "none" }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Confirmation Delete
              </h1>
              <button
                type="button"
                className="btn-close"
                onClick={handleClose}
              ></button>
            </div>
            <div className="modal-body">
              Are you sure you want to delete this record...?!
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="btn btn-primary"
              >
                Understood
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className={open ? "modal-backdrop " : ""}></div>
    </>
  );
}

export default Delete;
