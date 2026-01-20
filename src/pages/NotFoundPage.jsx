import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="container text-center py-5">
      <h1>Ops! Penso tu ti sia perso, forse è meglio tornare indietro...</h1>
      <div className="mt-5">
        <Link to="/" className="home-btn add-to-list fs-3 mt-3">
          Torna alla home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;