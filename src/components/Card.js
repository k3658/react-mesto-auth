import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = isOwn
    ? "place__delete"
    : "place__delete_hidden";

  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `place__like ${
    isLiked && "place__like_active"
  }`;

  function handleCardClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <li className="place">
      <img
        className="place__photo"
        src={card.link}
        alt={card.name}
        onClick={handleCardClick}
      />
      <button
        className={cardDeleteButtonClassName}
        aria-label="Удалить"
        type="button"
        onClick={handleDeleteClick}
      />
      <div className="place__cell">
        <h2 className="place__name">{card.name}</h2>
        <div className="place__cell_like">
          <button
            className={cardLikeButtonClassName}
            aria-label="Нравится"
            type="button"
            onClick={handleLikeClick}
          />
          <p className="place__like_counter">{card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
