import { BrowserRouter, Routes, Route } from "react-router-dom";
import DefaultLayout from "../layouts/DefaultLayout";
import Home from "../pages/Home";
import DetailCoursePage from "../pages/DetailCoursePage";
import FavoritesPage from "../pages/FavoritesPage";
import ComparisonPage from "../pages/ComparisonPage";


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route path="/" element={<Home />}></Route>
            <Route path="/courses/:id" element={<DetailCoursePage />}></Route>
            <Route path="/comparison" element={<ComparisonPage />}></Route>
            <Route path="/favorites" element={<FavoritesPage />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
