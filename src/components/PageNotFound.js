import { useNavigate } from "react-router-dom";

function PageNotFound() {
  const navigate = useNavigate();

  function goBack() {
    navigate(-1);
  }

  return (
    <div className="notfound">
      <h1 className="notfound__title">404 Page Not Found</h1>;
      <h2 className="notfound__text">Потерялись?</h2>
      <button className="notfound__button" onClick={goBack}>
        Хочу обратно
      </button>
    </div>
  );
}

export default PageNotFound;
