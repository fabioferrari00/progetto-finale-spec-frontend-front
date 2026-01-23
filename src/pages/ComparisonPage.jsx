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

      <div className="row g-4">
        {comparison.map((course) => (
          <div className="col-12 col-md-6" key={course.id}>
            <div className="card h-100 shadow-sm border-0">

              {/* Header */}
              <div className="card-header bg-light">
                <h5 className="mb-0 fw-semibold">{course.title}</h5>
              </div>

              {/* Body */}
              <div className="card-body d-flex flex-column">
                <ul className="list-group list-group-flush mb-3">
                  <li className="list-group-item">
                    <strong>Categoria:</strong> {course.category}
                  </li>
                  <li className="list-group-item">
                    <strong>Tipo di corso:</strong> {course.typeOfCourse}
                  </li>
                  <li className="list-group-item">
                    <strong>Durata:</strong> {course.duration} ore
                  </li>
                  <li className="list-group-item">
                    <strong>Prefettura:</strong> {course.prefecture}
                  </li>
                  <li className="list-group-item">
                    <strong>Tipo di esame:</strong> {course.typeOfExam}
                  </li>
                  <li className="list-group-item">
                    <strong>Docenti:</strong>{" "}
                    {course.teachers.map((teacher, index) => (
                      <span key={index}>
                        {teacher}
                        {index < course.teachers.length - 1 && ", "}
                      </span>
                    ))}
                  </li>
                </ul>

                {/* Disponibilità + Prezzo */}
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <span
                    className={`badge ${course.isAvailable ? "bg-success" : "bg-secondary"
                      }`}>
                    {course.isAvailable ? "Disponibile" : "Non disponibile"}
                  </span>

                  <span className="fs-5 fw-bold text-primary">
                    € {course.price}
                  </span>
                </div>

                {/* CTA */}
                <button
                  className="btn btn-outline-danger btn-sm mt-auto"
                  onClick={() => removeFromComparison(course.id)}
                >
                  Rimuovi dal confronto
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-end mt-4">
        <button className="btn btn-outline-secondary" onClick={clearComparison}>
          Svuota confronto
        </button>
      </div>
    </div>

  );
};

export default ComparisonPage;
