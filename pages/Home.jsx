import Jumbotron from "../components/Jumbotron"
import { useState, useEffect } from "react"
import axios from "axios"
import CourseCard from "../components/CourseCard"

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
            return (
              <>
                <CourseCard course={course} />
              </>
            )
          })}

        </div>
      </div>
    </div>
  )
}

export default Home
