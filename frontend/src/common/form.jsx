import React, { useState } from "react";
import Joi from "joi-browser";
import Select from "./select";
import Input from "./input";
import TextArea from "./textArea";
import InputArea from "./inputArea";
import MultipleSelect from "./multipleSelect";

const Form = ({
  data,
  setData,
  errors,
  setErrors,
  schema,
  base64Image,
  setBase64Image,
  onSubmit,
}) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const renderFile = (name, label, type = "text") => {
    return (
      <Input
        type={type}
        name={name}
        value=""
        label={label}
        onChange={handleImageChange}
        error={errors[name]}
      />
    );
  };

  const renderInput = (name, label, type = "text") => {
    return (
      <Input
        type={type}
        name={name}
        value={data[name]}
        label={label}
        onChange={handleChange}
        error={errors[name]}
      />
    );
  };

  const renderInputArea = (name, label, type = "text") => {
    return (
      <InputArea
        type={type}
        name={name}
        value={data[name]}
        label={label}
        onChange={handleChange}
        error={errors[name]}
      />
    );
  };

  const renderMultipleSelect = (name, label, options) => {
    return (
      <MultipleSelect
        selectedOptions={selectedOptions}
        setSelectedOptions={setSelectedOptions}
        name={name}
        value={data[name]}
        label={label}
        options={options}
        error={errors[name]}
        onChange={handleMultipleSelectChange}
      />
    );
  };

  const handleMultipleSelectChange = (name, selectedOptions) => {
    if (selectedOptions) {
      handleMultipleEditorChange(selectedOptions, name);
    }
  };

  const renderSelect = (name, label, options) => {
    return (
      <Select
        name={name}
        value={data[name]}
        label={label}
        options={options}
        onChange={handleChange}
        error={errors[name]}
      />
    );
  };

  const renderTextarea = (name, label, type = "text") => {
    return (
      <TextArea
        name={name}
        value={data[name]}
        label={label}
        error={errors[name]}
        onChange={(value) => handleMultipleEditorChange(value, name)}
      />
    );
  };

  const renderButton = (label) => {
    return <button className="btn ">{label}</button>;
  };

  const validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(data, schema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    setErrors(errors);
    return errors;
  };

  const validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schemas = { [name]: schema[name] };
    const { error } = Joi.validate(obj, schemas);
    return error ? error.details[0].message : null;
  };

  const handleInputChange = (input) => {
    const newErrors = { ...errors };

    const errorMessage = validateProperty(input);
    if (errorMessage) {
      newErrors[input.name] = errorMessage;
    } else {
      delete newErrors[input.name];
    }

    setData((prevState) => ({
      ...prevState,
      [input.name]: input.value,
    }));

    setErrors(newErrors);
  };

  const handleChange = (e) => {
    const { currentTarget: input } = e;
    handleInputChange(input);
  };

  const handleMultipleEditorChange = (value, name) => {
    const syntheticEvent = {
      currentTarget: {
        value,
        name,
      },
    };
    handleInputChange(syntheticEvent.currentTarget);
  };

  const handleImageChange = (e) => {
    if (setBase64Image) {
      const error = { ...errors };
      const errorMessage = validateProperty(e.target);
      console.log("errorMessage", errorMessage);
      if (errorMessage) error[e.target.name] = errorMessage;
      else delete error[e.target.name];

      const file = e.target.files?.[0];
      const reader = new FileReader();

      reader.onload = () => {
        const base64String = reader.result;
        setBase64Image(base64String);
        setData((prevAccount) => ({
          ...prevAccount,
          [e.target.name]: base64String,
        }));
      };

      if (file) {
        reader.readAsDataURL(file);
      }

      setErrors(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();
    setErrors(errors || {});
    if (errors) return;

    onSubmit();
  };

  return {
    renderButton,
    renderInput,
    renderInputArea,
    renderMultipleSelect,
    renderSelect,
    renderTextarea,
    renderFile,
    handleSubmit,
  };
};

export default Form;
