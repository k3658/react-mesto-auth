import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AuthForm from "./AuthForm";
import FormValidator from "../FormValidator";

function Register({ onRegister, isLoading }) {
  const { values, handleChange, errors, isValid, setValues, resetForm } =
    FormValidator({});

  function handleSubmit(e) {
    e.preventDefault();

    onRegister({
      email: values.email,
      password: values.password,
    });
  }

  useEffect(() => {
    resetForm();
  }, [onRegister]);

  return (
    <>
      <AuthForm
        name="signup"
        title="Регистрация"
        textButton="Зарегистрироваться"
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
      <div className="auth__login">
        <p className="auth__login_text">Уже зарегистрированы?</p>
        <Link to="/sign-in" className="auth__login_link">
          Войти
        </Link>
      </div>
    </>
  );
}

export default Register;
