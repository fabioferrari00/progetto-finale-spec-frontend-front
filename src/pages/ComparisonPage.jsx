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
              <p>{course.category}</p>
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
