import { useFavorites } from "../context/FavoritesContext";
import { Link } from "react-router-dom";

const FavoritesPage = () => {

  const { favorites, removeFavorite } = useFavorites();

  if (favorites.length === 0) {
    return (
      <div className="container py-5 text-center">
        <h3>Nessun corso nei preferiti ⭐</h3>
        <p>Aggiungi un corso dalla home per vederlo qui.</p>
      </div>
    );
  }

  console.log(favorites)

  return (
    <>
      <div className="container my-4">
        <div className="row">
          <div className="col-12">
            <h1 className="fw-bold mb-4 text-center">Preferiti</h1>
          </div>
          {favorites.map((course) => (
            <div className="col-6 mb-4" key={course.id}>
              <div className="course-card" >
                <Link to={`/courses/${course.id}`} className='card-link'>
                  <div className="course-card-header" >
                    {course.title}
                  </div>
                </Link>
                <div className="course-card-body py-4">
                  <strong>Categoria: </strong><span title="category">{course.category}</span>
                  <div className="text-end mx-3">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        toggleFavorite(course);
                      }}
                      className="favorite-btn"
                    >
                    </button>
                    <button
                      className="pagination-btn fs-5"
                      onClick={() => {
                        const confirmed = window.confirm(
                          "Sei sicuro di voler rimuovere questo prodotto dai preferiti?"
                        );

                        if (confirmed) {
                          removeFavorite(course.id);
                        }
                      }}
                    >
                      <i className="fa-solid fa-xmark"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default FavoritesPage
