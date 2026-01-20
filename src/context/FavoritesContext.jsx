import { createContext, useState, useEffect, useMemo } from "react";

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    const stored = localStorage.getItem("favorites");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (course) => {
    setFavorites((prev) => {
      const exists = prev.some((c) => c.id === course.id);
      if (exists) {
        return prev.filter((c) => c.id !== course.id);
      }
      return [...prev, course];
    });
  };

  const removeFromFavorites = (courseId) => {
    setFavorites((prev) => prev.filter((c) => c.id !== courseId));
  };

  const isFavorite = (courseId) => {
    return favorites.some((c) => c.id === courseId);
  };


  const value = useMemo(
    () => ({ favorites, toggleFavorite, isFavorite, removeFromFavorites }),
    [favorites]
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};
