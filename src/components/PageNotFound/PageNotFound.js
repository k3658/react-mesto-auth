import { useNavigate } from "react-router-dom";

function PageNotFound() {
  const navigate = useNavigate();

  function goBack() {
    navigate(-1);
  }

  return (
    <>
      <h1 className="notfound__title">404 Page Not Found</h1>;
      <button onClick={goBack}>Хочу обратно </button>
    </>
  );
}

export default PageNotFound;
