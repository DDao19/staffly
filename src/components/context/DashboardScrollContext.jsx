import { createContext, useContext, useCallback } from "react";

const DashboardScrollContext = createContext(null);

export function DashboardScrollProvider({ children, mainRef }) {
  const scrollToTop = useCallback(() => {
    mainRef.current?.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [mainRef]);

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
