import React, { useState } from "react";
import { Link } from "react-router-dom";

function Status({ status, onClick }) {
  const [open, setOpen] = useState(false);

  const badgeClass = (status) => {
    if (status === "Active") {
      return "badge-gradient-success";
    } else {
      return "badge-gradient-warning";
    }
  };

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(!open);
  };

  const handleStatus = () => {
    onClick("");
    setOpen(!open);
  };

  return (
    <>
      <label
        style={{ cursor: "pointer" }}
        className={`badge ${badgeClass(status)}`}
        onClick={handleOpen}
      >
        {status}
      </label>

      <div
        className={open ? "modal fade show" : "modal fade"}
        style={{ display: open ? "block" : "none" }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Confirmation Status
              </h1>
              <button
                type="button"
                className="btn-close"
                onClick={handleClose}
              ></button>
            </div>
            <div className="modal-body">
              Are you sure you want to{" "}
              {status === "Active" ? "Inactive" : "Active"} this record...?!
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
                onClick={handleStatus}
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

export default Status;
