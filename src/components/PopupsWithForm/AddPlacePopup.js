import { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [title, setTitle] = useState(" ");
  const [link, setLink] = useState(" ");

  function handleNameChange(e) {
    setTitle(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      title: title,
      link: link,
    });
  }

  useEffect(() => {
    setTitle("");
    setLink("");
  }, [isOpen]);

  return (
    <PopupWithForm
      name="cards"
      title="Новое место"
      textButton="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="form__input form__input_field_title"
        id="input-title"
        name="title"
        type="text"
        minLength="2"
        maxLength="30"
        placeholder="Название"
        value={title || ""}
        onChange={handleNameChange}
        required
      />
      <span className="form__error" id="input-title-error"></span>
      <input
        className="form__input form__input_field_link"
        id="input-link"
        name="link"
        type="url"
        placeholder="Ссылка на картинку"
        value={link || ""}
        onChange={handleLinkChange}
        required
      />
      <span className="form__error" id="input-link-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
