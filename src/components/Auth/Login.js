import React, { useEffect } from "react";
import FormValidator from "../FormValidator";
import AuthForm from "./AuthForm";

function Login({ onLogin, isLoading }) {
  const { values, handleChange, errors, isValid, setValues, resetForm } =
    FormValidator({});

  function handleSubmit(e) {
    e.preventDefault();

    onLogin({
      email: values.email,
      password: values.password,
    });
  }

  useEffect(() => {
    resetForm();
  }, [onLogin]);

  return (
    <AuthForm
      name="login"
      title="Вход"
      textButton="Войти"
      onSubmit={handleSubmit}
      isLoading={isLoading}
    >
      <input
        className={`form__input form__input_field_email ${
          errors.email && "form__input_error"
        }`}
        id="input-email"
        name="email"
        type="email"
        placeholder="Email"
        minLength="3"
        maxLength="40"
        onChange={handleChange}
        value={values.email || ""}
        required
      />
      <span className="form__error" id="input-email-error">
        {errors.email}
      </span>

      <input
        className={`form__input form__input_field_password ${
          errors.password && "form__input_error"
        }`}
        id="input-password"
        name="password"
        type="password"
        placeholder="Пароль"
        minLength="6"
        maxLength="40"
        onChange={handleChange}
        value={values.password || ""}
        required
      />
      <span className="form__error" id="input-password-error">
        {errors.password}
      </span>
    </AuthForm>
  );
}

export default Login;
