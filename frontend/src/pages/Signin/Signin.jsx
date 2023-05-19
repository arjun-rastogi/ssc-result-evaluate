import React, { useState } from "react";
import Joi from "joi-browser";
import Input from "./../../common/input";
import auth from "../../services/authServices";

const Signin = () => {
  const [account, setAccount] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const schema = {
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .label("Email"),
    password: Joi.string().required().min(5).label("Password"),
  };

  const validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(account, schema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  const validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schemas = { [name]: schema[name] };
    const { error } = Joi.validate(obj, schemas);
    return error ? error.details[0].message : null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();
    console.log(errors);
    setErrors(errors || {});
    if (errors) return;

    try {
      const data = account;
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

  const handleChange = ({ currentTarget: input }) => {
    const error = { ...errors };
    const errorMessage = validateProperty(input);
    if (errorMessage) error[input.name] = errorMessage;
    else delete error[input.name];

    const accounts = { ...account };
    accounts[input.name] = input.value;
    setAccount(accounts);
    setErrors(error);
  };

  const { email, password } = account;

  return (
    <>
      <div className="container vh-100">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 offset-md-3">
              <h5>Sign in for Existing User</h5>
            </div>
            <div className="col-md-6 offset-md-3">
              <Input
                name="email"
                label="Email"
                value={email}
                error={errors.email}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6 offset-md-3">
              <Input
                name="password"
                label="Password"
                value={password}
                error={errors.password}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6 offset-md-3 mt-3">
              <button type="submit" class="btn btn-outline-primary">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Signin;
