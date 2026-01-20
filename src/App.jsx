import { BrowserRouter, Routes, Route } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout";
import Home from "./pages/Home";
import DetailCoursePage from "./pages/DetailCoursePage";
import FavoritesPage from "./pages/FavoritesPage";
import ComparisonPage from "./pages/ComparisonPage";
import { FavoritesProvider } from "./context/FavoritesContext";
import { ComparisonProvider } from "./context/ComparisonContext";
import NotFoundPage from "./pages/NotFoundPage";

function App() {

  return (
    <>
      <FavoritesProvider>
        <ComparisonProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<DefaultLayout />}>
                <Route path="/" element={<Home />}></Route>
                <Route path="/courses/:id" element={<DetailCoursePage />}></Route>
                <Route path="/comparison" element={<ComparisonPage />}></Route>
                <Route path="/favorites" element={<FavoritesPage />}></Route>
                <Route path="/not-found" element={<NotFoundPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ComparisonProvider>
      </FavoritesProvider>
    </>
  )
}

export default App
