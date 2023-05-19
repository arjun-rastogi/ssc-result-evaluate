import React, { useState } from "react";
import Joi from "joi-browser";
import auth from "../../services/authServices";
import Form from "../../common/form";

const Signin = () => {
  const initialData = { email: "", password: "" };
  const [data, setData] = useState(initialData);
  const [errors, setErrors] = useState({});

  const doSubmit = async () => {
    // Call the server
    console.log("Submitted", data);
    try {
      await auth.login(data.email, data.password);
      window.location = "/dashboard";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...errors };
        errors.email = ex.response.data;
        setErrors({ errors });
      }
    }
  };

  const schema = {
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .label("Email"),
    password: Joi.string().required().min(5).label("Password"),
  };

  const { renderInput, renderButton, handleSubmit } = Form({
    data,
    setData,
    errors,
    setErrors,
    schema,
    onSubmit: doSubmit,
  });

  return (
    <>
      <div className="container vh-100">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <h5>Sign in for Existing User</h5>
          </div>
          <div className="col-md-6 offset-md-3">
            <form onSubmit={handleSubmit} className="forms-sample">
              {renderInput("email", "Email")}
              {renderInput("password", "Password", "password")}
              {renderButton("Save")}
              <p>&nbsp;</p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;
