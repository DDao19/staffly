import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDashboardScroll } from "../context/DashboardScrollContext";

export default function DashboardScrollToTop() {
  const { pathname } = useLocation();
  const { scrollToTop } = useDashboardScroll();

  useEffect(() => {
    scrollToTop();
  }, [pathname, scrollToTop]);

  return null;
}
