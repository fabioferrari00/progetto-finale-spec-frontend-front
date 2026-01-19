import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

const DetailCoursePage = () => {

  const { id } = useParams();
  const [course, setCourse] = useState(null);


  useEffect(() => {
    axios.get(`http://localhost:3001/courses/${id}`).then((res) => setCourse(res.data.course)).catch((err) => console.error(err));
  }, [id])

  if (!course) return <div className="text-center py-20">Caricamento corso...</div>;

  return (
    <div className="">
      <div className="container">
        <div className="row">
          <div className="col-12 course-title">
            <p>{course.title}</p>
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
        </div>
      </div>
    </div>
  )
}

export default DetailCoursePage
