import "../index.css";
import React, { useState, useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";

import { CurrentUserContext } from "../contexts/CurrentUserContext";
import ProtectedRouteElement from "./ProtectedRoute";

import api from "../utils/api";
import * as auth from "../utils/auth.js";

import Login from "./Auth/Login";
import Register from "./Auth/Register";

import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";

import EditProfilePopup from "./PopupsWithForm/EditProfilePopup";
import EditAvatarPopup from "./PopupsWithForm/EditAvatarPopup";
import AddPlacePopup from "./PopupsWithForm/AddPlacePopup";
import ConfirmationPopup from "./PopupsWithForm/ConfrimationPopup";
import ImagePopup from "./PopupsWithoutForm/ImagePopup.js";
import InfoTooltip from "./PopupsWithoutForm/InfoTooltip";

import PageNotFound from "./PageNotFound";

function App() {
  // auth
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  //ux/ui
  const [isLoading, setIsLoading] = useState(false);

  // popup infoTooltip
  const [infoTooltip, setInfoTooltip] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);

  // user info
  const [currentUser, setCurrentUser] = useState({});
  const [userEmail, setUserEmail] = useState("");

  // popup edit profile
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

  // popup add card/place
  const [cards, setCards] = useState([]);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);

  // popup full photo
  const [selectedCard, setSelectedCard] = useState({});

  // popup delete confirmation
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = useState(false);
  const [cardToDelete, setCardToDelete] = useState({});

  // AUTHORIZATION RELATED
  function handleRegister({ email, password }) {
    setIsLoading(true);
    auth
      .register({ email, password })
      .then(() => {
        setInfoTooltip(true);
        navigate("/sign-in", { replace: true });
      })
      .catch((err) => {
        setInfoTooltip(false);
        console.error(`Ошибка: ${err}`);
      })
      .finally(() => setIsLoading(false), setIsInfoTooltipOpen(true));
  }

  function handleLogin({ email, password }) {
    setIsLoading(true);
    auth
      .authorize({ email, password })
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        setLoggedIn(true);
        setUserEmail(email);
        navigate("/", { replace: true });
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      })
      .finally(() => setIsLoading(false));
  }

  function handleLogout() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    navigate("/sign-in");
  }

  function handleTokenCheck() {
    const jwt = localStorage.getItem("jwt");

    if (jwt) {
      auth
        .checkToken(jwt)
        .then(({ data }) => {
          setLoggedIn(true);
          setUserEmail(data.email);
          navigate("/", { replace: true });
        })
        .catch((err) => {
          console.error(`Ошибка: ${err}`);
        });
    }
  }

  useEffect(() => {
    handleTokenCheck();
  }, []);

  // LOADS USER INFO AND CARDS FROM SERVER
  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserData(), api.getInitialCards()])
        .then(([currentUser, cards]) => {
          setCurrentUser(currentUser);
          setCards(cards);
        })
        .catch((err) => {
          console.error(`Ошибка: ${err}`);
        });
    }
  }, [loggedIn]);

  // POPUP PROFILE RELATED
  function handleOpenProfilePopup() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleUpdateUser(data) {
    setIsLoading(true);
    api
      .setUserData(data)
      .then((avatar) => {
        setCurrentUser(avatar);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      })
      .finally(() => setIsLoading(false));
  }

  // POPUP AVATAR RELATED
  function handleOpenAvatarPopup() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleUpdateAvatar(data) {
    setIsLoading(true);
    api
      .updateAvatar(data)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      })
      .finally(() => setIsLoading(false));
  }

  // POPUP CARDS RELATED
  function handleOpenAddPlacePopup() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function handleAddPlaceSubmit(item) {
    setIsLoading(true);
    api
      .postNewCard(item)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      })
      .finally(() => setIsLoading(false));
  }

  // FULL PHOTO POPUP RELATED
  function handleCardClick(card) {
    setSelectedCard(card);
  }

  // CARD LIKES RELATED
  function handleToggleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    if (!isLiked) {
      api
        .likeCard(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => {
          console.error(`Ошибка: ${err}`);
        });
    } else {
      api
        .removeLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => {
          console.error(`Ошибка: ${err}`);
        });
    }
  }

  // POPUP CONFIRM DELETION RELATED
  function handleOpenConfrimationPopup(card) {
    setIsConfirmationPopupOpen(!isConfirmationPopupOpen);
    setCardToDelete(card);
  }

  function handleCardDelete(card) {
    setIsLoading(true);
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      })
      .finally(() => setIsLoading(false));
  }

  // CLOSES POPUPS
  function closeAllPopups() {
    setIsInfoTooltipOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsConfirmationPopupOpen(false);
    setSelectedCard({});
  }

  const isOpen =
    isInfoTooltipOpen ||
    isEditProfilePopupOpen ||
    isEditAvatarPopupOpen ||
    isAddPlacePopupOpen ||
    selectedCard ||
    isConfirmationPopupOpen;

  useEffect(() => {
    function closeByEscape(e) {
      if (e.key === "Escape") {
        closeAllPopups();
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", closeByEscape);
      return () => {
        document.removeEventListener("keydown", closeByEscape);
      };
    }
  }, [isOpen]);

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header onLogout={handleLogout} userEmail={userEmail} />
        <Routes>
          <Route
            path="/sign-up"
            element={
              <Register onRegister={handleRegister} isLoading={isLoading} />
            }
          />

          <Route
            path="/sign-in"
            element={<Login onLogin={handleLogin} isLoading={isLoading} />}
          />

          <Route
            path="/"
            element={
              <ProtectedRouteElement
                element={Main}
                loggedIn={loggedIn}
                cards={cards}
                onEditProfile={handleOpenProfilePopup}
                onEditAvatar={handleOpenAvatarPopup}
                onAddPlace={handleOpenAddPlacePopup}
                onCardClick={handleCardClick}
                onCardLike={handleToggleCardLike}
                onCardDelete={handleOpenConfrimationPopup}
              />
            }
          />

          <Route
            path="/"
            element={
              loggedIn ? (
                <Navigate to="/" />
              ) : (
                <Navigate to="/sign-in" replace />
              )
            }
          />

          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          authStatus={infoTooltip}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isLoading={isLoading}
        />
        <ConfirmationPopup
          card={cardToDelete}
          isOpen={isConfirmationPopupOpen}
          onClose={closeAllPopups}
          onCardDelete={handleCardDelete}
          isLoading={isLoading}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
