import { createContext, useContext, useEffect, useState } from "react";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    const stored = localStorage.getItem("favorites");
    return stored ? JSON.parse(stored) : [];
  });

  // salva su localStorage
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (course) => {
    setFavorites((prev) => [...prev, course]);
  };

  const removeFavorite = (id) => {
    setFavorites((prev) => prev.filter((course) => course.id !== id));
  };

  const toggleFavorite = (course) => {
    setFavorites((prev) => {
      const exists = prev.some((c) => c.id === course.id);
      return exists
        ? prev.filter((c) => c.id !== course.id)
        : [...prev, course];
    });
  };

  const isFavorite = (id) => {
    return favorites.some((course) => course.id === id);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        toggleFavorite,
        isFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};
