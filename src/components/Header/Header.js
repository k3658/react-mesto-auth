import logo from "../../images/logo.svg";
import { Route, Routes, Link } from "react-router-dom";
import React, { useState } from "react";

function Header({ userEmail, onLogout }) {
  const [menuClass, setMenuClass] = useState("header__nav_mobile");
  const [isMenuActive, setIsMenuActive] = useState(false);

  function handleToggleMenu() {
    if (!isMenuActive) {
      setMenuClass("header__nav_mobile_active");
    } else {
      setMenuClass("header__nav_mobile");
    }
    setIsMenuActive(!isMenuActive);
  }

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <nav className={menuClass}>
              <ul className="header__nav_menu">
                <li>
                  <p className="header__nav_email">{userEmail}</p>
                </li>
                <li>
                  <Link
                    to="/sign-in"
                    className="header__nav_logout"
                    onClick={onLogout}
                  >
                    Выйти
                  </Link>
                </li>
              </ul>
            </nav>
          }
        />
      </Routes>

      <div className="header">
        <img className="header__logo" src={logo} alt="Логотип" />

        <Routes>
          <Route
            path="/sign-in"
            element={
              <Link to="/sign-up" className="header__link">
                Регистрация
              </Link>
            }
          />

          <Route
            path="/sign-up"
            element={
              <Link to="/sign-in" className="header__link">
                Войти
              </Link>
            }
          />

          <Route
            path="/"
            element={
              <>
                <nav className="header__nav_desktop">
                  <p className="header__email">{userEmail}</p>
                  <Link
                    to="/sign-in"
                    className="header__link"
                    onClick={onLogout}
                  >
                    Выйти
                  </Link>
                </nav>
                <label className="header__nav_button">
                  <input
                    className="header__nav_switcher"
                    type="checkbox"
                    onClick={handleToggleMenu}
                  ></input>
                  <span className="header__nav_button_transition" />
                  <span className="header__nav_button_transition" />
                  <span className="header__nav_button_transition" />
                  <span className="header__nav_button_transition" />
                </label>
              </>
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default Header;
