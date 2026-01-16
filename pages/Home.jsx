import Jumbotron from "../components/Jumbotron"
import { useState, useEffect } from "react"
import axios from "axios"

const Home = () => {

  const [courses, setCourses] = useState([])

  useEffect(() => {
    axios
      .get("http://localhost:3001/courses")
      .then((res) => setCourses(res.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="bg-lg-blue">
      <Jumbotron />
      <div className="container">
        <div className="row">
          {courses.map((course) => {
          
          return(
            <>
              <div className="col-6" key={course.id}>
                <div class="course-card">
                    <div class="course-card-header">
                      {course.title}
                    </div>
                    <div class="course-card-body py-4">
                      <figure>
                        <blockquote class="blockquote">
                          <p>{course.description}</p>
                        </blockquote>
                        <figcaption class="blockquote-footer"><cite title="Source Title">{course.category}</cite>
                        </figcaption>
                      </figure>
                    </div>
                  </div>
              </div>
            </>
          )})}

        </div>
      </div>
    </div>
  )
}

export default Home
