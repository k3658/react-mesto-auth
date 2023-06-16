import { Route, Routes } from "react-router-dom";

function Footer() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="footer">
            <p className="footer__copyright">© 2023 Mesto Russia</p>
          </div>
        }
      />
    </Routes>
  );
}

export default Footer;
