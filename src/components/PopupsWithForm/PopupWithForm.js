function PopupWithForm({
  title,
  name,
  textButton,
  children,
  isOpen,
  onClose,
  onSubmit,
}) {
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
        <form className="form" name={`form-${name}`} onSubmit={onSubmit}>
          {children}
          <button
            className="form__button"
            aria-label={`${textButton || "Сохранить"}`}
            type="submit"
          >
            {textButton || "Сохранить"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
