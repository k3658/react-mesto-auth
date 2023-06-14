function ImagePopup({ card, onClose }) {
  return (
    <div
      className={`popup popup_type_photo ${card.name ? "popup_opened" : ""}`}
    >
      <figure className="popup__figure">
        <button
          className="popup__close"
          aria-label="Закрыть"
          type="button"
          onClick={onClose}
        ></button>
        <img className="popup__photo" src={card.link} alt={card.name} />
        <p className="popup__caption">{card.name}</p>
      </figure>
    </div>
  );
}

export default ImagePopup;
