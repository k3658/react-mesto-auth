import React, { useEffect, useState, useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState(currentUser.name);
  const [description, setDescription] = useState(currentUser.about);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name: name,
      about: description,
    });
  }

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [isOpen, currentUser]);

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      textButton="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="form__input form__input_field_name"
        id="input-name"
        name="name"
        type="text"
        placeholder="Имя"
        minLength="2"
        maxLength="40"
        onChange={handleNameChange}
        value={name || ""}
        required
      />
      <span className="form__error" id="input-name-error"></span>
      <input
        className="form__input form__input_field_about"
        id="input-about"
        name="about"
        type="text"
        placeholder="О себе"
        minLength="2"
        maxLength="200"
        onChange={handleDescriptionChange}
        value={description || ""}
        required
      />
      <span className="form__error" id="input-about-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
