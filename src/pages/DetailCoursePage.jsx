import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"
import { useFavorites } from "../context/FavoritesContext";
import { useComparison } from '../context/ComparisonContext'

const DetailCoursePage = () => {
  const { toggleFavorite, isFavorite } = useFavorites();
  const { toggleComparison, isComparison } = useComparison();

  const [course, setCourse] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(`http://localhost:3001/courses/${id}`);
        if (!response.ok) throw new Error("Course not found");
        const data = await response.json();
        setCourse(data.course);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchCourse();

  }, [id, navigate]);

  const inComparison = isComparison(id);

  if (error) return <div className="text-center py-20 text-red-500">Error: {error}</div>;
  if (!course) return <div className="text-center py-20">Caricamento corso...</div>;

  const favorite = isFavorite(course.id);

  const courseId = Number(id);

  const goPrev = () => {
    if (courseId > 1) {
      navigate(`/courses/${courseId - 1}`);
    }
  };

  const goNext = () => {
    navigate(`/courses/${courseId + 1}`);
  };

  return (
    <div className="">
      <div className="container">
        <div className="row">
          <div className="col-12 course-title">
            <p>{course.title}</p>
            <div className="text-end mx-3">
              <button
                className={`btn btn-sm ms-2 ${inComparison ? "btn-success" : "btn-outline-secondary"
                  }`}
                onClick={(e) => {
                  e.preventDefault();
                  toggleComparison(course);
                }}
              >
                {inComparison ? "✓ Confronta" : "Confronta"}
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  toggleFavorite(course);
                  ;
                }}
                className="favorite-btn"
              >
                <i
                  className={`fa-star ${favorite ? "fa-solid is-favorite" : "fa-regular"
                    }`}
                ></i>
              </button>
            </div>
          </div>
          <div className="col-12 course-description">
            <p>{course.description}</p>
          </div>
          <div className="col-12 text-center py-5">
            <a href={course.prefectureUrl}>Clicca qui per leggere il bando sul sito ufficiale della prefettura</a>
          </div>
          <ul className="details-list mb-5">
            <li>
              <strong>Categoria: </strong><span>{course.category}</span>
            </li>
            <li>
              <strong>Tipo di corso: </strong><span>{course.typeOfCourse}</span>
            </li>
            <li>
              <strong>Durata: </strong><span>{course.duration} ore</span>
            </li>
            <li>
              <strong>{course.isAvailable ? "Disponibile" : "Non disponibile al momento"}
              </strong>
            </li>
            <li>
              <strong>Prefettura d'esame: </strong><span>{course.prefecture}</span>
            </li>
            <li>
              <strong>Tipo di esame: </strong><span>{course.typeOfExam}</span>
            </li>
            <li>
              <strong>Prezzo: </strong><span>€ {course.price}</span>
            </li>
            <li>
              <strong>Docenti del corso: </strong>
              <div>
                {course.teachers.map((teacher, index) => (
                  <span key={index} className="text-slate-600">
                    {teacher}{index < course.teachers.length - 1 ? ", " : ""}
                  </span>
                ))}
              </div>
            </li>
          </ul>
          <div className="d-flex justify-content-center gap-5 my-4">
            <button
              className="pagination-btn fs-3"
              onClick={goPrev}
              disabled={courseId === 1}
            >
              <i className="fa-solid fa-angle-left"></i>
            </button>

            <button className="pagination-btn fs-3" onClick={goNext} disabled={courseId === 10}>
              <i className="fa-solid fa-angle-right"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailCoursePage
