import { useEffect } from "react";

export const useScrollToTop = () => {
  useEffect(() => {
    // Scroll to top when route changes
    window.scrollTo({ top: 0, behavior: "instant" });
    return () => {
      window.scrollTo({ top: 0, behavior: "instant" });
    };
  }, []);
};
