import { useComparison } from "../context/ComparisonContext";
import { Link } from "react-router-dom";

const ComparisonPage = () => {
  const { comparison, removeFromComparison, clearComparison } = useComparison();

  if (comparison.length === 0) {
    return (
      <div className="container py-5 text-center">
        <h3>Nessun prodotto da confrontare</h3>
        <p>Seleziona due corsi dalla home per confrontarli.</p>
        <Link to="/" className="home-btn mt-3">Vai alla home</Link>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h2 className="mb-4">Confronto prodotti</h2>

      <div className="row mb-3">
        {comparison.map((course) => (
          <div className="col-6" key={course.id}>
            <div className="card p-3">
              <h5>{course.title}</h5>
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
              <button
                className="btn btn-sm btn-outline-danger"
                onClick={() => removeFromComparison(course.id)}>
                Rimuovi
              </button>
            </div>
          </div>
        ))}
      </div>

      <button className="btn btn-outline-secondary" onClick={clearComparison}>
        Svuota confronto
      </button>
    </div>
  );
};

export default ComparisonPage;
