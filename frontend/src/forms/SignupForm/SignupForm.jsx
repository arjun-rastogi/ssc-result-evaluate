import React, { useState } from "react";
import Joi from "joi-browser";
import auth from "../../services/authServices";
import * as userService from "../../services/userService";
import Form from "../../common/form";

const SignupForm = () => {
  const initialData = {
    name: "",
    email: "",
    password: "",
  };

  const [data, setData] = useState(initialData);
  const [errors, setErrors] = useState({});

  const doSubmit = async () => {
    // Call the server
    console.log("Submitted", data);
    try {
      const response = await userService.register(data);
      auth.loginWithJwt(response.data.token);
      window.location = "/dashboard";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...errors };
        errors.username = ex.response.data;
        setErrors({ errors });
      }
    }
  };

  const schema = {
    name: Joi.optional().allow(""),
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
      <form onSubmit={handleSubmit} className="forms-sample">
        {renderInput("name", "User Name")}
        {renderInput("email", "Email")}
        {renderInput("password", "Password", "password")}
        {renderButton("Save")}
        <p>&nbsp;</p>
      </form>
    </>
  );
};

export default SignupForm;
