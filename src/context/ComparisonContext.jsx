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

  const addToComparison = (course) => {
    setComparison((prev) => {
      if (prev.some((c) => c.id === course.id)) return prev;

      if (prev.length >= 2) {
        return prev;
      }
      return [...prev, course];
    });
  };


  const removeFromComparison = (courseId) => {
    setComparison((prev) => prev.filter((c) => c.id !== courseId));
  };

  const toggleComparison = (course) => {
    const exists = comparison.some((c) => c.id === course.id);
    if (exists) return removeFromComparison(course.id);
    return addToComparison(course);
  };

  const isInComparison = (courseId) => {
    return comparison.some((c) => c.id === courseId);
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
