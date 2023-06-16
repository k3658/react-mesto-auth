import { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";
import FormValidator from "../FormValidator";

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {
  const { values, handleChange, errors, isValid, setValues, resetForm } =
    FormValidator({});

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      title: values.title,
      link: values.link,
    });
  }

  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen]);

  return (
    <PopupWithForm
      name="cards"
      title="Новое место"
      textButton="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    >
      <input
        className={`form__input form__input_field_title ${
          errors.title && "form__input_error"
        }`}
        id="input-title"
        name="title"
        type="text"
        minLength="2"
        maxLength="30"
        placeholder="Название"
        value={values.title || ""}
        onChange={handleChange}
        required
      />
      <span className="form__error" id="input-title-error">
        {errors.title}
      </span>

      <input
        className={`form__input form__input_field_link ${
          errors.link && "form__input_error"
        }`}
        id="input-link"
        name="link"
        type="url"
        placeholder="Ссылка на картинку"
        value={values.link || ""}
        onChange={handleChange}
        required
      />
      <span className="form__error" id="input-link-error">
        {errors.link}
      </span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
