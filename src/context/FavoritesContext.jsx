import { createContext, useState, useContext, useEffect } from "react";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem("favorites");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (courseId) => {
    const id = Number(courseId);
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const removeFromFavorites = (productId) => {
    setFavorites((prev) => prev.filter((prod) => prod.id !== productId));
  };

  const isFavorite = (courseId) => {
    return favorites.includes(Number(courseId));
  };


  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite, removeFromFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);