import React, { useEffect, useState } from "react";
import Joi from "joi-browser";
import Form from "../../common/form";
import axios from "axios";

const EvaluationForm = () => {
  const initialData = { url: "" };
  const [data, setData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [list, setList] = useState([]);
  const [total, setTotal] = useState({});
  const [loading, setLoading] = useState(false);

  const doSubmit = async () => {
    // Call the server
    console.log("Submitted", data);
    try {
      const response = await axios.post(
        "https://ssc-result-api.onrender.com/fetch-results",
        data
      );
      const responseData = response.data;

      if (responseData) {
        setTotal(responseData.total);
        setList(responseData.data);
        setLoading(true);
      }
      //   await auth.login(data.email, data.password);
      //   window.location = "/dashboard";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...errors };
        errors.email = ex.response.data;
        setErrors({ errors });
      }
    }
  };
  const schema = {
    url: Joi.string().required().label("URL"),
  };

  const { renderInput, renderButton, handleSubmit } = Form({
    data,
    setData,
    errors,
    setErrors,
    schema,
    onSubmit: doSubmit,
  });

  console.log("total", total);
  console.log("list", list);

  return (
    <>
      <form onSubmit={handleSubmit} className="forms-sample">
        {renderInput("url", "Enter URL")}
        {renderButton("Save")}
        <p>&nbsp;</p>
      </form>

      {loading && (
        <>
          <div className="row">
            <div className="col-md-3">
              <p>Attempted: {total.ans}</p>
              <p>Un Attempted: {total.notAttempted}</p>
              <p>Wrong Answers: {total.wrong}</p>
              <p>Right Answers: {total.Attempted}</p>
            </div>
            <div className="col-md-9">
              <div className="row">
                {list.map((l) => (
                  <>
                    <div className="col-md-3">
                      <p>Section : {l.section}</p>
                      <p>Right: {l.Attempted}</p>
                      <p>Wrong: {l.wrong}</p>
                      <p>Un Attempted: {l.notAttempted}</p>
                      <p>Marks: {l.marks}</p>
                    </div>
                  </>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default EvaluationForm;
