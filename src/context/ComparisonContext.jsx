import { createContext, useState, useContext, useEffect } from "react";

const ComparisonContext = createContext();

export const ComparisonProvider = ({ children }) => {
  const [comparison, setComparison] = useState(() => {
    try {
      const saved = localStorage.getItem("comparison");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("comparison", JSON.stringify(comparison));
  }, [comparison]);

  const addToComparison = (product) => {
    setComparison((prev) => {
      if (prev.some((p) => p.id === product.id)) return prev;

      if (prev.length >= 2) {
        return prev;
      }
      return [...prev, product];
    });
  };


  const removeFromComparison = (productId) => {
    setComparison((prev) => prev.filter((p) => p.id !== productId));
  };

  const toggleComparison = (product) => {
    const exists = comparison.some((p) => p.id === product.id);
    if (exists) return removeFromComparison(product.id);
    return addToComparison(product);
  };

  const isInComparison = (productId) => {
    return comparison.some((p) => p.id === productId);
  };

  const clearComparison = () => setComparison([]);

  return (
    <ComparisonContext.Provider
      value={{
        comparison,
        addToComparison,
        removeFromComparison,
        toggleComparison,
        isInComparison,
        clearComparison
      }}
    >
      {children}
    </ComparisonContext.Provider>
  );
};

export const useComparison = () => useContext(ComparisonContext);
