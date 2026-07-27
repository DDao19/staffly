import { createContext, useContext } from "react";

const DashboardScrollContext = createContext(null);

export function DashboardScrollProvider({ children, mainRef }) {
  function scrollToTop() {
    mainRef.current?.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <DashboardScrollContext.Provider value={{ scrollToTop }}>
      {children}
    </DashboardScrollContext.Provider>
  );
}

export function useDashboardScroll() {
  const context = useContext(DashboardScrollContext);

  if (!context) {
    throw new Error(
      "useDashboardScroll must be used inside DashboardScrollProvider",
    );
  }

  return context;
}
