import React from 'react'
import { Link } from 'react-router-dom'

const CourseCard = ({ course }) => {
  return (
    <>
      <div className="col-6" key={course.id}>
        <div className="course-card" >
          <Link to={`/courses/${course.id}`} className='card-link'>
            <div className="course-card-header" >
              {course.title}
            </div>
          </Link>
          <div className="course-card-body py-4">
            <strong>Categoria: </strong><span title="category">{course.category}</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default CourseCard
