import Jumbotron from "../components/Jumbotron"
import { useState, useMemo } from "react"
import CourseCard from "../components/CourseCard"
import { useCourses } from "../context/CoursesContext";

const Home = () => {

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [alphabeticOrder, setAlphabeticOrder] = useState("");

  const { courses, loading } = useCourses();

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
      return null;
    });
  }, [courses, search, category, alphabeticOrder]);

  if (loading) return <p>Caricamento...</p>;

  return (
    <div className="bg-lg-blue">
      <Jumbotron />
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-6 mt-5">
            <input
              className="s-input form-control"
              type="text"
              placeholder="Cerca..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="col-12 col-md-4 mt-5">
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
          <div className="col-12 col-md-2 mt-5">
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
          {filteredCourse.map((course) => {
            return (
              <>
                <CourseCard key={course.id} course={course} />
              </>
            )
          })}

        </div>
      </div>
    </div>
  )
}

export default Home
