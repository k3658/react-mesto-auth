import PopupWithForm from "./PopupWithForm";

function ConfirmationPopup({ card, isOpen, onClose, onCardDelete, isLoading }) {
  function handleSubmit(e) {
    e.preventDefault();

    onCardDelete(card);
  }

  return (
    <PopupWithForm
      name="delete"
      title="Вы уверены?"
      textButton="Да"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    />
  );
}

export default ConfirmationPopup;
