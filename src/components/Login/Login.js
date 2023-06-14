import React, { useState } from "react";

function Login({ onLogin }) {
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

    onLogin(formValue);
  }

  return (
    <div className="login">
      <h2 className="login__title">Вход</h2>
      <div className="login__container">
        <form className="form" name="form-login" onSubmit={handleSubmit}>
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
            aria-label="Войти"
            type="submit"
          >
            Войти
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
