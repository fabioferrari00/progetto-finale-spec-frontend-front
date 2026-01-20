import React, { memo, useContext } from 'react'
import { Link } from 'react-router-dom'
import { FavoritesContext } from '../context/FavoritesContext'
import { useComparison } from '../context/ComparisonContext'


const CourseCard = memo(({ course }) => {

  const { toggleFavorite, isFavorite } = useContext(FavoritesContext);
  const { toggleComparison, isInComparison } = useComparison();

  const favorite = isFavorite(course.id);
  const inComparison = isInComparison(course.id);


  return (
    <>
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
        </div>
      </div>
    </>
  )
})

export default CourseCard
