import React from "react";
import { EvaluationForm } from "./../../forms/";

const Home = () => {
  return (
    <>
      <div className="container vh-100">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <h5>Enter URL</h5>
          </div>
          <div className="col-md-6 offset-md-3">
            <EvaluationForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
