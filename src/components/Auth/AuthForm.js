import { useEffect, useState, useRef } from "react";

function AuthForm({ title, name, textButton, children, onSubmit, isLoading }) {
  const [isValid, setIsValid] = useState(false);
  const authFormRef = useRef();

  useEffect(() => {
    setIsValid(authFormRef.current.checkValidity());
  }, [children]);

  return (
    <div className="auth">
      <h2 className="auth__title">{title}</h2>
      <div className="auth__container">
        <form
          ref={authFormRef}
          className="form"
          name={`form-${name}`}
          onSubmit={onSubmit}
          noValidate
        >
          {children}
          <button
            className={` ${
              isValid
                ? "form__button form__button_auth"
                : "form__button form__button_auth form__button_disabled"
            }`}
            disabled={!isValid}
            aria-label={` ${textButton || "Войти"}`}
            type="submit"
          >
            {isLoading ? "Авторизация..." : textButton || "Войти"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AuthForm;
