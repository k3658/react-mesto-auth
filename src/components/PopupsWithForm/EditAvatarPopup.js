import PopupWithForm from "./PopupWithForm";
import { useEffect, useRef } from "react";
import FormValidator from "../FormValidator";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {
  const { values, handleChange, errors, isValid, setValues, resetForm } =
    FormValidator({});

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: values.avatar,
    });
  }

  useEffect(() => {
    resetForm();
  }, [isOpen]);

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      textButton="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    >
      <input
        className={`form__input form__input_field_avatar ${
          errors.avatar && "form__input_error"
        }`}
        id="input-avatar"
        name="avatar"
        type="url"
        placeholder="Ссылка на картинку"
        value={values.avatar || ""}
        onChange={handleChange}
        required
      />
      <span className="form__error" id="input-avatar-error">
        {errors.avatar}
      </span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
