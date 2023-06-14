import PopupWithForm from "./PopupWithForm";
import { useEffect, useRef } from "react";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatar = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatar.current.value,
    });
  }

  useEffect(() => {
    avatar.current.value = "";
  }, [isOpen]);

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      textButton="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="form__input form__input_field_avatar"
        id="input-avatar"
        name="avatar"
        type="url"
        placeholder="Ссылка на картинку"
        ref={avatar}
        required
      />
      <span className="form__error" id="input-avatar-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
