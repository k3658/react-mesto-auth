const profileForm = document.forms["form-profile"];
const avatarForm = document.forms["form-avatar"];
const cardsForm = document.forms["form-cards"];

const cardsContainer = document.querySelector(".places__list");

// VALIDATION
const formValidationConfig = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button",
  disabledButtonClass: "form__button_disabled",
  inputErrorClass: "form__input_error",
};

// BUTTONS
const buttonEditProfile = document.querySelector(".profile__edit");
const buttonAddCards = document.querySelector(".profile__add");

//exporting into index.js
export {
  profileForm,
  avatarForm,
  cardsForm,
  cardsContainer,
  formValidationConfig,
  buttonEditProfile,
  buttonAddCards,
};
