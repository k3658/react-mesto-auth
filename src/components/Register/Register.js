import React, { useState } from "react";
import { Link } from "react-router-dom";

function Register({ onRegister }) {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    onRegister(formValue);
  }

  return (
    <div className="signup">
      <h2 className="signup__title">Регистрация</h2>
      <div className="signup__container">
        <form className="form" name="form-signup" onSubmit={handleSubmit}>
          <input
            className="form__input form__input_field_email"
            id="input-email"
            name="email"
            type="email"
            placeholder="Email"
            minLength="3"
            maxLength="40"
            onChange={handleChange}
            value={formValue.email}
            required
          ></input>
          <span className="form__error" id="input-email-error"></span>
          <input
            className="form__input form__input_field_password"
            id="input-password"
            name="password"
            type="password"
            placeholder="Пароль"
            minLength="2"
            maxLength="40"
            onChange={handleChange}
            value={formValue.password}
            required
          ></input>
          <span className="form__error" id="input-password-error"></span>
          <button
            className="form__button form__button_auth"
            aria-label="Зарегистрироваться"
            type="submit"
          >
            Зарегистрироваться
          </button>
        </form>
        <div className="signup__login">
          <p className="signup__login_text">Уже зарегистрированы?</p>
          <Link to="/sign-in" className="signup__login_link">
            Войти
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
