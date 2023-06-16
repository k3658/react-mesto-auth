import { useEffect, useState, useRef } from "react";

function PopupWithForm({
  title,
  name,
  textButton,
  children,
  isOpen,
  onClose,
  onSubmit,
  isLoading,
}) {
  const [isValid, setIsValid] = useState(false);
  const formRef = useRef();

  useEffect(() => {
    setIsValid(formRef.current.checkValidity());
  }, [children]);

  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button
          className="popup__close"
          aria-label="Закрыть"
          type="button"
          onClick={onClose}
        ></button>
        <h2 className="popup__title">{title}</h2>
        <form
          ref={formRef}
          className="form"
          name={`form-${name}`}
          onSubmit={onSubmit}
          noValidate
        >
          {children}
          <button
            className={`${
              isValid ? "form__button" : "form__button form__button_disabled"
            }`}
            aria-label={`${textButton || "Сохранить"}`}
            type="submit"
            disabled={!isValid}
          >
            {isLoading ? "Сохранение..." : textButton || "Сохранить"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
