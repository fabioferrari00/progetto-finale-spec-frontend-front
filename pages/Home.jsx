import Jumbotron from "../components/Jumbotron"
import { useState, useEffect, useMemo } from "react"
import axios from "axios"
import CourseCard from "../components/CourseCard"

const Home = () => {

  const [courses, setCourses] = useState([])
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [alphabeticOrder, setAlphabeticOrder] = useState("");

  const filteredCourse = useMemo(() => {
    const filtered = courses.filter((course) => {
      const courseTitle = course.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const courseCategory = category === "all" || course.category === category;

      return courseTitle && courseCategory;
    });

    return filtered.sort((a, b) => {
      if (alphabeticOrder === "az") return a.title.localeCompare(b.title);
      if (alphabeticOrder === "za") return b.title.localeCompare(a.title);
      return 0;
    });
  }, [courses, search, category, alphabeticOrder]);

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
          <div className="col-12">
            <div className="row">
              <div className="col-12 col-md-6 my-3">
                <input
                  className="s-input form-control"
                  type="text"
                  placeholder="Cerca..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="col-12 col-md-4 my-3">
                <select
                  className="s-input form-control"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}>
                  <option value="all">Tutte le categorie</option>
                  <option value="Fuochi artificiali">Fuochi artificiali</option>
                  <option value="Armi">Armi</option>
                  <option value="Mine">Mine</option>
                  <option value="ADR">ADR</option>
                </select>
              </div>
              <div className="col-12 col-md-2 my-3">
                <select
                  className="s-input form-control"
                  value={alphabeticOrder}
                  onChange={(e) => setAlphabeticOrder(e.target.value)}
                >
                  <option value="">Ordina per titolo</option>
                  <option value="az">Dalla A alla Z</option>
                  <option value="za">Dalla Z alla A</option>
                </select>
              </div>
            </div>
          </div>
          {filteredCourse.map((course) => {
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
