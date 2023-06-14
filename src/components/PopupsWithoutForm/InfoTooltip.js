import yay from "../../images/yay.svg";
import nay from "../../images/nay.svg";

function InfoTooltip({ isOpen, onClose, authStatus }) {
  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button
          className="popup__close"
          aria-label="Закрыть"
          type="button"
          onClick={onClose}
        ></button>
        <img
          className="popup__auth_img"
          src={authStatus ? yay : nay}
          alt={
            authStatus
              ? "Вы успешно зарегистрировались!"
              : "Что-то пошло не так! Попробуйте ещё раз."
          }
        ></img>
        <h2 className="popup__auth_status">
          {authStatus
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте ещё раз."}
        </h2>
      </div>
    </div>
  );
}

export default InfoTooltip;
