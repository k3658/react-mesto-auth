import React, { useEffect, useState, useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";
import FormValidator from "../FormValidator";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange, errors, isValid, setValues, resetForm } =
    FormValidator({});

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name: values.name,
      about: values.about,
    });
  }

  useEffect(() => {
    resetForm();
    setValues(currentUser);
  }, [currentUser, isOpen]);

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      textButton="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    >
      <input
        className={`form__input form__input_field_name ${
          errors.name && "form__input_error"
        }`}
        id="input-name"
        name="name"
        type="text"
        placeholder="Имя"
        minLength="2"
        maxLength="40"
        onChange={handleChange}
        value={values.name || ""}
        required
      />
      <span className="form__error" id="input-name-error">
        {errors.name}
      </span>

      <input
        className={`form__input form__input_field_about ${
          errors.about && "form__input_error"
        }`}
        id="input-about"
        name="about"
        type="text"
        placeholder="О себе"
        minLength="2"
        maxLength="200"
        onChange={handleChange}
        value={values.about || ""}
        required
      />
      <span className="form__error" id="input-about-error">
        {errors.about}
      </span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
